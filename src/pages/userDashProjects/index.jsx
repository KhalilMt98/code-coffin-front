import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNav from '../../components/userNav';
import "./style.css";

const UserDashProjects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/source-codes/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log('API Response:', data); // Log the response
            setProjects(data.source_codes);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const createProject = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/source-codes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title: 'New Project', code: '' }),
            });

            if (response.ok) {
                const newProject = await response.json();
                setProjects([...projects, newProject.source_code]);
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleEdit = (id, title) => {
        localStorage.setItem('source_code_id', id);
        localStorage.setItem('source_code_title', title);
        navigate('/code-editor');
    };

    return (
        <div className="body">
            <UserNav />
            <div className="button-container">
                <button className="search-button" onClick={createProject}>
                    New Project
                    <img src={`${process.env.PUBLIC_URL}/images/plusIcon.png`} alt="plus" />
                </button>
            </div>
            <div className="projects-container">
                <table className="projects-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id}>
                                <td>{project.title}</td>
                                <td>{new Date(project.created_at).toLocaleString()}</td>
                                <td>{new Date(project.updated_at).toLocaleString()}</td>
                                <td>
                                    <button 
                                        className="edit-button" 
                                        onClick={() => handleEdit(project.id, project.title)}>
                                        <img src={`${process.env.PUBLIC_URL}/images/editIcon.png`} alt="Edit" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDashProjects;
