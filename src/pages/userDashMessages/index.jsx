import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import UserNav from '../../components/userNav';
import './style.css';

const UserDashMessages = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const token = localStorage.getItem('token');
  const location = useLocation();
  const receiverId = new URLSearchParams(location.search).get('receiver_id');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [token]);

  useEffect(() => {
    if (receiverId) {
      const startChatWithUser = async () => {
        try {
          const response = await axios.post('http://localhost:8000/api/chats', { participant_id: receiverId }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCurrentChat(response.data);
        } catch (error) {
          console.error('Error starting chat:', error);
        }
      };

      startChatWithUser();
    }
  }, [receiverId, token]);

  useEffect(() => {
    if (currentChat) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/messages?chat_id=${currentChat.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }
  }, [currentChat, token]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:8000/api/messages', {
        receiver_id: currentChat.participant_id,
        message: newMessage,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="body">
      <UserNav />
      <div className="messages-container">
        <div className="sidebar">
          {chats.length > 0 ? (
            chats.map(chat => (
              <div key={chat.id} onClick={() => setCurrentChat(chat)}>
                Chat with {chat.participant_id}
              </div>
            ))
          ) : (
            <p>No chats available</p>
          )}
        </div>
        <div className="chat-box">
          {currentChat ? (
            <div>
              <h3>Chat with {currentChat.participant_id}</h3>
              <div className="messages-list">
                {messages.map((msg) => (
                  <div key={msg.id} className="message">
                    <p>{msg.message}</p>
                    <small>{new Date(msg.created_at).toLocaleString()}</small>
                  </div>
                ))}
              </div>
              <div className="new-message">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          ) : (
            <p>Select a chat to start messaging</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashMessages;
