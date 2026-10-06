import { Route, Routes } from "react-router-dom";
import StoreLayout from "./components/layout/StoreLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import PlaceholderPage from "./pages/PlaceholderPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Route>
    </Routes>
  );
}
