import { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse bookmarks from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (articleId) => {
    if (!bookmarks.includes(articleId)) {
      setBookmarks([...bookmarks, articleId]);
    }
  };

  const removeBookmark = (articleId) => {
    setBookmarks(bookmarks.filter(id => id !== articleId));
  };

  const isBookmarked = (articleId) => {
    return bookmarks.includes(articleId);
  };

  const toggleBookmark = (articleId) => {
    if (isBookmarked(articleId)) {
      removeBookmark(articleId);
    } else {
      addBookmark(articleId);
    }
  };

  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      addBookmark,
      removeBookmark,
      isBookmarked,
      toggleBookmark,
    }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
