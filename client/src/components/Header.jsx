import React from "react";
import { Link } from "react-router-dom";

import tempLogo from "/header-logo.png";

const Header = ({ user }) => {

  return (
    <header>
      <div className="logo">
        <Link to='/'><img src={tempLogo} alt="Site Logo" /></Link>
      </div>
      <h1 className="site-title">Task Manager</h1>
      <div className="auth-links">
        <ul>
         {!user ? 
          <>
            <li >
              <Link to="/auth/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          </> :
          <li className="profile-link">
            <Link to="/profile"  >{user.name}</Link>
          </li>}
        </ul>
      </div>
    </header>
  );
};

export default Header;
