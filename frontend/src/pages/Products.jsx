import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api.get(`/products?search=${search}&category=${category}`).then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    });
  }, [search, category]);

  return (
    <div style={{ padding: 20 }}>
      <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      {loading && <div className="loader"></div>}

      <div className="grid">
        {products.map((p) => (
          <ProductCard product={p} key={p._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
