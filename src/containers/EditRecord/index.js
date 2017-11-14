import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { Redirect, Link } from 'react-router-dom';
import 'react-dates/initialize';
import { SingleDatePicker, isInclusivelyAfterDay } from 'react-dates';
import moment from 'moment';
import Cleave from 'cleave.js/react';
import 'react-dates/lib/css/_datepicker.css';

import { DASHBOARD } from '../../consts/routes';

import './style.css';

class EditRecord extends React.Component {
    constructor(props) {
        super(props);

        if (props.match.params.recordId) {
            this.state = {
                date: moment.unix(props.location.date),
                distance: props.location.distance,
                time: props.location.time,
                timeRaw: props.location.timeRaw,
                errorMessage: '',
            };
        } else {
            this.state = {
                errorMessage: '',
            };
        }

        this.newRecord = this.newRecord.bind(this);
        this.edit = this.edit.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.displayErrors = this.displayErrors.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.valueAsNumber,
        });
    }

    handleTimeChange(event) {
        const timeArray = event.target.value.split(':');
        const seconds = timeArray[0] * 3600 + timeArray[1] * 60;
        this.setState({
            time: event.target.value,
            timeRaw: seconds,
        });
    }

    edit() {
        const dateInUnix = moment(this.state.date).unix();

        this.props.firebase
            .update(`records/${this.props.match.params.recordId}`, {
                date: dateInUnix,
                distance: this.state.distance,
                time: this.state.timeRaw,
                user: this.props.auth.uid,
            })
            .then(this.setState({ successfulEdit: true, errorMessage: '' }))
            .catch(error => this.setState({ errorMessage: error.message, successfulEdit: false }));
    }

    newRecord() {
        const dateInUnix = moment(this.state.date).unix();

        this.props.firebase
            .push('records', {
                date: dateInUnix,
                distance: this.state.distance,
                time: this.state.timeRaw,
                user: this.props.auth.uid,
            })
            .then(this.setState({ successfulNewRecord: true, errorMessage: '' }))
            .catch(error =>
                this.setState({ errorMessage: error.message, successfulNewRecord: false }));
    }

    displayErrors() {
        if (this.state.errorMessage) {
            return <div className="notification is-danger">{this.state.errorMessage}</div>;
        }
    }

    redirectOnSuccess() {
        if (this.state.successfulEdit || this.state.successfulNewRecord) {
            return <Redirect push to={DASHBOARD} />;
        }
    }

    render() {
        const today = moment.locale('en');

        return (
            <div className="edit-record hero is-dark is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        {this.props.match.params.recordId ? (
                            <h1 className="title is-1">Edit Record</h1>
                        ) : (
                            <h1 className="title is-1">New Record</h1>
                        )}
                        <form className="container edit-record-form">
                            {this.displayErrors()}
                            {this.redirectOnSuccess()}
                            <div className="field">
                                <div className="label is-medium">Date:</div>
                                <div className="control">
                                    <SingleDatePicker
                                        date={this.state.date ? this.state.date : null} // momentPropTypes.momentObj or null
                                        onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                                        focused={this.state.focused} // PropTypes.bool
                                        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                                        isOutsideRange={day => isInclusivelyAfterDay(today, day)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="label is-medium">Distance (mts):</div>
                                <div className="control">
                                    <input
                                        value={this.state.distance}
                                        type="number"
                                        name="distance"
                                        id="distance"
                                        onChange={this.handleChange}
                                        className="input is-medium distance-input"
                                        placeholder="Enter distance in meters"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="label is-medium">Time (HH:mm):</div>
                                <div className="control">
                                    <Cleave
                                        className="input-numeral input is-medium"
                                        placeholder="HH:mm"
                                        name="time"
                                        id="time"
                                        value={this.state.time}
                                        options={{
                                            numericOnly: true,
                                            blocks: [2, 2],
                                            delimiter: ':',
                                        }}
                                        onChange={this.handleTimeChange}
                                    />
                                </div>
                            </div>
                        </form>
                        {this.props.match.params.recordId ? (
                            <button
                                onClick={this.edit}
                                className="button is-primary is-medium login-button"
                            >
                                Edit
                            </button>
                        ) : (
                            <button
                                onClick={this.newRecord}
                                className="button is-primary is-medium login-button"
                            >
                                Add new record
                            </button>
                        )}
                        <Link to={DASHBOARD} replace>
                            <button className="button is-danger is-medium login-button">
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

EditRecord.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    firebase: PropTypes.objectOf(PropTypes.func).isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
};

const fbWrapped = firebaseConnect()(EditRecord);

export default connect(({ firebase }) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    profile: pathToJS(firebase, 'profile'),
}))(fbWrapped);
