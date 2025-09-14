// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import '../pages/Navbar.css'; // You'll create this file

function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">Store Ratings</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;