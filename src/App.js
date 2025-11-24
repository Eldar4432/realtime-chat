import React, { useEffect, useState } from "react";
import Channel from "./components/Channel/Channel";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";
import styles from "./App.module.css";
import { fetchUsers } from "./api/users";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const WS_URL = "ws://localhost:8080";

const App = () => {
  const [ws, setWs] = useState(null);
  const [username, setUsername] = useState("");
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [invited, setInvited] = useState({});

  // загрузка пользователей

  useEffect(() => {
    fetchUsers().then(setAllUsers);
  }, []);

  // простой обработчик сообщений сервера (сохраняю только users updates)
  useEffect(() => {
    if (!ws) return;
    const onMsg = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "users" && data.channelId) {
          // можно использовать данные, если нужно  -сейчас просто лог
          console.log("users for", data.channelId, data.payload);
        }
      } catch {}
    };
    ws.addEventListener("message", onMsg);
    return () => ws.removeEventListener("message", onMsg);
  }, [ws]);

  const connectWS = () => {
    if (ws) return;
    const socket = new WebSocket(WS_URL);
    socket.onopen = () => console.log("ws open");
    socket.onclose = () => {
      console.log("ws closed");
      setWs(null);
    };
    setWs(socket);
  };

  const createChannel = (name) => {
    if (!ws || !name) return;
    ws.send(
      JSON.stringify({
        type: "join_channel",
        payload: { channelId: name, username },
      })
    );
    if (!channels.includes(name)) setChannels([...channels, name]);
    setCurrentChannel(name);
  };

  const inviteUser = (userName) => {
    if (!ws || !currentChannel) return;
    ws.send(
      JSON.stringify({
        type: "invite_user",
        payload: { channelId: currentChannel, username: userName },
      })
    );
    setInvited((prev) => {
      const list = prev[currentChannel] || [];
      if (list.includes(userName)) return prev;
      return { ...prev, [currentChannel]: [...list, userName] };
    });
  };

  const removeUser = (userName) => {
    if (!ws || !currentChannel) return;
    ws.send(
      JSON.stringify({
        type: "remove_user",
        payload: { channelId: currentChannel, targetUsername: userName },
      })
    );
    setInvited((prev) => ({
      ...prev,
      [currentChannel]: (prev[currentChannel] || []).filter(
        (u) => u !== userName
      ),
    }));
  };

  return (
    <div>
      <Header />

      <div className={styles.app}>
        <LeftPanel
          ws={ws}
          username={username}
          setUsername={setUsername}
          connectWS={connectWS}
          channels={channels}
          setCurrentChannel={setCurrentChannel}
          createChannel={createChannel}
          allUsers={allUsers}
          inviteUser={inviteUser}
          invitedForCurrent={invited[currentChannel] || []}
        />

        <main className={styles.center}>
          {currentChannel ? (
            <Channel ws={ws} channelId={currentChannel} username={username} />
          ) : (
            <div className={styles.placeholder}>
              Выберите или создайте канал
            </div>
          )}
        </main>

        <RightPanel
          invitedUsers={invited[currentChannel] || []}
          removeUser={removeUser}
          username={username}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
