import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import SourceIcon from '@mui/icons-material/Source';

const SideMenu = () => {
    return (
        <div className='side-menu'>
            <NavLink to='/' className={({ isActive }) => `menu-links ${isActive ? 'active' : ''}`}>
                <HomeIcon style={{ color: '#FFFFFF', fontSize: '2.3em' }} />
            </NavLink>
            <NavLink to='/project' className={({ isActive }) => `menu-links ${isActive ? 'active' : ''}`}>
                <TaskIcon style={{ color: '#FFFFFF', fontSize: '2.3em' }} />
            </NavLink>
            <NavLink to='/categorie' className={({ isActive }) => `menu-links ${isActive ? 'active' : ''}`}>
                <SourceIcon style={{ color: '#FFFFFF', fontSize: '2.3em' }} />
            </NavLink>
        </div>
    );
};

export default SideMenu;
