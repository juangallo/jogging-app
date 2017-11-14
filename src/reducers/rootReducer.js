import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import { reducer as notificationsReducer } from 'react-notification-system-redux';

const rootReducer = combineReducers({
    firebase,
    notifications: notificationsReducer,
});

export default rootReducer;
