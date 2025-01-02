import React, { useEffect, useState } from "react";
import "./ChatBotApp.css";

const ChatBotApp = ({
  onGoBack,
  chats,
  setChats,
  activeChat,
  setActiveChat,
  onNewChat,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(chats[0]?.messages || []);

  useEffect(() => {
    const activeChatObject = chats.find((chat) => chat.id === activeChat);
    setMessages(activeChatObject ? activeChatObject.messages : []);
  }, [activeChat, chats]);

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

    if (!activeChat) {
      onNewChat(inputValue);
      setInputValue("");
    } else {
      const updatedMessages = [...messages, newMessage];
      console.log(updatedMessages);
      setMessages(updatedMessages);
      setInputValue("");

      const updatedChats = chats.map((chat) => {
        if (chat.id === activeChat) {
          return { ...chat, messages: updatedMessages };
        }
        return chat;
      });
      setChats(updatedChats);
    }
  };

  const handleSelectChat = (id) => {
    setActiveChat(id);
  };
  const handleDeleteChat = (id) => {
    const updateDeletedChats = chats.filter((chat) => chat.id !== id);

    setChats(updateDeletedChats);

    if (id === activeChat) {
      const newActiveChat =
        updateDeletedChats.length > 0 ? updateDeletedChats[0].id : null;
      console.log(newActiveChat);
      setActiveChat(newActiveChat);
    }
  };

  return (
    <div className="chat-app">
      <div className="chat-list">
        <div className="chat-list__header">
          <h2 id="title">Chat List</h2>
          <button
            type="button"
            className="button--reset button__new-chat"
            aria-label="Add new Chat"
            onClick={() => onNewChat()}
          >
            <span className="bx bx-edit-alt" aria-hidden="true"></span>
          </button>
        </div>
        <div>
          {chats.map((chat) => (
            <div
              onClick={() => handleSelectChat(chat.id)}
              key={chat.id}
              className={`chat-list__item ${
                chat.id === activeChat ? "active" : ""
              }`}
            >
              <h4>{chat.date}</h4>
              <button
                type="button"
                className="button--reset button__delete"
                aria-label={`Delete ${chat.date}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteChat(chat.id);
                }}
              >
                <span className="bx bx-x-circle" aria-hidden="true"></span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat with AI</h3>
          <button
            className="button--reset button__close"
            aria-label="Close Chat AI"
            onClick={onGoBack}
          >
            <span className="bx bx-arrow-back arrow" aria-hidden="true"></span>
          </button>
        </div>
        <div className="chat">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.type === "prompt" ? "chat__prompt" : "chat__response"
              }`}
            >
              {message.text}
              <span>{message.timestamp}</span>
            </div>
          ))}

          <div className="chat__typing">Typing...</div>
        </div>
        <form
          className="message-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <button
            type="button"
            className="button--reset message-form__button"
            aria-label="Add emoji"
          >
            <span
              className="fa-solid fa-face-smile emoji"
              aria-hidden="true"
            ></span>
          </button>
          <label htmlFor="message-form-input" className="sr-only">
            Type a message
          </label>
          <input
            id="message-form-input"
            type="text"
            className="message-form__input"
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="button--reset message-form__button"
            aria-label="Send Chat-Message"
            onClick={sendMessage}
          >
            <span className="fa-solid fa-paper-plane" aria-hidden="true"></span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBotApp;
