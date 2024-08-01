import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './popup.css';

const UserPopup = ({ user, onClose }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`http://localhost:8000/api/source-codes/getUserProject/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error.response.data);
      }
    };

    if (user.id) {
      fetchProjects();
    }
  }, [user.id]);

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
        <Link to={`/chats?receiver_id=${user.id}&receiver_name=${user.name}`} className="message-button">
          Message
        </Link>
      </div>
    </div>
  );
};

export default UserPopup;
