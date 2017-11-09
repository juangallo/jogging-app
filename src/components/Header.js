import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
    <div className="header hero-head">
        <header className="navbar">
            <div className="container">
                <Link to="/create-user" className="navbar-item">
                    Create user
                </Link>
                <Link to="/login" className="navbar-item">
                    Login
                </Link>
            </div>
        </header>
    </div>
);

export default Header;
