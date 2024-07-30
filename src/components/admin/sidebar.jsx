import React from "react";
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
          Add Users
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
