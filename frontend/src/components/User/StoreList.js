import React, { useEffect, useState } from "react";
import API from "../../api";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    const r = await API.get("/stores");
    setStores(r.data);
  }

  async function submitRating(storeId, value) {
    await API.post(`/stores/${storeId}/rate`, { value });
    fetchList();
  }

  return (
    <div>
      <h2>Stores</h2>
      <input
        placeholder="Search name or address"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <ul>
        {stores
          .filter(
            (s) =>
              s.name.toLowerCase().includes(q.toLowerCase()) ||
              s.address.toLowerCase().includes(q.toLowerCase())
          )
          .map((s) => (
            <li key={s.id}>
              <h3>{s.name}</h3>
              <div>{s.address}</div>
              <div>Average: {s.averageRating ?? "N/A"}</div>
              <div>
                <label>Rate: </label>
                {[1, 2, 3, 4, 5].map((i) => (
                  <button key={i} onClick={() => submitRating(s.id, i)}>
                    {i}
                  </button>
                ))}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
