import React, { useState } from "react";
import "./ChatBotApp.css";

const ChatBotApp = ({ onGoBack, chats, setChats }) => {
  /* const handleSubmitMessage = (event) => {
    console.log("clicked");
    event.preventDefault();
    const formElements = event.target.elements;
    console.log(formElements);
    const newMessage = formElements.message.value;
    console.log(newMessage);
    event.target.reset();
  }; */
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(chats[0]?.messages || []);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };
  const sendMessage = () => {
    console.log("clicked");
    if (inputValue.trim === "") return;
    const newMessage = {
      type: "prompt",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };
    const updatedMessage = [...messages, newMessage];
    console.log(updatedMessage);
    setMessages(updatedMessage);
    setInputValue("");
    const updatedChats = chats.map((chat, index) => {
      if (index === 0) {
        return { ...chats, messages: updatedMessage };
      }
      return chats;
    });
    setChats(updatedChats);
  };
  return (
    <div className="chat-app">
      <div className="chat-list">
        <div className="chat-list__header">
          <h2 id="title">Chat List</h2>
          <i className="bx bx-edit-alt new-chat" aria-label="Edit"></i>
        </div>
        <div className="chat-list__item active">
          <h4>Chat 20/07/2024 12:59:42 PM</h4>
          <i className="bx bx-x-circle"></i>
        </div>
        <div className="chat-list__item">
          <h4>Chat 20/07/2024 12:59:42 PM</h4>
          <i className="bx bx-x-circle"></i>
        </div>
        <div className="chat-list__item">
          <h4>Chat 20/07/2024 12:59:42 PM</h4>
          <i className="bx bx-x-circle"></i>
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat with AI</h3>
          <i className="bx bx-arrow-back arrow" onClick={onGoBack}></i>
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
          <i className="fa-solid fa-face-smile emoji"></i>
          <label htmlFor="message-form-input" className="sr-only">
            Type a message
          </label>
          <input
            id="message-form-input"
            type="text"
            className="message-form__input"
            placeholder="Type a message..."
            onChange={handleInputChange}
          />
          <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
        </form>
      </div>
    </div>
  );
};

export default ChatBotApp;
