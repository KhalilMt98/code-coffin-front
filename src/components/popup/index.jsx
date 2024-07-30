import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './style.css';

const UserPopup = ({ user, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.user_id);
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:8000/api/source-codes/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userProjects = response.data.filter((project) => project.user_id === userId);
        setProjects(userProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <h3>Projects:</h3>
        <ul className="projects-list">
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id}>{project.title}</li>
            ))
          ) : (
            <li>No projects available</li>
          )}
        </ul>
        <Link to={`/messages?receiver_id=${user.id}`} className="message-button">
          Message
        </Link>
      </div>
    </div>
  );
};

export default UserPopup;
