import React, { useEffect, useState } from 'react';
import UserNav from '../../components/userNav';
import "./style.css";

const UserDashProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects'); 
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const createProject = async () => {
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: 'New Project' }),
            });

            if (response.ok) {
                const newProject = await response.json();
                setProjects([...projects, newProject]);
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
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
                {projects.map(project => (
                    <div key={project.id} className="project-item">
                        {project.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashProjects;
