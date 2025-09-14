import React, { useEffect, useState } from "react";
import API from "../../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const s = await API.get("/admin/dashboard");
    setStats(s.data);
    const u = await API.get("/admin/users");
    setUsers(u.data);
    const st = await API.get("/admin/stores");
    setStores(st.data);
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>Total Users: {stats.totalUsers}</div>
      <div>Total Stores: {stats.totalStores}</div>
      <div>Total Ratings: {stats.totalRatings}</div>

      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Stores</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.averageRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
