import React from 'react';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import { createUser, editUser, cleanState } from '../../actions/userActions';
import { LOGIN, MANAGEMENT } from '../../consts/routes';

import './style.css';

export class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        if (props.match.params.uid) {
            this.state = {
                email: props.location.email,
                username: props.location.username,
                role: props.location.role,
                uid: props.match.params.uid,
            };
        } else {
            this.state = {
                email: '',
                password: '',
                username: '',
                role: 'user',
            };
        }

        this.renderAdminOption = this.renderAdminOption.bind(this);
        this.editUser = this.editUser.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.displayErrors = this.displayErrors.bind(this);
        this.redirectUser = this.redirectUser.bind(this);
    }

    componentWillMount() {
        const { profile, history } = this.props;
        if (!profile || profile.role !== 'admin' || profile.role !== 'manager') {
            history.push({ LOGIN });
        }
    }

    createNewUser() {
        const {
            email, password, username, role,
        } = this.state;
        this.props.createUser({
            email,
            password,
            username,
            role,
        });
    }

    editUser() {
        const {
            email, uid, username, role,
        } = this.state;
        this.props.editUser({
            email,
            uid,
            username,
            role,
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    displayErrors() {
        if (this.props.errorMessageCreateEdit) {
            return (
                <div id="error" className="notification is-danger">
                    {this.props.errorMessageCreateEdit}
                </div>
            );
        }
    }

    redirectUser() {
        if (this.props.successCreateEdit) {
            this.props.cleanState();
            return <Redirect to={MANAGEMENT} id="redirect" />;
        }
    }

    renderAdminOption() {
        if (!this.props.profile) {
            return '';
        } else if (this.props.profile.role === 'admin') {
            return <option value="admin">Admin</option>;
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
                                            {this.renderAdminOption()}
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
                            {this.props.match.params.uid ? (
                                <button
                                    onClick={this.editUser}
                                    className="button is-primary is-medium create-user-button"
                                >
                                    {this.props.loadingCreateEdit ? 'Loading...' : 'Edit User'}
                                </button>
                            ) : (
                                <button
                                    onClick={this.createNewUser}
                                    className="button is-primary is-medium create-user-button"
                                >
                                    {this.props.loadingCreateEdit ? 'Loading...' : 'Create User'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const {
    func, bool, string, objectOf,
} = PropTypes;
CreateUser.propTypes = {
    /* eslint-disable react/no-typos */
    createUser: func.isRequired,
    loadingCreateEdit: bool.isRequired,
    successCreateEdit: bool.isRequired,
    errorMessageCreateEdit: string.isRequired,
    profile: objectOf(string).isRequired,
    editUser: func.isRequired,
    cleanState: func.isRequired,
    role: string.isRequired,
};

function mapStateToProps(state) {
    return {
        loadingCreateEdit: state.user.loadingCreateEdit,
        successCreateEdit: state.user.successCreateEdit,
        errorMessageCreateEdit: state.user.errorMessageCreateEdit,
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ createUser, editUser, cleanState }, dispatch);

const fbWrapped = firebaseConnect()(CreateUser);

const connectProfile = connect(({ firebase }) => ({
    profile: pathToJS(firebase, 'profile'),
}))(fbWrapped);

export default connect(mapStateToProps, mapDispatchToProps)(connectProfile);
