import React from "react";
import "./ChatBotStart.css";

const ChatBotStart = ({ onStartChat }) => {
  return (
    <div className="start-page">
      <button type="button" className="start-page__btn" onClick={onStartChat}>
        <span className="sr-only">Start</span>Chat AI
      </button>
    </div>
  );
};

export default ChatBotStart;
