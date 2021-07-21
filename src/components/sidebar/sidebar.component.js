import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.component.css';
const Sidebar = (props) => {
    return (
        <ul className="side-bar-list">
            <li className="side-bar-item" >
                <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="side-bar-item">
                <Link to="/product/view">View Products</Link>
            </li>
            <li className="side-bar-item">
                <Link to="/product/add">Add Products</Link>
            </li>
            <li className="side-bar-item">
                <Link to="/product/search">Search Products</Link>
            </li>
            <li className="side-bar-item">
                <Link to="/chat">Instant Messages</Link>
            </li>
            <li className="side-bar-item">
                <Link to="/profile">Profile</Link>
            </li>
        </ul>
    )
}


export default Sidebar;
