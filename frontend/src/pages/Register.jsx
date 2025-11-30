import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await register(form.name, form.email, form.password);
    nav("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
