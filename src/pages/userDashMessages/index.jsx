import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {routes} from'../../utils/routes';
import axios from 'axios';
import './style.css'; 

const UserChats = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      verifyToken(token);
    } else {
      navigate(routes.login);
    }
  }, [token, navigate]);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.status === "success") {
        const userRole = response.data.user.role;
        if (userRole !== "user") {
          navigate("/admin");
        }
      } else {
        localStorage.removeItem("token");
        navigate(routes.login);
      }
    } catch (error) {
      console.error("Token verification error:", error);
      localStorage.removeItem("token");
      navigate(routes.login);
    }
  };


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChats(response.data.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [token]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const response = await axios.post('http://localhost:8000/api/messages', {
        receiver_id: selectedChat.chat.participant_id,
        message: newMessage
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sentMessage = response.data.data;
      sentMessage.created_at = new Date().toISOString(); 

      setMessages(prevMessages => [...prevMessages, sentMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container">
      <div className="chatList">
        <h2>Your Chats</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {chats.map(chatData => (
            <li
              key={chatData.chat.id}
              onClick={() => handleChatClick(chatData)}
              className="chatItem"
            >
              {chatData.participant_name}
            </li>
          ))}
        </ul>
      </div>

      <div className="chatContent">
        {selectedChat ? (
          <>
            <h3>Chat with {selectedChat.participant_name}</h3>
            <div className="messagesContainer">
              {messages.map(message => (
                <div key={message.id} className="message">
                  <p
                    className={`messageText ${message.sender_id === 103 ? 'messageSender' : 'messageReceiver'}`}
                  >
                    {message.message}
                    <span className="timestamp">
                      {message.created_at ? new Date(message.created_at).toLocaleTimeString() : 'Unknown time'}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <div className="inputContainer">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="messageInput"
              />
              <button onClick={handleSendMessage} className="sendButton">Send</button>
            </div>
          </>
        ) : (
          <p>Select a chat to view messages</p>
        )}
      </div>
    </div>
  );
};

export default UserChats;
