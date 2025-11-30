import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(local);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    api
      .get("/cart")
      .then((res) => {
        setCart(res.data.items || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const addToCart = async (product, size, qty, setMsg) => {
    if (!size) {
      setMsg({ type: "error", text: "Please select a size." });
      return;
    }
    if (!qty || qty < 1) {
      setMsg({ type: "error", text: "Quantity must be at least 1." });
      return;
    }

    if (user) {
      setLoading(true);
      try {
        const res = await api.post("/cart/add", {
          productId: product._id,
          size,
          qty,
        });
        setCart(res.data.items);
        setMsg({ type: "success", text: "Added to cart." });
      } catch (e) {
        setMsg({
          type: "error",
          text: e.response?.data?.message || "Failed to add.",
        });
      } finally {
        setLoading(false);
      }
    } else {
      const newItem = {
        _id: Date.now().toString(),
        productId: product._id,
        name: product.name,
        image: product.image,
        size,
        qty,
        price: product.price,
      };
      setCart((prev) => [...prev, newItem]);
      setMsg({ type: "success", text: "Added to cart." });
    }
  };

  const removeItem = async (id) => {
    if (user) {
      setLoading(true);
      try {
        const res = await api.delete("/cart/remove", { data: { itemId: id } });
        setCart(res.data.items);
      } catch (e) {}
      setLoading(false);
    } else {
      setCart((prev) => prev.filter((i) => i._id !== id));
    }
  };

  const updateQty = async (id, qty) => {
    if (user) {
      setLoading(true);
      try {
        const res = await api.put("/cart/update", { itemId: id, qty });
        setCart(res.data.items);
      } catch (e) {}
      setLoading(false);
    } else {
      setCart((prev) => prev.map((i) => (i._id === id ? { ...i, qty } : i)));
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, updateQty, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};
