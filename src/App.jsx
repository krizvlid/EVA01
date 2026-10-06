import { Route, Routes } from "react-router-dom";
import StoreLayout from "./components/layout/StoreLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";
import BlogDetailPage from "./pages/BlogDetailPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PlaceholderPage from "./pages/PlaceholderPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tienda/productos" element={<ProductsPage />} />
        <Route path="tienda/detalle/:id" element={<ProductDetailPage />} />
        <Route path="tienda/categorias" element={<CategoriesPage />} />
        <Route path="tienda/ofertas" element={<OffersPage />} />
        <Route path="tienda/registro" element={<RegisterPage />} />
        <Route path="tienda/login" element={<LoginPage />} />
        <Route path="tienda/nosotros" element={<AboutPage />} />
        <Route path="tienda/blogs" element={<BlogsPage />} />
        <Route path="tienda/blogs/:slug" element={<BlogDetailPage />} />
        <Route path="tienda/contacto" element={<ContactPage />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Route>
    </Routes>
  );
}
