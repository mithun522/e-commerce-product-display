import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeProvider";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

const AppContent = () => {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
