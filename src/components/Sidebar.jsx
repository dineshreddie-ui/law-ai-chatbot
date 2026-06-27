export default function Sidebar({
  chats,
  activeChatId,
  setActiveChatId,
  createChat,
  deleteChat,
  clearAllChats,
}) {
  return (
    <div className="w-72 bg-slate-900 text-white p-4">
      <h1 className="text-xl font-bold mb-4">
        ⚖️ Law AI
      </h1>

      <button
        onClick={createChat}
        className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700"
      >
        + New Chat
      </button>

      <button
        onClick={clearAllChats}
        className="w-full mt-2 bg-red-600 p-3 rounded hover:bg-red-700"
      >
        🧹 Clear All Chats
      </button>

      <div className="mt-4">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`mt-2 p-3 rounded flex items-center justify-between ${
              activeChatId === chat.id
                ? "bg-slate-700"
                : "bg-slate-800"
            }`}
          >
            <span
              onClick={() => setActiveChatId(chat.id)}
              className="cursor-pointer flex-1 truncate"
            >
              {chat.title}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat.id);
              }}
              className="ml-2 text-red-400 hover:text-red-300"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}