import React, { useState } from "react";
import ChatBotStart from "./Components/ChatBotStart";
import ChatBotApp from "./Components/ChatBotApp";

const App = () => {
  const [isChatting, setIsChatting] = useState(false);
  const [chats, setChats] = useState([]);

  const handleStartChat = () => {
    setIsChatting(true);

    if (chats.length === 0) {
      const newChat = {
        id: "Chat ${new Date().toLocaleDateString('de-DE')} ${new Date().toLocaleTimeString()}",
        messages: [],
      };
      setChats([newChat]);
    }
  };
  const handleGoBack = () => {
    setIsChatting(false);
  };
  return (
    <main className="container">
      {isChatting ? (
        <ChatBotApp onGoBack={handleGoBack} chats={chats} setChats={setChats} />
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </main>
  );
};

export default App;
