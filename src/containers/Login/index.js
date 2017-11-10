import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            successfulLogin: false,
        };

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.displayErrors = this.displayErrors.bind(this);
        this.redirectUser = this.redirectUser.bind(this);
    }

    login() {
        const { email, password } = this.state;

        this.props.firebase
            .login({
                email,
                password,
            })
            .then(userData =>
                (userData
                    ? this.setState({ successfulLogin: true, errorMessage: '' })
                    : this.setState({ successfulLogin: false })))
            .catch(error => this.setState({ errorMessage: error.message, successfulLogin: false }));
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
        if (this.state.successfulLogin) {
            return <Redirect to="/dashboard" />;
        }
    }

    render() {
        return (
            <div className="login hero is-dark is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title is-1">Jogging Time Tracker</h1>
                        <h2 className="subtitle is-3">Login</h2>

                        <form className="container login-form" onSubmit={this.login}>
                            {this.displayErrors()}
                            {this.redirectUser()}
                            <div className="field">
                                <div className="label is-medium">Email:</div>
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
                                <div className="label is-medium">Password:</div>
                                <div className="control">
                                    <input
                                        value={this.state.password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.handleChange}
                                        className="input is-medium"
                                        placeholder="password"
                                    />
                                </div>
                            </div>
                        </form>
                        <button
                            onClick={this.login}
                            className="button is-primary is-medium login-button"
                        >
                            Login
                        </button>
                        <div className="is-size-5">
                            {'Or '}
                            <Link
                                to="/create-user"
                                className="has-text-weight-bold has-text-primary"
                            >
                                {'sign up'}
                            </Link>
                            {" if you don't have an account."}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const fbWrapped = firebaseConnect()(Login);

export default connect(state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
}))(fbWrapped);
