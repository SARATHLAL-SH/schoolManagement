import io from "socket.io-client";
import axios from "axios";
const userId = localStorage.getItem("userId");
const socket = io("http://localhost:8081", {
  transports: ["websocket", "polling"],
});
const message = "keep regular Attendance";
export const messageHandler = async (row) => {
  const room = row?.id.toString();
  socket.emit("join_room", room);
  console.log("joining room is ", row.id);

  socket.emit("send_message", {
    roomId: row?.id.toString(),
    message,
    userId,
  });

  await axios.post("http://localhost:8081/send", {
    senderId: userId,
    receiverId: row.id,
    message,
  });
};
