import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './navbar.component.css';


const NavBar = (props) => {

    const logout = (e) => {
        localStorage.clear();
        props.history.push('/');//redirect to login
    }

    return (
        <nav>
            <ul className="nav-list">
                <li className="nav-items">
                    <Link to="/">Profile</Link>
                </li>
                <li className="nav-items">
                    <Link to="/menu">Change-Password</Link>
                </li>
                <li className="nav-items">
                    <button className="btn btn-default" onClick={logout}>Logout</button>
                </li>
            </ul>
        </nav>
    )

}

export default withRouter(NavBar);