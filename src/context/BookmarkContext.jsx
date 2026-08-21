import { createContext, useContext } from 'react';
import { useAppStore } from './AppContext.jsx';

const BookmarkContext = createContext({
  bookmarks: [],
  bookmarksCount: 0,
  addBookmark: () => {},
  removeBookmark: () => {},
  isBookmarked: () => false,
  toggleBookmark: () => {},
  clearBookmarks: () => {}
});

export const useBookmarks = () => {
  try {
    const store = useAppStore();
    if (store && typeof store.bookmarks !== 'undefined') {
      return {
        bookmarks: store.bookmarks,
        bookmarksCount: store.bookmarksCount,
        addBookmark: store.addBookmark,
        removeBookmark: store.removeBookmark,
        isBookmarked: store.isBookmarked,
        toggleBookmark: store.toggleBookmark,
        clearBookmarks: store.clearBookmarks,
      };
    }
  } catch (e) {
    // Fallback if rendered outside AppProvider
  }
  return useContext(BookmarkContext);
};

export const BookmarkProvider = ({ children }) => {
  return children;
};

export default BookmarkContext;

