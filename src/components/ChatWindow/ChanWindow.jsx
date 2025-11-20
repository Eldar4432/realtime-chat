import React, { useState } from "react";
import styles from "./ChatWindow.module.css";

const ChatWindow = ({ channelId, messages = [], onSend }) => {
  const [text, setText] = useState("");

  if (!channelId) return <div className={styles.empty}>Выберите канал</div>;

  const handleSend = () => {
    const value = text.trim();
    if (!value) return;
    onSend?.(value);
    setText("");
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>Канал: {channelId}</div>
      </div>

      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div key={i} className={styles.message}>
            <b>{m.username}</b>: <span>{m.text}</span>
          </div>
        ))}
      </div>

      <div className={styles.composer}>
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Введите сообщение..."
        />
        <button className={styles.btn} onClick={handleSend}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
