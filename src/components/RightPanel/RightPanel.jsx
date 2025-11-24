import React from "react";
import styles from "../../App.module.css";

const RightPanel = ({ invitedUsers = [], removeUser = () => {}, username }) => {
  return (
    <aside className={styles.right}>
      <h4 className={styles.sectionTitle}>Приглашённые</h4>
      <div className={styles.invitedList}>
        {invitedUsers.length === 0 && (
          <div className={styles.empty}>Список пуст</div>
        )}
        {invitedUsers.map((u) => (
          <div key={u} className={styles.invitedItem}>
            <span className={styles.invitedName}>{u}</span>
            {u !== username && (
              <button
                className={styles.negativeBtn}
                onClick={() => removeUser(u)}
              >
                Удалить
              </button>
            )}
          </div>
        ))}
      </div>

      <div className={styles.sectionFooter}>
        <div className={styles.smallHint}>Управляйте приглашениями</div>
      </div>
    </aside>
  );
};

export default RightPanel;
