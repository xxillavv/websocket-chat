"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { io } from "socket.io-client";
import { useRef } from "react";

type message = {
  name: string;
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [name, setName] = useState("");
  const [typing, setTyping] = useState("");
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001");

    const handler = (message: message) => {
      setMessages((prev) => [...prev, message]);
    };

    socketRef.current.emit("findAllChat", {}, (response: message[]) => {
      setMessages(response);
    });

    socketRef.current.on("message", handler);

    return () => {
      socketRef.current.off("message", handler);
    };
  }, []);

  const join = () => {
    socketRef.current.emit("join", { name }, () => {
      setIsJoined(true);
    });
  };

  const sendMessage = () => {
    socketRef.current.emit(
      "createChat",
      { text: messageText },
      (response: message) => {
        setMessageText("");
      },
    );
  };

  const emitTyping = () => {
    socketRef.current.emit("typing", { isTyping: true });

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socketRef.current.emit("typing", { isTyping: false });
    }, 2000);
  };

  return (
    <div className={styles.container}>
      {!isJoined ? (
        <div className={styles.joinBox}>
          <h2>Join chat</h2>

          <input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={join}>Join</button>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <h3>Live Chat</h3>
            <span>You: {name}</span>
          </div>
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`${styles.message} ${
                  m.name === name ? styles.mine : ""
                }`}
              >
                <div className={styles.name}>{m.name}</div>
                <div className={styles.text}>{m.text}</div>
              </div>
            ))}
            {typing && <div className={styles.typing}>{typing}</div>}
          </div>
          <div className={styles.inputBox}>
            <input
              value={messageText}
              placeholder="Type message..."
              onChange={(e) => {
                setMessageText(e.target.value);
                emitTyping();
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className={styles.button} onClick={sendMessage}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
