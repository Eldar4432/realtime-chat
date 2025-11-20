import React, { useState } from "react";
import ChannelList from "./components/ChannelList/ChannelList";
import ChatWindow from "./components/ChatWindow/ChanWindow";
import Participants from "./components/Participants/Participants";
import UserSearch from "./components/UserSearch/UserSearch";
import "./index.css";

function App() {
  const [currentChannel, setCurrentChannel] = useState(null);

  // простые заглушки
  const channels = [
    { channelId: "1", name: "Общий", memberCount: 3 },
    { channelId: "2", name: "Frontend", memberCount: 2 },
  ];
  const messages = [
    { username: "User1", text: "Привет!" },
    { username: "User2", text: "Как дела?" },
  ];
  const participants = [
    { clientId: "1", username: "User1" },
    { clientId: "2", username: "User2" },
  ];

  const handleSend = (text) => {
    // пока просто alert — позже заменим на ws.send
    alert("Отправлено: " + text);
  };

  const handleInvite = (user) => {
    alert("Пригласить: " + user.name);
  };

  return (
    <div className="app-grid">
      <aside className="left">
        <div className="brand">Realtime Chat</div>
        <ChannelList
          channels={channels}
          currentChannel={currentChannel}
          onJoin={setCurrentChannel}
        />
        <UserSearch onSelect={handleInvite} />
      </aside>

      <main className="center">
        <ChatWindow
          channelId={currentChannel}
          messages={messages}
          onSend={handleSend}
        />
      </main>

      <aside className="right">
        <Participants
          participants={participants}
          isOwner={true}
          onKick={(id) => alert("Кик: " + id)}
          onRefresh={() => alert("Обновить")}
        />
      </aside>
    </div>
  );
}

export default App;
