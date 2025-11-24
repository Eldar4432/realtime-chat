import React, { useMemo, useState } from "react";
import styles from "./UserList.module.css";

const UserList = ({ users = [], inviteUser = () => {}, invitedUsers = [] }) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      const name = (u.name || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      const username = (u.username || "").toLowerCase();
      return name.includes(q) || email.includes(q) || username.includes(q);
    });
  }, [users, query]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          className={styles.search}
          placeholder="Поиск пользователей..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={styles.list}>
        {filtered.length === 0 && (
          <div className={styles.empty}>Пользователей не найдено</div>
        )}
        {filtered.map((u) => {
          const isInvited = invitedUsers?.includes(u.name);
          return (
            <div className={styles.item} key={u.id}>
              <div className={styles.left}>
                <div className={styles.avatar}>
                  {(u.name || "U").slice(0, 1).toUpperCase()}
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>{u.name}</div>
                  <div className={styles.email}>{u.email}</div>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={
                    isInvited
                      ? `${styles.btn} ${styles.btnDisabled}`
                      : styles.btn
                  }
                  onClick={() => inviteUser(u.name)}
                  disabled={isInvited}
                  title={isInvited ? "Уже приглашён" : "Пригласить"}
                >
                  {isInvited ? "Приглашён" : "Пригласить"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.invitedBlock}>
        <div className={styles.invitedTitle}>Приглашённые</div>
        {(!invitedUsers || invitedUsers.length === 0) && (
          <div className={styles.invitedEmpty}>Список пуст</div>
        )}
        <ul className={styles.invitedList}>
          {invitedUsers?.map((name) => (
            <li key={name} className={styles.invitedItem}>
              <span className={styles.invitedName}>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
