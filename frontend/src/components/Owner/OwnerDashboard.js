import React, { useEffect, useState } from "react";
import API from "../../api";

export default function OwnerDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const r = await API.get("/stores/owner/ratings");
    setData(r.data);
  }

  return (
    <div>
      <h2>Owner Dashboard</h2>
      {data.map((s) => (
        <div key={s.storeId}>
          <h3>
            {s.name} — Avg: {s.averageRating}
          </h3>
          <ul>
            {s.ratings.map((r) => (
              <li key={r.id}>
                {r.user.name} ({r.user.email}) — {r.value}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
