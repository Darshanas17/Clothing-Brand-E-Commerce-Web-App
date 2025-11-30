import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";


const Cart = () => {
  const { cart, loading } = useCart();

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>

      <div style={{ marginTop: 12 }}>
        {loading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="spinner" />
          </div>
        )}
        {!loading && cart.length === 0 && (
          <div className="msg msg-info">Your cart is empty</div>
        )}

        {!loading &&
          cart.map((item) => (
            <CartItem key={item._id || item.id} item={item} />
          ))}
      </div>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700 }}>Total: ₹{total}</div>
        <Link to="/checkout">
          <button className="btn btn-primary">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
