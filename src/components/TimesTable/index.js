import React from "react";
import moment from "moment";

import TableRow from "../TableRow";




class TimesTable extends React.Component {
  constructor(props){
    super(props)

    //this.renderRows = this.renderRows.bind(this);
  }

  renderRows() {
    const {records} = this.props;
    if (records && records.length > 0){
      this.props.records.map((record) => (
        <TableRow
          key={record.id}
          date={record.date}
          distance={record.distance}
          time={record.time}
          speed={record.distance / record.time}
        />
      ));
    } else {
      return "Loading..."
    }
  }

  render(){
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>
                <abbr title="Date">Date</abbr>
              </th>
              <th>Distance</th>
              <th>Time</th>
              <th>Avg. Speed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           {this.renderRows()}
          </tbody>
        </table>
      </div>
      )}
}

export default TimesTable;
