import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import { convertToKmH } from '../../utils';

const TableRow = props => (
    <tr>
        <th>{moment.unix(props.date).format('MM/DD/YY')}</th>
        <td>{(props.distance / 1000).toFixed(2)} km</td>
        <td>
            {moment()
                .startOf('d')
                .seconds(props.time)
                .format('HH:mm:SS')}
        </td>
        <td>{convertToKmH(props.speed)} km/h</td>
        <td>
            <button onClick={() => props.firebase.remove(`records/${props.id}`)}>
                <i className="fa fa-trash" />
            </button>
            <Link
                to={{
                    pathname: `/edit-record/${props.id}`,
                    date: props.date,
                    distance: props.distance,
                    time: moment()
                        .startOf('d')
                        .seconds(props.time)
                        .format('HH:mm'),
                    timeRaw: props.time,
                }}
            >
                <button>
                    <i className="fa fa-edit" />
                </button>
            </Link>
        </td>
    </tr>
);

TableRow.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    firebase: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default firebaseConnect()(TableRow);