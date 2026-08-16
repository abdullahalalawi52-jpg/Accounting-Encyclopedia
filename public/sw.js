/**
 * Service Worker for Accounting Encyclopedia (Offline First PWA)
 */
const CACHE_NAME = 'accounting-encyclopedia-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/data/articles.json',
  '/data/categories.json',
  '/data/glossary.json',
  '/data/standards.json',
  '/data/quizzes.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET requests or external API calls (e.g. gnews)
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Network-First with Cache Fallback for data and pages
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // If navigation request fails, return cached index.html (SPA offline support)
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});
