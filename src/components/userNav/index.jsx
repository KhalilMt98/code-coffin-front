import React from "react";
import "./style.css";
import { Link } from 'react-router-dom';



const UserNav = ({
  text,
  bgColor = "primary-bg",
  textColor = "white-text",
  onMouseClick,
}) => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <img src={`${process.env.PUBLIC_URL}/images/CodeCoffinLogo.png`} alt="logo" className="Logo" />

        <li className="nav-item">
            <div className="search-bar">
                <input
                    id = "searchInput"
                    type="text"
                    placeholder="Search..."
                    // value={query}
                    // onChange={handleInputChange}
                />
                <button className="search-button">
                    <img src={`${process.env.PUBLIC_URL}/images/SearchIcon.png`} alt="search" className="search-icon" />
                </button>
                {/* {suggestions.length > 0 && (
                     <ulclassName="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                        <li key={index} className="suggestion-item">{suggestion}</li>
                        ))} */}
                    <ul></ul>
                {/* )} */}
            </div>
        </li>

        <li className="nav-item"><Link to="/projects">Projects</Link></li>
        <li className="nav-item"><Link to="/messages">Messages</Link></li>
        <li className="nav-item"><Link to="/profile">Profile</Link></li>

      </ul>
    </nav>

    
  );
};

export default UserNav;
