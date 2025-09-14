import React, { useState } from "react";
import API from "../../api";
import {
  validateName,
  validateAddress,
  validatePassword,
  validateEmail,
} from "../../utils/validators";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateName(form.name)) return setMsg("Name must be 20-60 chars");
    if (!validateEmail(form.email)) return setMsg("Invalid email");
    if (!validateAddress(form.address)) return setMsg("Address too long");
    if (!validatePassword(form.password))
      return setMsg(
        "Password not valid (8-16 chars, must include uppercase & special char)"
      );

    try {
      await API.post("/auth/signup", form);
      setMsg("Signup success — please login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Sign up</button>
      {msg && <div>{msg}</div>}
    </form>
  );
}
