// src/components/UserList.jsx
import React, { useState } from "react";

export default function UserList({ users = [], onInvite }) {
  const [q, setQ] = useState("");
  const lowered = q.toLowerCase();
  const filtered = users
    .filter((u) =>
      (u.name || u.username || u.email || "").toLowerCase().includes(lowered)
    )
    .slice(0, 50);

  return (
    <div style={{ width: 280, borderRight: "1px solid #eee", padding: 12 }}>
      <h4>Поиск пользователей</h4>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Поиск..."
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <div style={{ maxHeight: 400, overflow: "auto" }}>
        {filtered.map((u) => (
          <div
            key={u.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #f7f7f7",
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{u.name}</div>
              <div style={{ fontSize: 12, color: "#666" }}>@{u.username}</div>
            </div>
            <div>
              <button
                onClick={() => onInvite?.(u)}
                style={{ padding: "6px 8px" }}
              >
                Пригласить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
