import React, { useState } from 'react';
import Sidebar from '../../components/admin/sidebar.jsx';
import Users from '../../components/admin/Users.jsx';
import AddUser from '../../components/admin/AddUser.jsx';
import Logout from '../../components/admin/Logout.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import './style.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users');
  const [sidebarVisible, setSidebarVisible] = useState(true);
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
          if (userRole !== "admin") {
            navigate("/profile");
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
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <Users />;
      case 'addUser':
        return <AddUser />;
      case 'logout':
        return <Logout />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar 
        handleSectionChange={handleSectionChange} 
        activeSection={activeSection} 
        className={sidebarVisible ? '' : 'hidden'} 
      />
      <button className="toggle-btn" onClick={handleToggleSidebar}>
        {sidebarVisible ? 'Show Sidebar' : 'Hide Sidebar'}
      </button>
      <main className="content1">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
