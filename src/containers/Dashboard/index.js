import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { DateRangePicker, isInclusivelyAfterDay } from 'react-dates';
import moment from 'moment';
import { filter } from 'lodash';
import { iterateRecords } from '../../utils';
import TimesTable from '../../components/TimesTable';
import Report from '../../containers/Report';

import { EDIT_RECORD } from '../../consts/routes';

import './style.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weeks: 4,
            records: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.records !== nextProps.records) {
            const { records } = nextProps;
            const sortedRecords = iterateRecords(records).sort((a, b) => b.date - a.date);
            const a = moment.unix(sortedRecords[0].date);
            const b = moment.unix(sortedRecords[sortedRecords.length - 1].date);
            this.setState({
                weeks: a.diff(b, 'weeks') + 1,
                records: sortedRecords,
                recordsLoaded: true,
            });
        }
    }

    onDatesChange(startDate, endDate) {
        this.setState({ startDate, endDate });
        if (startDate && endDate) {
            this.setState({ weeks: endDate.diff(startDate, 'weeks') + 1 });

            this.setState({
                records: filter(
                    this.props.records,
                    record => record.date >= startDate.unix() && endDate.unix() > record.date,
                ),
            });
        }
    }

    render() {
        const today = moment.locale('en');

        return (
            <div className="login hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h3 className="title is-4">Filter</h3>
                        <DateRangePicker
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onDatesChange={({ startDate, endDate }) =>
                                this.onDatesChange(startDate, endDate)}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={focusedInput => this.setState({ focusedInput })}
                            isOutsideRange={day => isInclusivelyAfterDay(today, day)}
                        />
                        <div className="columns">
                            <div className="column is-half">
                                <h2 className="title is-3">Records</h2>

                                <Link to={EDIT_RECORD}>
                                    <button className="add-record-button button is-primary is-medium">
                                        Add Record
                                    </button>
                                </Link>

                                <TimesTable
                                    records={this.state.records}
                                    recordsLoaded={this.state.recordsLoaded}
                                    deleteRow={this.deleteRow}
                                />
                            </div>
                            <div className="column is-half">
                                <h2 className="title is-3">Weekly Report</h2>
                                {this.state.recordsLoaded ? (
                                    <Report records={this.state.records} weeks={this.state.weeks} />
                                ) : (
                                    <div>Loading...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.defaultProps = {
    records: undefined,
};

Dashboard.propTypes = {
    records: PropTypes.objectOf(PropTypes.object),
};

const authConnected = connect(({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
}))(Dashboard);

const fbWrapped = firebaseConnect(({ auth }) => [
    {
        path: 'records',
        queryParams: ['orderByChild=user', `equalTo=${auth ? auth.uid : ''}`],
    },
])(authConnected);

export default connect(({ firebase }, { auth }) => ({
    records: dataToJS(firebase, 'records'),
    auth: pathToJS(firebase, 'auth'),
}))(fbWrapped);
