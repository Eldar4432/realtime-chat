import { useEffect, useState } from "react";
import { fetchUsers } from "./api/users";
import ChannelList from "./components/ChannelList/ChannelList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);

  // пока что заглушки
  const channels = [
    { channelId: "1", name: "Общий", memberCount: 3 },
    { channelId: "2", name: "Frontend", memberCount: 2 },
  ];

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-Time Chat</h1>
      <ChannelList
        channels={channels}
        currentChannel={currentChannel}
        onJoin={(id) => setCurrentChannel(id)}
      />

      <h2>Пользователи:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.username})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
