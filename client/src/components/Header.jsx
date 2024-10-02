import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'

import tempLogo from '/temp-logo.jpg'

const Header = () => {
  const { user } = useContext(UserContext)

  return (
    <header>
      <nav className='navigate'>
        <ul>
            <li><img src={tempLogo} alt='Main Logo' id='logo'/></li>
            <li><h1>Task Manager</h1></li>
        </ul>
        {user ? 
          <div className="profile-name">
            <Link to='profile'><button>{user.name}</button></Link>
          </div> :
          <ul className='nav-btns'>
              <li><Link to='/signuplogin' ><button>Sing Up</button></Link></li>
              <li><Link to='/signuplogin' ><button>Log In</button></Link></li>
          </ul>
        }
      </nav>
    </header>
  )
}

export default Header
