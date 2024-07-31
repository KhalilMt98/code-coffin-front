import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import UserNav from '../../components/userNav';
import axios from 'axios';
import "./style.css";

const UserDashProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const newProjectCode ='empty';
    const navigate = useNavigate(); 
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          verifyToken(token);
        }
      }, [navigate]);
    
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
            navigate("/login");
          }
        } catch (error) {
          console.error("Token verification error:", error);
          localStorage.removeItem("token");
          navigate("/login")
        }
      };
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/source-codes/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setProjects(data.source_codes);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleAddProjectClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewProjectTitle('');
    };

    const handleAddProject = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8000/api/source-codes/',
                { title: newProjectTitle, code: newProjectCode },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const newProject = response.data;
            setProjects([...projects, newProject.source_code]);
            handleCloseModal();
            navigate(`/projects/${newProject.source_code.id}`);
        } catch (error) {
            console.error('Error adding source code:', error);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/projects/${id}`);
    };

    return (
        <div className="body">
            <UserNav />
            <div className="button-container">
                <button className="add-project-button" onClick={handleAddProjectClick}>
                    Add Project
                </button>
            </div>
            <div className="projects-container">
                <table className="projects-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id} onClick={() => handleRowClick(project.id)}>
                                <td>{project.title}</td>
                                <td>{new Date(project.created_at).toLocaleString()}</td>
                                <td>{new Date(project.updated_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Add New Project</h2>
                        <input
                            type="text"
                            value={newProjectTitle}
                            onChange={(e) => setNewProjectTitle(e.target.value)}
                            placeholder="Enter project title"
                        />
                        <button onClick={handleAddProject}>Add</button>
                        <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashProjects;
