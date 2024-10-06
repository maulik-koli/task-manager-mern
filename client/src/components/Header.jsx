import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useUser } from "../hooks/useUser";
import tempLogo from "/header-logo.png";

const Header = () => {
  const { user } = useUser()
  const [authLinksState, setAuthLinksState] = useState(true)

  return (
    <header>
      <div className="logo">
        <Link to='/'><img src={tempLogo} alt="Site Logo" /></Link>
      </div>
      <h1 className="site-title" onClick={() => setAuthLinksState(!authLinksState)}>Site Title</h1>
      <div className="auth-links">
        <ul>
         {authLinksState ? 
          <>
            <li >
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
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
