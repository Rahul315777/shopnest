import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="p-8 text-2xl font-bold">ShopNest</h1>} />
    </Routes>
  );
}
