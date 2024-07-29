import React, { useState } from 'react';
import Sidebar from '../../components/admin/sidebar.jsx';
import Users from '../../components/admin/Users.jsx';
import AddUser from '../../components/admin/AddUser.jsx';
import Logout from '../../components/admin/Logout.jsx';
import './style.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users');
  const [sidebarVisible, setSidebarVisible] = useState(true);

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
      <main className="content">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
