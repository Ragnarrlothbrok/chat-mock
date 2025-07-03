import "./styles.css";
import React, { useState, useEffect } from "react";
import ChatLists from "./components/ChatLists";
import ChatWindow from "./components/ChatWindow";
import { usePersistentState } from "./hooks/usePersistentState";

export default function App() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(
    usePersistentState("selectedChatId")
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/codebuds-fk/chat/chats")
      .then((res) => res.json())
      .then((apiChats) => {
        const saved = localStorage.getItem("chatMessages");
        if (!saved) {
          setChats(apiChats);
        } else {
          const stored = JSON.parse(saved);
          const merged = apiChats.map((chat) => ({
            ...chat,
            messageList: stored[chat.id] || chat.messageList,
          }));
          setChats(merged);
        }
      });
  }, []);

  const updateChatMessages = (chatId, newMessages) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, messageList: newMessages } : chat
      )
    );
    const stored = JSON.parse(localStorage.getItem("chatMessages") || "{}");
    stored[chatId] = newMessages;
    localStorage.setItem("chatMessages", JSON.stringify(stored));
  };

  const selectedChat = chats.find((chat) => chat.id === Number(selectedChatId));
  const selectedMessages = selectedChat?.messageList || [];

  return (
    <>
      {selectedChatId === null ? (
        <ChatLists
          chats={chats}
          search={search}
          setSearch={setSearch}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
        />
      ) : (
        <div>
          <ChatLists
            chats={chats}
            search={search}
            setSearch={setSearch}
            selectedChatId={selectedChatId}
            setSelectedChatId={setSelectedChatId}
          />
          <ChatWindow
            messages={selectedMessages}
            chatTitle={selectedChat?.title}
            onBack={() => setSelectedChatId(null)}
            onSendMessage={(msg) => {
              const updated = [...selectedMessages, msg];
              updateChatMessages(selectedChatId, updated);
            }}
            className="chat-bg"
            chatAvatar={selectedChat?.imageURL}
          />
        </div>
      )}
    </>
  );
}
