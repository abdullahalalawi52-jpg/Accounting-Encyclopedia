import { createContext, useContext, useMemo } from 'react';
import { useAppStore } from './AppContext.jsx';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  setTheme: () => {}
});

export const useTheme = () => {
  try {
    const store = useAppStore();
    if (store && typeof store.isDarkMode !== 'undefined') {
      return {
        isDarkMode: store.isDarkMode,
        toggleTheme: store.toggleTheme,
        setTheme: store.setTheme,
      };
    }
  } catch (e) {
    // Fallback if rendered outside AppProvider
  }
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  return children;
};

export default ThemeContext;

