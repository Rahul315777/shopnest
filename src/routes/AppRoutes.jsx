import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home/Home.jsx";
import Cart from "../pages/Cart/Cart.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}
