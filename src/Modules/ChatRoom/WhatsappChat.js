import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:8081");

export default function WhatsappChat() {
  const [qrCode, setQrCode] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isConnected, setIsConnected] = useState("Connect");
  const [clientState, setClientState] = useState("LOADING...");

  useEffect(() => {
    socket.on("qrCode", (qr) => setQrCode(qr));
    socket.on("clientState", (state) => {
      console.log("Client state:", state);
      setClientState(state);
    });
    return () => {
      socket.off("qrCode");
      socket.off("clientState");
    };
  }, []);
  console.log("clientState", clientState);
  const connectionHandler = async (message) => {
    if (!recipient) return alert("Enter recipient and message");
    try {
      const response = await axios.post(
        "http://localhost:8081/api/whatsapp/send",
        {
          recipient,
          message,
        }
      );
    } catch (err) {
      setStatus("Failed to send message");
    }
  };

  const sendMessage = async () => {
    if (!recipient || !message) return alert("Enter recipient and message");

    try {
      const response = await axios.post(
        "http://localhost:8081/api/whatsapp/send",
        {
          recipient,
          message,
        }
      );
      setStatus(response.data.message);
      setMessage("");
      setTimeout(() => {
        setStatus("");
      }, 3000);
    } catch (err) {
      setStatus("Failed to send message");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">WhatsApp Bot</h1>
     
      {qrCode ? (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
          <p className="text-center mt-2">Scan this QR Code</p>
        </div>
      ) : (
        <p className="text-gray-600">Waiting for QR Code...</p>
      )}

      <div className="mt-6 p-4 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Send Message</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Recipient Number (e.g. 918765432109)"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Send Message
        </button>
        {status && <p className="text-green-600 mt-2">{status}</p>}
      </div>
    </div>
  );
}
