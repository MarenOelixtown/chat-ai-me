import React from "react";

const ChatBotApp = () => {
  return (
    <div className="chat-app">
      <div className="chat-list">
        <div className="chat-list__header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat"></i>
        </div>
        <div className="chat-list__item">
          <h4>Chat 20/07/2024 12:59:42 PM</h4>
          <i className="bx bx-x circle"></i>
        </div>
        <div className="chat-list__item">
          <h4>Chat 20/07/2024 12:59:42 PM</h4>
          <i className="bx bx-x circle"></i>
        </div>
        <div className="chat-list__item">
          <h4>Chat 20/07/2024 12:59:42 PM</h4>
          <i className="bx bx-x circle"></i>
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat with AI</h3>
          <i className="bx-bx-arrow-back arrow"></i>
        </div>
        <div className="chat">
          <div className="chat__prompt">
            Hi, hhow are you?<span>12:59:51 PM</span>
          </div>
          <div className="chat__response">
            Hello! I'm just a omputer program, so I don't have feelings, but I'm
            here and ready to assist you. How can I help today?
            <span>12:59:52 PM</span>
          </div>
          <div className="chat__typing">Typing...</div>
        </div>
        <form className="message-form">
          <i className="fa-solid fa-face smile emoji"></i>
          <label htmlFor="message-form-input" className="sr-only">
            Type a message
          </label>
          <input
            id="message-form-input"
            type="text"
            className="message-form__input"
            placeholder="Type a message..."
          />
          <i className="fa-solid fa-paper-plane"></i>
        </form>
      </div>
    </div>
  );
};

export default ChatBotApp;
