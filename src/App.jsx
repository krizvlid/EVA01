import { Route, Routes } from "react-router-dom";
import StoreLayout from "./components/layout/StoreLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import CategoryCatalogPage from "./pages/CategoryCatalogPage.jsx";
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
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PaymentSuccessPage from "./pages/PaymentSuccessPage.jsx";
import PaymentErrorPage from "./pages/PaymentErrorPage.jsx";
import CustomerProfilePage from "./pages/CustomerProfilePage.jsx";
import ProtectedRoute from "./components/cart/ProtectedRoute.jsx";
import AdminRoute from "./components/admin/AdminRoute.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import {
  AdminDashboardPage,
  AdminProfilePage,
  CategoriesAdminPage,
  CategoryFormPage,
  CriticalStockPage,
  OrdersPage,
  ProductFormPage,
  ProductReportsPage,
  ProductsAdminPage,
  PurchaseHistoryPage,
  ReceiptPage,
  ReportsPage,
  UserFormPage,
  UsersPage,
} from "./pages/admin/AdminPages.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="ordenes" element={<OrdersPage />} />
          <Route path="ordenes/:id/boleta" element={<ReceiptPage />} />
          <Route path="productos" element={<ProductsAdminPage />} />
          <Route path="productos/nuevo" element={<ProductFormPage />} />
          <Route path="productos/criticos" element={<CriticalStockPage />} />
          <Route path="productos/reportes" element={<ProductReportsPage />} />
          <Route path="productos/:id/editar" element={<ProductFormPage />} />
          <Route path="categorias" element={<CategoriesAdminPage />} />
          <Route path="categorias/nueva" element={<CategoryFormPage />} />
          <Route path="categorias/:id/editar" element={<CategoryFormPage />} />
          <Route path="usuarios" element={<UsersPage />} />
          <Route path="usuarios/nuevo" element={<UserFormPage />} />
          <Route path="usuarios/:id/editar" element={<UserFormPage />} />
          <Route path="usuarios/:id/compras" element={<PurchaseHistoryPage />} />
          <Route path="reportes" element={<ReportsPage />} />
          <Route path="perfil" element={<AdminProfilePage />} />
        </Route>
      </Route>
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tienda/productos" element={<ProductsPage />} />
        <Route path="tienda/categoria/:categoryId" element={<CategoryCatalogPage />} />
        <Route path="tienda/detalle/:id" element={<ProductDetailPage />} />
        <Route path="tienda/categorias" element={<CategoriesPage />} />
        <Route path="tienda/ofertas" element={<OffersPage />} />
        <Route path="tienda/registro" element={<RegisterPage />} />
        <Route path="tienda/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="tienda/perfil" element={<CustomerProfilePage />} />
          <Route path="tienda/perfil/datos" element={<CustomerProfilePage />} />
          <Route path="tienda/perfil/compras" element={<CustomerProfilePage />} />
        </Route>
        <Route path="tienda/nosotros" element={<AboutPage />} />
        <Route path="tienda/blogs" element={<BlogsPage />} />
        <Route path="tienda/blogs/:slug" element={<BlogDetailPage />} />
        <Route path="tienda/contacto" element={<ContactPage />} />
        <Route path="carrito" element={<CartPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="tienda/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="tienda/pago-correcto" element={<PaymentSuccessPage />} />
        <Route path="tienda/pago-error" element={<PaymentErrorPage />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Route>
    </Routes>
  );
}
