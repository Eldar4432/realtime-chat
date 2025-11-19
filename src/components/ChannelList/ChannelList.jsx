import React, { useState } from "react";
import styles from "./ChannelList.module.css";

const ChannelList = ({ channels, currentChannel, onJoin }) => {
  const [name, setName] = useState("");

  return (
    <div className={styles.card}>
      <h3>Каналы</h3>

      <div className={styles.list}>
        {channels.map((c) => (
          <div
            key={c.channelId}
            className={`${styles.item} ${
              currentChannel === c.channelId ? styles.active : ""
            }`}
            onClick={() => onJoin(c.channelId)}
          >
            <span>{c.name}</span>
            <span className={styles.muted}>{c.memberCount}</span>
          </div>
        ))}
      </div>

      <div className={styles.createRow}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Новый канал..."
        />

        <button
          onClick={() => {
            if (!name) return;
            alert("Создан канал: " + name);
            setName("");
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
};

export default ChannelList;
