import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useLocalStorage("shopnest_orders", []);

  const placeOrder = ({ userEmail, items, total, address, payment }) => {
    const order = {
      id: "SN" + Date.now().toString().slice(-8),
      userEmail,
      items: items.map(({ id, name, emoji, price, qty }) => ({ id, name, emoji, price, qty })),
      total,
      address,
      payment,
      status: "Placed",
      date: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const updateStatus = (id, status) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  const value = useMemo(() => ({ orders, placeOrder, updateStatus }), [orders]);
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export const useOrders = () => useContext(OrderContext);
