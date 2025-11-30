import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="nav">
      <div className="left">
        <div className="brand">
          <Link
            to="/"
            style={{ textDecoration: "none", color: "var(--accent)" }}
          >
            Clothly
          </Link>
        </div>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </div>

      <div className="actions">
        {user ? (
          <>
            <span style={{ color: "var(--muted)" }}>Hi, {user.name}</span>
            <button className="btn btn-light" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
            <Link to="/register" className="btn btn-light">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
