import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import io from "socket.io-client";
import axios from "axios";
import { getChildren, chatHistory, getChat } from "./service";
import { useDispatch, useSelector } from "react-redux";

const socket = io("http://localhost:8081", {
  transports: ["websocket", "polling"],
});

const StudentChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [students, setStudents] = useState([]);
  const [chatList, setChatList] = useState([]);
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const [selectedSender, setSelectedSender] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const dispatch = useDispatch();
  const { data: group } = useSelector((state) => state.chatHistory);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { roomId: "", message: "" },
  });
  console.log("data of group", group);
  useEffect(() => {
    dispatch(chatHistory(userId)).then((action) => {
      if (action.payload) {
        const groupedChats = {};
        action.payload.forEach((chat) => {
          const otherUser =
            chat.senderId === userId ? chat.receiverId : chat.senderId;
          if (!groupedChats[otherUser]) {
            groupedChats[otherUser] = [];
          }
          groupedChats[otherUser].push(chat);
        });

        setChatList(Object.keys(groupedChats));
      }
    });
  }, [dispatch, email]);

  // Fetch students data
  useEffect(() => {
    dispatch(getChildren(email)).then((action) => {
      if (action.payload && action.payload.students) {
        setStudents(action.payload.students);
      }
    });
  }, [dispatch, email]);

  useEffect(() => {
    socket.on("receive_message", ({ roomId, message, userId }) => {
      console.log("message from teacher", message);
      if (selectedStudentId.toString() === roomId) {
        setMessages((prev) => [...prev, { receiverId: roomId, message }]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedStudentId, socket]);

  const joinRoom = (id) => {
    const room = id.toString();
    setSelectedStudentId(room);

    socket.emit("join_room", room);
  };

  useEffect(() => {
    joinRoom(selectedStudentId);
  }, [selectedStudentId]);

  const sendMessage = async (data) => {
    const { roomId, message } = data;
    if (roomId && message) {
      socket.emit("send_message", { roomId, message });

      await axios.post("http://localhost:8081/send", {
        senderId: selectedStudentId,
        receiverId: roomId,
        message,
      });
      
      setMessages((prev) => [
        ...prev,
        { senderId: selectedStudentId, message },
      ]);

      reset({ message: "" });
    }
  };
  const handleSenderClick = async (senderId) => {
    setSelectedSender(senderId);
    dispatch(getChat({ studentId: userId, teacherId: senderId }))
      .then((action) => {
        if (action.payload) {
          setMessages(action.payload);
        }
      })
      .catch((error) => {
        console.error("Error fetching chat:", error);
      });
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 flex">
      {/* Student List */}
      <div className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Students</h2>
        {students.map((student) => (
          <button
            key={student.id}
            onClick={() => joinRoom(student.id)}
            className={`block w-full text-left p-2 rounded-lg ${
              selectedStudentId === student.id
                ? "bg-blue-200 text-blue-900"
                : "bg-gray-200 text-gray-900"
            } mb-2 hover:bg-blue-300`}
          >
            {student.name}
          </button>
        ))}
      </div>

      {/* Chat Box */}
      <div className="w-3/4 max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
          Student Chat Box
        </h1>

        {/* Room ID Input */}
        <form onSubmit={handleSubmit(sendMessage)} className="space-y-4"></form>

        {/* Message Input */}
        <form onSubmit={handleSubmit(sendMessage)} className="space-y-4 mt-6">
          <textarea
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            rows="4"
            placeholder="Type your message..."
            {...register("message", { required: "Message cannot be empty" })}
          />
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Send Message
          </button>
        </form>

        {/* Messages Display */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            Messages:
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {messages.map((msg, index) => (
              <p
                key={index}
                className={`p-3 rounded-lg ${
                  msg.senderId === userId
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <strong>{msg.senderId === userId ? "You" : "Teacher"}:</strong>{" "}
                {msg.message}
              </p>
            ))}
            {messages.map((message) => (
              <li key={message.id}>
                {message.senderId === userId ? "You: " : "Them: "}
                {message.message}
              </li>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2>Chats</h2>
        <ul>
          {chatList.map((senderId) => (
            <li key={senderId} onClick={() => handleSenderClick(senderId)}>
              User {senderId}
            </li>
          ))}
        </ul>

        {selectedSender && (
          <div>
            <h3>Messages with User {selectedSender}</h3>
            <ul>
              {messages.map((message) => (
                <li key={message.id}>
                  {message.senderId === userId ? "You: " : "Them: "}
                  {message.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentChatBox;
