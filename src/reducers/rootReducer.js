import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import user from './user';

const rootReducer = combineReducers({
    firebase,
    user,
});

export default rootReducer;
