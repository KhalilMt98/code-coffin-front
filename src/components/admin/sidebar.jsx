import React from "react";
import "../../pages/admin/style.css"; // Ensure you import the CSS file if it's separate

const Sidebar = ({ handleSectionChange, activeSection, className }) => {
  return (
    <aside className={`sidebar ${className}`}>
      <h1>Admin Dashboard</h1>
      <ul>
        <li
          className={activeSection === "users" ? "active" : ""}
          onClick={() => handleSectionChange("users")}
        >
          Users
        </li>
        <li
          className={activeSection === "addUser" ? "active" : ""}
          onClick={() => handleSectionChange("addUser")}
        >
          Add User
        </li>
        <li
          className={activeSection === "logout" ? "active" : ""}
          onClick={() => handleSectionChange("logout")}
        >
          Logout
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
