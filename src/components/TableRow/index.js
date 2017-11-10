import React from 'react';
import moment from 'moment';

const TableRow = props => (
    <tr>
        <th>{moment.unix(props.date).format('DD/MM/YY')}</th>
        <td>{(props.distance / 1000).toFixed(2)} km</td>
        <td>
            {moment()
                .startOf('d')
                .seconds(props.time)
                .format('HH:mm:SS')}
        </td>
        <td>{props.speed.toFixed(2)} km/h</td>
        <td>Edit | Delete</td>
    </tr>
);

export default TableRow;