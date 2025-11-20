import React from "react";
import styles from "./Participants.module.css";

const Participants = ({
  participants = [],
  isOwner = false,
  onKick,
  onRefresh,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <h4 className={styles.title}>Участники</h4>
        <button className={styles.refresh} onClick={onRefresh}>
          Обновить
        </button>
      </div>

      <div className={styles.list}>
        {participants.length === 0 && (
          <div className={styles.empty}>Нет участников</div>
        )}
        {participants.map((p) => (
          <div key={p.clientId} className={styles.row}>
            <div>{p.username}</div>
            {isOwner && (
              <button
                className={styles.kick}
                onClick={() => onKick?.(p.clientId)}
              >
                Кик
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
