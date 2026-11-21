import { ProductProvider } from "./context/ProductContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </ProductProvider>
  );
}
