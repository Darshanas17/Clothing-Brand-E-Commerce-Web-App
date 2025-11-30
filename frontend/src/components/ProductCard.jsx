import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img className="product-img" src={product.image} alt={product.name} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">₹{product.price}</div>
      </div>
      <p className="p-muted">{product.category}</p>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to={`/product/${product._id}`} className="btn btn-light">
          View
        </Link>
        <Link to={`/product/${product._id}`} className="btn btn-primary">
          Buy
        </Link>
      </div>
    </div>
  );
};
export default ProductCard;
