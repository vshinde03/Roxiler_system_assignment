import React, { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const r = await API.post("/auth/login", form);
      localStorage.setItem("token", r.data.token);
      localStorage.setItem("user", JSON.stringify(r.data.user));
      const role = r.data.user.role;
      if (role === "ADMIN") nav("/admin");
      else if (role === "OWNER") nav("/owner");
      else nav("/stores");
    } catch (err) {
      setErr(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
      {err && <div>{err}</div>}
    </form>
  );
}
