import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isSafeUrl } from '../utils/security.js';

// Cache structure: Map<langCode, { data: any, timestamp: number }>
const newsCache = new Map();
const NEWS_CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache per language

// Read API key securely if client-side fallback is needed
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

export function useNewsAPI() {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const langCode = isEn ? 'en' : 'ar';

  const [data, setData] = useState(() => {
    const cached = newsCache.get(langCode);
    if (cached && Date.now() - cached.timestamp < NEWS_CACHE_TTL) {
      return cached.data;
    }
    return null;
  });
  const [loading, setLoading] = useState(() => !data);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if we already have valid cached news for this language
    const cached = newsCache.get(langCode);
    if (cached && Date.now() - cached.timestamp < NEWS_CACHE_TTL) {
      setData(cached.data);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    const fallbackUrl = '/data/articles.json';
    const query = isEn ? 'economy OR accounting OR finance' : 'اقتصاد OR محاسبة OR مالية';
    const proxyUrl = `/api/news?lang=${langCode}`;
    const directNewsApiUrl = API_KEY && API_KEY !== 'YOUR_API_KEY_HERE'
      ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=${langCode}&max=10&apikey=${API_KEY}`
      : null;

    const fetchFallback = async () => {
      try {
        const res = await fetch(fallbackUrl);
        if (!res.ok) throw new Error('Failed to fetch fallback data');
        const json = await res.json();
        if (isMounted) {
          newsCache.set(langCode, { data: json, timestamp: Date.now() });
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    const processArticles = (articles) => {
      return articles.map((article, index) => {
        const dateObj = new Date(article.publishedAt);
        const formattedDate = !isNaN(dateObj.getTime())
          ? dateObj.toLocaleDateString(isEn ? 'en-US' : 'ar-EG', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })
          : '';

        const safeUrl = isSafeUrl(article.url) ? article.url : '#';
        const safeImage = isSafeUrl(article.image) ? article.image : null;

        return {
          id: `news-${index}`,
          title: article.title || '',
          categoryName: isEn ? 'News & Updates' : 'أخبار وتحديثات',
          categoryId: 'news',
          author: article.source?.name || (isEn ? 'News Source' : 'مصدر إخباري'),
          date: formattedDate,
          content: article.content || '',
          summary: article.description || '',
          image: safeImage,
          time: isEn ? 'Quick Read' : 'قراءة سريعة',
          isFeatured: index < 4,
          url: safeUrl
        };
      });
    };

    const fetchNews = async () => {
      // 1. First try secure serverless proxy endpoint if available
      try {
        const proxyRes = await fetch(proxyUrl);
        if (proxyRes.ok) {
          const proxyJson = await proxyRes.json();
          if (proxyJson.articles && Array.isArray(proxyJson.articles)) {
            const mapped = processArticles(proxyJson.articles);
            if (isMounted) {
              newsCache.set(langCode, { data: mapped, timestamp: Date.now() });
              setData(mapped);
              setLoading(false);
              return;
            }
          }
        }
      } catch {
        // Proxy not available in local static dev, continue to direct or fallback
      }

      // 2. Try direct API key if configured
      if (directNewsApiUrl) {
        try {
          const res = await fetch(directNewsApiUrl);
          if (res.ok) {
            const json = await res.json();
            if (json.articles && Array.isArray(json.articles)) {
              const mapped = processArticles(json.articles);
              if (isMounted) {
                newsCache.set(langCode, { data: mapped, timestamp: Date.now() });
                setData(mapped);
                setLoading(false);
                return;
              }
            }
          }
        } catch (err) {
          console.warn('Direct News API request failed:', err);
        }
      }

      // 3. Fallback to local curated accounting articles
      fetchFallback();
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, [isEn, langCode]);

  return { data, loading, error };
}

export default useNewsAPI;
