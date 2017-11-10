import React from "react";
import { connect } from 'react-redux'
import { firebaseConnect, firebase, dataToJS } from 'react-redux-firebase'
import TimesTable from "../../components/TimesTable";
import * as _ from 'lodash';

import "./style.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const recordsArray = _.values(this.props.records);
    return (
      <div className="login hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">

            <button onClick={() => this.props.firebase.push('records', { date: '1510339504', distance: '1000', time: '3600', user: '01uSHdH1SBZjNMazjKZbO5OORJR2' })}>
              Set To Firebase
            </button>


            <TimesTable records={recordsArray} />
          </div>
        </div>
      </div>
    );
  }
}

const fbWrapped = firebaseConnect([
  {
    path: 'records',
    queryParams: ['orderByChild=user', 'equalTo=01uSHdH1SBZjNMazjKZbO5OORJR2'],
  }
])(Dashboard)

export default connect(
  ({firebase}) => ({
    records: dataToJS(firebase, 'records'),
  })
)(fbWrapped)
