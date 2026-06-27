import { useState, useEffect, useRef } from "react";
import { askLawAI } from "../services/aiService";

export default function ChatWindow({
  chats,
  setChats,
  activeChatId,
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeChat?.messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
  role: "user",
  content: input,
  time: new Date().toLocaleTimeString(),
};

    setLoading(true);

    let aiReply;

    try {
      aiReply = await askLawAI(input);
    } catch (error) {
      console.error(error);

      aiReply =
        "Unable to contact the AI service. Please check your API key and quota.";
    } finally {
      setLoading(false);
    }

    const aiMessage = {
  role: "assistant",
  content: aiReply,
  time: new Date().toLocaleTimeString(),
};

    const updatedChats = chats.map((chat) =>
      chat.id === activeChatId
        ? {
            ...chat,
            title:
              chat.messages.length === 0
                ? input.slice(0, 25)
                : chat.title,
            messages: [
              ...chat.messages,
              userMessage,
              aiMessage,
            ],
          }
        : chat
    );

    setChats(updatedChats);
    setInput("");
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Start a new legal conversation
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      <div className="p-4 bg-white border-b">
        <h2 className="text-xl font-bold">
          ⚖️ Legal Assistant
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Educational information only. Not legal advice.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeChat.messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              
  className={`max-w-2xl p-3 rounded-lg whitespace-pre-wrap ${
    msg.role === "user"
      ? "bg-blue-600 text-white"
      : "bg-white shadow"
  }`}

            >
              <div className="whitespace-pre-wrap">
  {msg.content}
</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="bg-white p-3 rounded-lg shadow w-fit">
            Thinking...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          placeholder="Ask a legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 border rounded p-3"
        />
        <p className="text-xs text-gray-500 mt-2 text-center">
  This chatbot provides educational legal information and is not a substitute for professional legal advice.
</p>

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-5 rounded disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}