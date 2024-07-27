import React from "react";
import "./style.css";

const UserNav = ({
  text,
  bgColor = "primary-bg",
  textColor = "white-text",
  onMouseClick,
}) => {
  return (
    <nav
      className={`flex center rounded clickable ${bgColor} ${textColor} bold full-width button`}
    >
      {text}
    </nav>
  );
};

export default UserNav;
