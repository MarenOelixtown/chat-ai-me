import React, { useState } from "react";
import ChatBotStart from "./Components/ChatBotStart";
import ChatBotApp from "./Components/ChatBotApp";

const App = () => {
  const [isChatting, setIsChatting] = useState(false);

  const handleStartChat = () => {
    setIsChatting(true);
  };
  const handleGoBack = () => {
    setIsChatting(false);
  };
  return (
    <main className="container">
      {isChatting ? (
        <ChatBotApp onGoBack={handleGoBack} />
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </main>
  );
};

export default App;
