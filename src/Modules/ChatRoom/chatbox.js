import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import io from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsAll } from "../StudentInfo/StudentInformation/service";
import { getChat } from "./service";

const socket = io("http://localhost:8081", {
  transports: ["websocket", "polling"],
});

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [teacherId] = useState("1"); // Example teacher ID
  const [selectedStudent, setSelectedStudent] = useState(null);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const {
    data: students,
    loading,
    error,
  } = useSelector((state) => state.getAllStudents);
  const { data: chat } = useSelector((state) => state.chatBox);
  console.log("chat", chat);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    dispatch(getStudentsAll());

    setMessages(chat);
  }, [dispatch, selectedStudent]);

  useEffect(() => {
    if (!selectedStudent) return;
  
    socket.on("receive_message", ({ roomId, message }) => {
      console.log("📩 Received message:", message, "for room:", roomId);
      console.log("📜 Previous messages state:", messages);
  
      if (selectedStudent?.id?.toString() === roomId) {
        setMessages((prev) => (Array.isArray(prev) ? [...prev, { receiverId: roomId, message }] : [{ receiverId: roomId, message }]));
      }
    });
  
    return () => {
      console.log("🔄 Cleaning up socket listener...");
      socket.off("receive_message");
    };
  }, [selectedStudent]);
  

  const joinRoom = (student) => {
    setSelectedStudent(student);
    dispatch(getChat({ teacherId, studentId: student?.id }));
    if (student?.id) {
      socket.emit("join_room", student?.id.toString());
    }
  };

  const sendMessage = async (data) => {
    const { message } = data;
    if (selectedStudent?.id && message) {
      socket.emit("send_message", {
        roomId: selectedStudent?.id.toString(),
        message,
      });

      await axios.post("http://localhost:8081/send", {
        senderId: teacherId,
        receiverId: selectedStudent?.id,
        message,
      });

      setMessages((prev) => [...prev, { senderId: teacherId, message }]);
      reset({ message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100  pb-5  flex">
      {/* Student List Sidebar */}
      <div className="w-1/4 bg-white shadow-lg rounded-2xl h-[40rem] p-4 overflow-y-scroll hide-scrollbar">
        <h2 className="text-xl font-bold text-gray-700 pt-12 mb-4">Students</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error loading students</p>}
        <ul className="space-y-2">
          {students?.map((student) => (
            <li
              key={student?.id}
              className={`p-2 rounded-lg cursor-pointer bg-gray-600 text-white hover:text-black hover:bg-gray-200 ${
                selectedStudent?.id === student?.id ? "bg-green-600" : ""
              }`}
              onClick={() => joinRoom(student)}
            >
              {student?.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="w-3/4 bg-white shadow-lg h-[40rem] rounded-2xl p-2 ml-4">
        <h1 className="text-3xl font-bold text-gray-700 mb-8">
          Chat with {selectedStudent?.name || "Select a Student"}
        </h1>

        {/* Message Input */}
        <form onSubmit={handleSubmit(sendMessage)} className="space-y-4">
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
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Messages:
          </h2>
          <div className="space-y-3 max-h-[20rem] overflow-y-auto ">
            {messages?.map((msg, index) => (
              <p
                key={index}
                className={`p-3 rounded-lg ${
                  msg.senderId === teacherId
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <strong>
                  {msg.senderId === teacherId ? "You" : selectedStudent?.name}:
                </strong>{" "}
                {msg.message}
              </p>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
