import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "white" }}>
      <h2>Task Management</h2>
      <div>
        <Link to="/" style={{ color: "white", marginRight: "10px" }}>Home</Link>
        <Link to="/tasks" style={{ color: "white" }}>Tasks</Link>
      </div>
    </nav>
  );
}

export default Navbar;
