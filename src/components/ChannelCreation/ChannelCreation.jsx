import React, { useState } from "react";
import styles from "../../App.module.css";

const ChannelCreation = ({ createChannel }) => {
  const [channelName, setChannelName] = useState("");
  return (
    <div className={styles.channelCreate}>
      <input
        className={styles.input}
        placeholder="Название канала"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        className={styles.primaryBtn}
        onClick={() => {
          if (!channelName.trim()) return;
          createChannel(channelName.trim());
          setChannelName("");
        }}
      >
        Создать
      </button>
    </div>
  );
};

export default ChannelCreation;
