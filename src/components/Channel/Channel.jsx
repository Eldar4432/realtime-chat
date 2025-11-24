import React, { useEffect, useRef, useState } from "react";
import styles from "./Channel.module.css";

const Channel = ({ ws, channelId, username }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  // Получение сообщений от сервера
  useEffect(() => {
    if (!ws) return;

    const onMessage = (e) => {
      try {
        const d = JSON.parse(e.data);
        if (d.type !== "message") return;

        const p = d.payload || {};
        // если сервер присылает channelId — фильтруем по текущему каналу
        if (p.channelId && p.channelId !== channelId) return;

        const msg = {
          username: p.username || p.user || "Unknown",
          text: p.text ?? p.message ?? "",
          time: p.time ?? new Date().toLocaleTimeString(),
        };

        setMessages((m) => [...m, msg]);
      } catch {
        // молча игнорируем некорректный JSON
      }
    };

    ws.addEventListener("message", onMessage);
    return () => ws.removeEventListener("message", onMessage);
  }, [ws, channelId]);

  // автоскролл вниз при новом сообщении
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!ws || !text.trim()) return;
    // простая и понятная структура отправки
    ws.send(
      JSON.stringify({
        type: "send_message",
        payload: {
          channelId,
          message: text,
          username,
          time: new Date().toLocaleTimeString(),
        },
      })
    );
    setText("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Канал: {channelId}</div>

      <div className={styles.chat}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.username === username ? styles.myMessage : styles.otherMessage
            }
          >
            <div className={styles.msgUser}>{m.username}</div>
            <div className={styles.msgText}>{m.text}</div>
            <div className={styles.msgTime}>{m.time}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className={styles.inputBox}>
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Введите сообщение…"
        />
        <button className={styles.sendBtn} onClick={send}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Channel;
