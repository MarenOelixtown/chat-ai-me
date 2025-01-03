import React, { useEffect, useState, useRef } from "react";
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
  const [chatFocus, setChatFocus] = useState("");
  const chatRefs = useRef([]); // needed for handleKeyDown, to enable keyboard-focus

  useEffect(() => {
    const activeChatObject = chats.find((chat) => chat.id === activeChat);
    setMessages(activeChatObject ? activeChatObject.messages : []);
  }, [activeChat, chats]);

  useEffect(() => {
    // Synchronize the length of the chatRefs array with the length of chats
    chatRefs.current = chatRefs.current.slice(0, chats.length);
  }, [chats]);

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

  const handleKeyDown = (event, index) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = (index + 1) % chats.length; // Cyclic navigation
      setChatFocus(chats[nextIndex].id);
      chatRefs.current[nextIndex]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = (index - 1 + chats.length) % chats.length; // Cyclic navigation
      setChatFocus(chats[prevIndex].id);
      chatRefs.current[prevIndex]?.focus();
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSelectChat(chats[index].id);
    }
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
      <section className="chat-list" aria-labelledby="chatlist-title">
        <div className="chat-list__header">
          <h2 id="chatlist-title">Chat List</h2>
          <button
            type="button"
            className="button--reset button__new-chat"
            aria-label="Add new Chat"
            onClick={() => onNewChat()}
          >
            <span className="bx bx-edit-alt" aria-hidden="true"></span>
          </button>
        </div>
        <ul
          role="listbox"
          tabIndex="0"
          aria-labelledby="chatlist-box"
          onKeyDown={(event) => {
            const focusedIndex = chats.findIndex(
              (chat) => chat.id === chatFocus
            );
            handleKeyDown(event, focusedIndex);
          }}
        >
          {chats.map((chat, index) => (
            <li
              key={chat.id}
              ref={(el) => (chatRefs.current[index] = el)}
              className={`chat-list__item ${
                chat.id === activeChat ? "active" : ""
              }`}
              role="option"
              aria-selected={`${chat.id === activeChat ? "true" : "false"}`}
              onClick={() => handleSelectChat(chat.id)}
              tabIndex={chat.id === chatFocus ? 0 : -1}
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
                onKeyDown={(event) => {
                  // onKeyDown function explicitly checks whether the Enter key has been pressed and executes the delete behavior.
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleDeleteChat(chat.id);
                  }
                }}
              >
                <span className="bx bx-x-circle" aria-hidden="true"></span>
              </button>
            </li>
          ))}
        </ul>
      </section>
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
