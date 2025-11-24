const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

const channels = {}; // { channelId: { users: Map(ws => username) } }

wss.on("connection", (ws) => {
  ws.username = null;
  ws.channelId = null;

  ws.on("message", (msg) => {
    let data;
    try {
      data = JSON.parse(msg);
    } catch {
      return;
    }

    const { type, payload } = data;

    if (type === "join_channel") {
      const { channelId, username } = payload;
      ws.username = username;
      ws.channelId = channelId;

      if (!channels[channelId]) channels[channelId] = { users: new Map() };
      channels[channelId].users.set(ws, username);

      broadcastUsers(channelId);
    }

    if (type === "send_message") {
      const { channelId, message } = payload;
      broadcastMessage(channelId, ws.username, message);
    }

    if (type === "invite_user") {
      const { channelId } = payload;
      broadcastUsers(channelId);
    }

    if (type === "remove_user") {
      const { channelId, targetUsername } = payload;
      const channel = channels[channelId];
      if (!channel) return;
      for (let [client, name] of channel.users.entries()) {
        if (name === targetUsername) {
          client.close();
          channel.users.delete(client);
        }
      }
      broadcastUsers(channelId);
    }
  });

  ws.on("close", () => {
    if (ws.channelId && channels[ws.channelId]) {
      channels[ws.channelId].users.delete(ws);
      broadcastUsers(ws.channelId);
    }
  });
});

function broadcastMessage(channelId, username, message) {
  const channel = channels[channelId];
  if (!channel) return;
  const payload = JSON.stringify({
    type: "message",
    payload: { username, message },
  });
  channel.users.forEach((_, ws) => ws.send(payload));
}

function broadcastUsers(channelId) {
  const channel = channels[channelId];
  if (!channel) return;
  const payload = JSON.stringify({
    type: "users",
    payload: Array.from(channel.users.values()),
    channelId,
  });
  channel.users.forEach((_, ws) => ws.send(payload));
}

console.log("WebSocket server running on ws://localhost:8080");
