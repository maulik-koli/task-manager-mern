import React from 'react'
import tempLogo from '/temp-logo.jpg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav className='navigate'>
        <ul>
            <li><img src={tempLogo} alt='Main Logo' id='logo'/></li>
            <li><h1>Task Manager</h1></li>
        </ul>
        <ul className='nav-btns'>
            <li><Link to='/signuplogin' ><button>Sing Up</button></Link></li>
            <li><Link to='/signuplogin' ><button>Log In</button></Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
