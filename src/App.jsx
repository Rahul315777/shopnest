import { ProductProvider } from "./context/ProductContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { CompareProvider } from "./context/CompareContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  return (
    <ThemeProvider>
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <CompareProvider>
                  <AppRoutes />
                </CompareProvider>
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
    </ThemeProvider>
  );
}
