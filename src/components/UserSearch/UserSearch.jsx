import React, { useState } from "react";
import styles from "./UserSearch.module.css";

const UserSearch = ({ onSelect }) => {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);

  const doSearch = () => {
    const s = q.trim();
    if (!s) return;
    // временная заглушка: заменим на fetch позже
    setResults([
      { id: 1, name: `${s} Иванов`, username: "ivanov" },
      { id: 2, name: `${s} Петров`, username: "petrov" },
    ]);
  };

  return (
    <div className={styles.card}>
      <h4>Поиск</h4>
      <div className={styles.row}>
        <input
          className={styles.input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Имя или ник"
        />
        <button className={styles.btn} onClick={doSearch}>
          Найти
        </button>
      </div>

      <div className={styles.results}>
        {results.map((r) => (
          <div key={r.id} className={styles.result}>
            <div>
              <b>{r.name}</b>{" "}
              <small className={styles.username}>@{r.username}</small>
            </div>
            <button className={styles.invite} onClick={() => onSelect?.(r)}>
              Пригласить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
