import { useState } from "react";
import { BsMoon, BsSearch, BsSun } from "react-icons/bs"; // Using react-icons
import { useTheme } from "../context/ThemeProvider";


/**
 * A navigation bar component that renders the search bar and dark mode toggle.
 *
 * @param {{ onSearch: (query: string) => void }} props - The props object
 * @param {function} props.onSearch - The callback function to run when the user searches for products
 * @returns {React.ReactElement} The JSX element
 */
const Navbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [query, setQuery] = useState<string>("");

/**
 * Handles the search input change event by updating the query state
 * and triggering the onSearch callback with the new query.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
 */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav
      className={`p-4 flex justify-between items-center fixed w-full z-50 top-0 transition-all duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800 shadow-md"
      }`}
    >
      <h1 className="md:text-2xl text-md text-nowrap font-bold">E-Commerce</h1>
      
      {/* Search Bar */}
      <div className="relative md:w-[20rem] w-[12rem]">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleSearch}
          className={`p-3 pl-10 pr-4 rounded-full ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
          } w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <BsSearch
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          } w-5 h-5`}
        />
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-full transition-all ${
          darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {darkMode ? (
          <BsSun className="text-yellow-400 w-6 h-6" />
        ) : (
          <BsMoon className="w-6 h-6" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
