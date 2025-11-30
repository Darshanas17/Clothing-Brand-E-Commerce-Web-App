import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

const Checkout = () => {
  const { cart } = useCart();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = async () => {
    setMsg(null);
    if (!cart || cart.length === 0) {
      setMsg({ type: "error", text: "Your cart is empty." });
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/orders", { shippingAddress: "India" });
      setMsg({ type: "success", text: "Order placed successfully!" });
      setTimeout(() => {
        nav(`/order/${res.data.order._id}`);
      }, 900);
    } catch (err) {
      setMsg({
        type: "error",
        text: "Please login to continue",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      {msg && (
        <div
          className={`msg ${
            msg.type === "error" ? "msg-error" : "msg-success"
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="card" style={{ marginTop: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>Total items: {cart.length}</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>₹{total}</div>
        </div>

        <div style={{ marginTop: 14 }}>
          <button
            className="btn btn-primary"
            onClick={placeOrder}
            disabled={loading}
          >
            {loading ? <div className="spinner" /> : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
