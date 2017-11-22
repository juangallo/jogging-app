import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { Link, Redirect } from 'react-router-dom';

import { DASHBOARD, HOME, MANAGEMENT } from '../../consts/routes';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedOut: false,
        };

        this.logout = this.logout.bind(this);
        this.redirect = this.redirect.bind(this);
        this.renderNavItems = this.renderNavItems.bind(this);
    }

    logout() {
        this.props.firebase.logout().then(this.setState({ loggedOut: true }));
    }

    redirect() {
        if (this.state.loggedOut) {
            return <Redirect to={HOME} />;
        }
    }

    renderNavItems() {
        const { navigation, current } = this.props;
        const nav = navigation.map((item) => {
            if (item === 'logout') {
                return (
                    <a key={item} className="navbar-item is-danger" onClick={this.logout}>
                        Logout
                    </a>
                );
            } else if (item === DASHBOARD) {
                return (
                    <Link
                        key={item}
                        to={item}
                        className={`navbar-item ${item === current ? 'is-active' : ''}`}
                    >
                        Dashboard
                    </Link>
                );
            } else if (item === MANAGEMENT) {
                return (
                    <Link
                        key={item}
                        to={item}
                        className={`navbar-item ${item === current ? 'is-active' : ''}`}
                    >
                        Management
                    </Link>
                );
            }
        });
        return nav;
    }

    render() {
        return (
            <div className="hero-head">
                <header className="navbar">
                    <div className="container">
                        {this.redirect()}
                        <div className="navbar-brand">
                            <a className="navbar-item">
                                <h1 className="title is-3">Jogging Times Tracker</h1>
                            </a>
                        </div>
                        <div id="navbarMenuHeroC" className="navbar-menu">
                            <div className="navbar-end">{this.renderNavItems()}</div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default firebaseConnect()(Header);
