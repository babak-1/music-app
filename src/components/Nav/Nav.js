import React from "react";
import "./Nav.css";

export const Nav = ({ setIsLibOpen, isLibOpen }) => {
  const handleLibraryClick = () => {
    setIsLibOpen((isLibOpen) => !isLibOpen);
  };
  return (
    <div className="nav-container">
      <h1>Waves</h1>
      <button
        onClick={handleLibraryClick}
        className={`btn-lbr ${isLibOpen ? "open-btn-lbr" : "closed-btn-lbr"}`}
      >
        library
      </button>
    </div>
  );
};
