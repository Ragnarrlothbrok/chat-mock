import React from "react";

export default function ChatLists({
  chats = [],
  selectedChatId,
  setSelectedChatId,
  search,
  setSearch,
}) {
  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(search.toLowerCase()) ||
      chat.orderId.toLowerCase().includes(search.toLowerCase())
  );

  const formatTimestamp = (value) => {
    const date = new Date(value);
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    return isToday
      ? date.toLocalTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString();
  };

  return (
    <div className="h-full p-16 bg-white">
      <h2 className="heading-2">Filter by Title / Order ID</h2>
      <input
        placeholder="Start typing to Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white input-box"
      />
      {filteredChats.map((chat) => {
        const lastMessage =
          chat.messageList?.[chat.messageList.length - 1]?.message ||
          "Send a message to start chatting";
        return (
          <div
            key={chat.id}
            onClick={() => setSelectedChatId(chat.id)}
            className="chat-item"
            style={{
              backgroundColor: chat.id === selectedChatId ? "#f1f3f6" : "#fff",
            }}
          >
            <img src={chat.imageURL} alt="avatar" className="avatar" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="title">{chat.title}</span>
                <span className="timestamp">
                  {formatTimestamp(chat.latestMessageTimestamp)}
                </span>
              </div>
              <div className="orderId">{chat.orderId}</div>
              <div className="lastMessage">{lastMessage}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
