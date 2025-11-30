import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api
      .get("/products?limit=8&page=1")
      .then((res) => {
        setFeatured((res.data.products || []).slice(0, 4));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="container">
      <h1 style={{ marginBottom: 8 }}>Welcome to Clothly</h1>
      <p className="p-muted">
        Handpicked products for you — light theme, simple UI.
      </p>

      <h2 style={{ marginTop: 20 }}>Featured</h2>
      <div className="grid" style={{ marginTop: 12 }}>
        {featured.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};
export default Home;
