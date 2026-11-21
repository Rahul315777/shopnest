import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home/Home.jsx";
import Cart from "../pages/Cart/Cart.jsx";
import Product from "../pages/Product/Product.jsx";
import Shop from "../pages/Shop/Shop.jsx";
import Wishlist from "../pages/Wishlist/Wishlist.jsx";
import Login from "../pages/Login/Login.jsx";
import Signup from "../pages/Signup/Signup.jsx";
import Checkout from "../pages/Checkout/Checkout.jsx";
import Orders from "../pages/Orders/Orders.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import Admin from "../pages/Admin/Admin.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
        <Route path="*" element={<p className="py-20 text-center text-slate-500">Page not found.</p>} />
      </Route>
    </Routes>
  );
}
