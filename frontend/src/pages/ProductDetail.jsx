import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, loading } = useCart();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState(null);
  const [loadingLocal, setLoadingLocal] = useState(false);

  useEffect(() => {
    setLoadingLocal(true);
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => {})
      .finally(() => setLoadingLocal(false));
  }, [id]);

  const onAdd = async () => {
    setMsg(null);
    await addToCart(product, size, Number(qty), setMsg);
  };

  if (loadingLocal)
    return (
      <div className="container">
        <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
          <div className="spinner" />
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="container">
        <h3>Product not found</h3>
      </div>
    );

  return (
    <div className="container">
      <div className="detail">
        <div className="detail-left card">
          <img
            className="product-img1"
            src={product.image}
            alt={product.name}
          />
          <h2 className="product-title">{product.name}</h2>
          <p className="p-muted">{product.category}</p>
          <p>{product.description}</p>
        </div>

        <div className="detail-right card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700 }}>
              ₹{product.price}
            </div>
            <div className="p-muted">Stock: {product.stock}</div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label className="p-muted">Size</label>
            <div style={{ marginTop: 6 }}>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                }}
              >
                <option value="">Select size</option>
                {product.sizes?.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label className="p-muted">Quantity</label>
            <div style={{ marginTop: 6 }}>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                }}
              />
            </div>
          </div>

          {msg && (
            <div
              className={`msg ${
                msg.type === "error"
                  ? "msg-error"
                  : msg.type === "success"
                  ? "msg-success"
                  : "msg-info"
              }`}
            >
              {msg.text}
            </div>
          )}

          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <button
              className="btn btn-primary"
              onClick={onAdd}
              disabled={loading}
            >
              {loading ? <div className="small-spinner" /> : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
