import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password);
    nav("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
