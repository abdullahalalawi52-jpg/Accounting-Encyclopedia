import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { sanitizeObject } from '../utils/security.js';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  THEME: 'app_theme',
  BOOKMARKS: 'bookmarks',
  READING_HISTORY: 'reading_history',
  RECENT_SEARCHES: 'recent_searches',
  PREFERENCES: 'user_preferences',
};

const safeGetJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    const sanitized = sanitizeObject(parsed);
    // If fallback is an array, strictly ensure stored data is an array
    if (Array.isArray(fallback) && !Array.isArray(sanitized)) {
      return fallback;
    }
    return sanitized ?? fallback;
  } catch (e) {
    console.warn(`Failed to parse localStorage key "${key}":`, e);
    return fallback;
  }
};

export function AppProvider({ children }) {
  // 1. Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) return savedTheme === 'dark';
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
      body.removeAttribute('data-theme');
      localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const setTheme = useCallback((theme) => {
    setIsDarkMode(theme === 'dark');
  }, []);

  // 2. Bookmarks State
  const [bookmarks, setBookmarks] = useState(() =>
    safeGetJSON(STORAGE_KEYS.BOOKMARKS, [])
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed to save bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  const addBookmark = useCallback((articleId) => {
    const strId = String(articleId);
    setBookmarks((prev) => (prev.includes(strId) ? prev : [...prev, strId]));
  }, []);

  const removeBookmark = useCallback((articleId) => {
    const strId = String(articleId);
    setBookmarks((prev) => prev.filter((id) => String(id) !== strId));
  }, []);

  const isBookmarked = useCallback(
    (articleId) => bookmarks.includes(String(articleId)),
    [bookmarks]
  );

  const toggleBookmark = useCallback((articleId) => {
    const strId = String(articleId);
    setBookmarks((prev) =>
      prev.includes(strId)
        ? prev.filter((id) => id !== strId)
        : [...prev, strId]
    );
  }, []);

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  // 3. Reading History State
  const [readingHistory, setReadingHistory] = useState(() =>
    safeGetJSON(STORAGE_KEYS.READING_HISTORY, [])
  );

  const markArticleAsRead = useCallback((articleId, meta = {}) => {
    const strId = String(articleId);
    setReadingHistory((prev) => {
      const filtered = prev.filter((item) => String(item.id) !== strId);
      const updated = [
        { id: strId, title: meta.title || '', timestamp: Date.now() },
        ...filtered,
      ].slice(0, 30);
      try {
        localStorage.setItem(STORAGE_KEYS.READING_HISTORY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  // 4. Recent Searches
  const [recentSearches, setRecentSearches] = useState(() =>
    safeGetJSON(STORAGE_KEYS.RECENT_SEARCHES, [])
  );

  const addRecentSearch = useCallback((query) => {
    const trimmed = query?.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 10);
      try {
        localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
  }, []);

  // Centralized Context Value (Memoized to prevent unnecessary re-renders)
  const contextValue = useMemo(
    () => ({
      // Theme
      isDarkMode,
      toggleTheme,
      setTheme,

      // Bookmarks
      bookmarks,
      bookmarksCount: bookmarks.length,
      addBookmark,
      removeBookmark,
      toggleBookmark,
      isBookmarked,
      clearBookmarks,

      // Reading History
      readingHistory,
      markArticleAsRead,

      // Search History
      recentSearches,
      addRecentSearch,
      clearRecentSearches,
    }),
    [
      isDarkMode,
      toggleTheme,
      setTheme,
      bookmarks,
      addBookmark,
      removeBookmark,
      toggleBookmark,
      isBookmarked,
      clearBookmarks,
      readingHistory,
      markArticleAsRead,
      recentSearches,
      addRecentSearch,
      clearRecentSearches,
    ]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Unified Central Store Hook
 */
export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}

/**
 * Backward compatibility hooks
 */
export function useTheme() {
  const store = useAppStore();
  return {
    isDarkMode: store.isDarkMode,
    toggleTheme: store.toggleTheme,
    setTheme: store.setTheme,
  };
}

export function useBookmarks() {
  const store = useAppStore();
  return {
    bookmarks: store.bookmarks,
    bookmarksCount: store.bookmarksCount,
    addBookmark: store.addBookmark,
    removeBookmark: store.removeBookmark,
    toggleBookmark: store.toggleBookmark,
    isBookmarked: store.isBookmarked,
    clearBookmarks: store.clearBookmarks,
  };
}

export default AppContext;
