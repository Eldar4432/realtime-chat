import { useEffect, useState } from "react";
import { fetchUsers } from "./api/users";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-Time Chat</h1>

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
