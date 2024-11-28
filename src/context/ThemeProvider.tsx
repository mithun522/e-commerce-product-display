import React, { createContext, ReactNode, useContext, useState } from "react";

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

  /**
   * Toggles the dark mode state and updates the document body's class list
   * to apply the corresponding CSS styles.
   *
   * @returns {void}
   */
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      document.body.classList.toggle("dark", !prevMode);
      return !prevMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
