import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../stlyes/SideMenu.module.css';

const { sideMenu, menuBtn, menuProject, menuCate, menuLink, menuLink2 } = classes;

const DUMMY = [
    { id: 1, title: 'one' },
    { id: 2, title: 'two' },
    { id: 3, title: 'three' },
];

const SideMenu = () => {
    return (
        <div className={sideMenu}>
            <div>
                <NavLink 
                    to='/' 
                    className={({ isActive }) => (isActive ? menuLink : menuLink2)}
                >
                    <p className={menuBtn}>Home</p>
                </NavLink>
            </div>
            <div className={menuProject}>
                <div className={menuBtn}>
                    <NavLink 
                        to='/project' 
                        className={({ isActive }) => (isActive ? menuLink : menuLink2)}
                    >
                        <p>Projects</p>
                    </NavLink>
                    <button>+</button>
                </div>
            </div>
            <div className={menuCate}>
                <div className={menuBtn}>
                    <NavLink 
                        to='/categorie' 
                        className={({ isActive }) => (isActive ? menuLink : menuLink2)}
                    >
                        <p>Categories</p>
                    </NavLink>
                    <button>+</button>
                </div>
                <ul>
                    {DUMMY.map((category) => (
                        <li key={category.id}>{category.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideMenu;
