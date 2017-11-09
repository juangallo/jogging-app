import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';

class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            username: '',
            errorMessage: '',
            accountCreated: false,
        };

        this.createNewUser = this.createNewUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.displayErrors = this.displayErrors.bind(this);
        this.redirectUser = this.redirectUser.bind(this);
    }

    createNewUser() {
        const { email, password, username } = this.state;

        this.props.firebase
            .createUser({ email, password }, { username, email })
            .then(userData =>
                (userData
                    ? this.setState({ accountCreated: true })
                    : this.setState({ accountCreated: false })))
            .catch(error => this.setState({ errorMessage: error.message }));
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    displayErrors() {
        if (this.state.errorMessage) {
            return <div className="notification is-danger">{this.state.errorMessage}</div>;
        }
    }

    redirectUser() {
        if (this.state.accountCreated) {
            return <Redirect to="/dashboard" />;
        }
    }

    render() {
        return (
            <div className="create-user hero is-dark is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title is-1">Jogging Time Tracker</h1>
                        <h2 className="subtitle is-3">Sign up</h2>
                        <form className="container create-user-form" onSubmit={this.createNewUser}>
                            {this.displayErrors()}
                            {this.redirectUser()}
                            <div className="field">
                                <label htmlFor="email" className="label is-medium">
                                    Email:
                                </label>
                                <div className="control">
                                    <input
                                        value={this.state.email}
                                        type="email"
                                        name="email"
                                        onChange={this.handleChange}
                                        className="input is-medium"
                                        placeholder="user@email.com"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="username" className="label is-medium">
                                    Username:
                                </label>
                                <div className="control">
                                    <input
                                        value={this.state.username}
                                        type="text"
                                        name="username"
                                        onChange={this.handleChange}
                                        className="input is-medium"
                                        placeholder="Name"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="password" className="label is-medium">
                                    Password:
                                </label>
                                <div className="control">
                                    <input
                                        value={this.state.password}
                                        type="password"
                                        name="password"
                                        onChange={this.handleChange}
                                        className="input is-medium"
                                        placeholder="password"
                                    />
                                </div>
                            </div>
                        </form>
                        <button
                            onClick={this.createNewUser}
                            className="button is-primary is-medium signup-button"
                        >
                            Sign Up
                        </button>
                        <div className="is-size-5">
                            Or{' '}
                            <Link to="/login" className="has-text-weight-bold has-text-primary">
                                login
                            </Link>{' '}
                            if you already have an account.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const fbWrapped = firebaseConnect()(CreateUser);

export default connect(state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
}))(fbWrapped);
