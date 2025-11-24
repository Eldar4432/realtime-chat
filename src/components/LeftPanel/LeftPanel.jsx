import React from "react";
import UserList from "../UserList/UserList";
import ChannelCreation from "../ChannelCreation/ChannelCreation";
import styles from "../../App.module.css";

const LeftPanel = ({
  ws,
  username,
  setUsername,
  connectWS,
  channels,
  setCurrentChannel,
  createChannel,
  allUsers,
  inviteUser,
  invitedForCurrent,
}) => {
  return (
    <aside className={styles.left}>
      {!ws ? (
        <div className={styles.connectBox}>
          <input
            className={styles.input}
            placeholder="Ваше имя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className={styles.primaryBtn} onClick={connectWS}>
            Подключиться
          </button>
        </div>
      ) : (
        <>
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Создать канал</h4>
            <ChannelCreation createChannel={createChannel} />
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Ваши каналы</h4>
            <div className={styles.channelList}>
              {channels.length === 0 && (
                <div className={styles.empty}>Список пуст</div>
              )}
              {channels.map((ch) => (
                <button
                  key={ch}
                  className={`${styles.channelItem} ${
                    ch ===
                    /* current handled in App by setCurrentChannel */ null
                      ? styles.channelActive
                      : ""
                  }`}
                  onClick={() => setCurrentChannel(ch)}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Все пользователи</h4>
            <div className={styles.userListWrap}>
              <UserList
                users={allUsers}
                inviteUser={inviteUser}
                invitedUsers={invitedForCurrent}
              />
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default LeftPanel;
