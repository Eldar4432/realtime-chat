import React, { useState, useEffect } from "react";
import ws from "../ws";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    ws.onmessage = async (event) => {
      let data = event.data;

      // если пришёл Blob (бинар), прочитаем как текст
      if (data instanceof Blob) {
        data = await data.text();
      }

      // теперь data — строка (или уже была строкой)
      // попробуем распарсить JSON
      let parsed;
      try {
        parsed = JSON.parse(data);
      } catch (err) {
        // если не JSON — сохраним как простую строку
        parsed = { text: String(data), username: "unknown" };
      }

      // добавляем в список сообщений — всегда как объект {username, text, ...}
      setMessages((prev) => [...prev, parsed]);
    };
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;
    ws.send(text);
    setText("");
  };

  return (
    <div>
      <h2>Чат</h2>

      <div
        style={{
          border: "1px solid #ddd",
          padding: 10,
          height: 200,
          overflowY: "auto",
        }}
      >
        {messages.map((m, i) => (
          // 💡 FIX: Access the 'username' and 'text' properties
          <div key={i}>
            <span style={{ fontWeight: "bold" }}>{m.username}</span>: {m.text}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Написать сообщение..."
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};

export default Chat;
