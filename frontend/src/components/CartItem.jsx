import { useCart } from "../context/CartContext";


const CartItem = ({ item }) => {
  const { updateQty, removeItem, loading } = useCart();

  return (
    <div className="cart-row">
      <img src={item.image} alt={item.name} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <strong>{item.name}</strong>
          </div>
          <div>₹{item.price}</div>
        </div>
        <div className="p-muted">Size: {item.size}</div>
        <div
          style={{
            marginTop: 8,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) =>
              updateQty(item._id || item.id, Number(e.target.value))
            }
            style={{
              width: 70,
              padding: 6,
              borderRadius: 6,
              border: "1px solid var(--border)",
            }}
          />
          <button
            className="btn btn-light"
            onClick={() => removeItem(item._id || item.id)}
            disabled={loading}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
