import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
            return <div>{this.state.errorMessage}</div>;
        }
    }

    redirectUser() {
        if (this.state.accountCreated) {
            return <Redirect to="/dashboard" />;
        }
    }

    render() {
        return (
            <div className="create-user">
                <h1>Sign up Today</h1>
                <div>
                    {this.displayErrors()}
                    {this.redirectUser()}
                    <label htmlFor="email">Email:</label>
                    <input
                        value={this.state.email}
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                    />
                    <label htmlFor="username">Username:</label>
                    <input
                        value={this.state.username}
                        type="text"
                        name="username"
                        onChange={this.handleChange}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        value={this.state.password}
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                    />
                </div>
                <button onClick={this.createNewUser}>Sign Up</button>
            </div>
        );
    }
}

const fbWrapped = firebaseConnect()(CreateUser);

export default connect(state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
}))(fbWrapped);
