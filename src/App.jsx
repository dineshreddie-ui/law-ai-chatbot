import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("lawChats");
    return savedChats ? JSON.parse(savedChats) : [];
  });

  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "lawChats",
      JSON.stringify(chats)
    );
  }, [chats]);

  const createChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (id) => {
    const updatedChats = chats.filter(
      (chat) => chat.id !== id
    );

    setChats(updatedChats);

    if (activeChatId === id) {
      setActiveChatId(
        updatedChats.length > 0
          ? updatedChats[0].id
          : null
      );
    }
  };

  const clearAllChats = () => {
    setChats([]);
    setActiveChatId(null);
    localStorage.removeItem("lawChats");
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        createChat={createChat}
        deleteChat={deleteChat}
        clearAllChats={clearAllChats}
      />

      <ChatWindow
        chats={chats}
        setChats={setChats}
        activeChatId={activeChatId}
      />
    </div>
  );
}

export default App;