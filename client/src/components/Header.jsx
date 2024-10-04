import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";

import tempLogo from "/header-logo.png";

const Header = () => {
  const { user } = useContext(UserContext);
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
            <Link to="/profile"  >Username</Link>
          </li>}
        </ul>
      </div>
    </header>
  );
};

export default Header;
