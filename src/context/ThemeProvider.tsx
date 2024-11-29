import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
 * Provides dark mode state and a function to toggle it
 *
 * @param {{ children: ReactNode }} props - The props object
 * @param {ReactNode} props.children - The children components
 * @returns {React.ReactElement} The theme context provider
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Load the saved theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, []);

  /**
   * Toggles the dark mode state and updates the document body's data-theme
   * to apply the corresponding CSS styles.
   *
   * @returns {void}
   */
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("darkMode", "true");
      } else {
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("darkMode", "false");
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
