import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
    <div className="navbar">
        <Link to="/create-user">Create user</Link>
        <Link to="/login">Login</Link>
    </div>
);

export default Header;
