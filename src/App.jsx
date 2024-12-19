import React, { useState } from "react";
import ChatBotStart from "./Components/ChatBotStart";
import ChatBotApp from "./Components/ChatBotApp";

const App = () => {
  const [isChatting, setIsChatting] = useState(false);

  return (
    <main className="container">
      {/* <ChatBotStart /> */}
      <ChatBotApp />
    </main>
  );
};

export default App;
