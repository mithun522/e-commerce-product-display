import { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { useTheme } from "../context/ThemeProvider";

const Navbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">E-Commerce</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleSearch}
        className="p-2 rounded bg-gray-700 text-white"
      />
      <button onClick={toggleDarkMode} className="p-2 bg-gray-700 rounded">
        {darkMode ? <BsSun className="text-yellow-400" /> : <BsMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
