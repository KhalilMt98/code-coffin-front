import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./style.css";
import UserPopup from "../popup";  // Import the UserPopup component

const UserNav = ({
  text,
  bgColor = "primary-bg",
  textColor = "white-text",
  onMouseClick,
}) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const token= localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users',{
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        console.log(response.data.users)
        setUsers(response.data.users);
        setFilteredUsers(response.data.users); // Initialize filteredUsers with all users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query.length > 1) {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleSuggestionClick = (user) => {
    setSelectedUser(user);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <img src={`${process.env.PUBLIC_URL}/images/CodeCoffinLogo.png`} alt="logo" className="Logo" />

        <li className="nav-item">
          <div className="search-bar">
            <input
              id="searchInput"
              type="text"
              placeholder="Search Users..."
              value={query}
              onChange={handleInputChange}
            />
            {filteredUsers.length > 0 && (
              <ul className="suggestions-list">
                {filteredUsers.map((suggestion) => (
                  <li key={suggestion.id} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>

        <li className="nav-item"><Link to="/projects">Projects</Link></li>
        <li className="nav-item"><Link to="/messages">Messages</Link></li>
        <li className="nav-item"><Link to="/profile">Profile</Link></li>
      </ul>

      {selectedUser && <UserPopup user={selectedUser} onClose={handleClosePopup} />}
    </nav>
  );
};

export default UserNav;
