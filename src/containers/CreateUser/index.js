import React from 'react';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MANAGEMENT } from '../../consts/routes';

import './style.css';

class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            username: '',
            role: '',
            errorMessage: '',
            accountCreated: false,
        };

        this.createNewUser = this.createNewUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.displayErrors = this.displayErrors.bind(this);
        this.redirectUser = this.redirectUser.bind(this);
    }

    createNewUser() {
        const {
            email, password, username, role,
        } = this.state;

        this.props.firebase
            .createUser({ email, password, signIn: false }, { username, email, role })
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
            return <Redirect to={MANAGEMENT} />;
        }
    }

    render() {
        return (
            <div className="create-user hero is-dark is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title is-1">Create User</h1>
                        <form className="container create-user-form" onSubmit={this.createNewUser}>
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
                                <div className="label is-medium">Username:</div>
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
                                <div className="label is-medium">Role:</div>
                                <div className="control">
                                    <div className="select is-medium">
                                        <select
                                            name="role"
                                            value={this.state.role}
                                            onChange={this.handleChange}
                                            className="select is-medium"
                                        >
                                            <option value="user">User</option>
                                            <option value="manager">Manager</option>
                                        </select>
                                    </div>
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
                        <div>
                            <Link to={MANAGEMENT} className="has-text-weight-bold has-text-primary">
                                <button className="button is-danger is-medium cancel-button">
                                    Cancel
                                </button>
                            </Link>
                            <button
                                onClick={this.createNewUser}
                                className="button is-primary is-medium create-user-button"
                            >
                                Create User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateUser.propTypes = {
    firebase: PropTypes.objectOf(PropTypes.func).isRequired,
};

const fbWrapped = firebaseConnect()(CreateUser);

export default connect(({ firebase }) => ({
    profile: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth'),
}))(fbWrapped);
