import { createStore, compose, applyMiddleware } from 'redux';
import { reduxFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

// Replace with your Firebase config
const fbConfig = {
    apiKey: ' AIzaSyC_xnDNyyVmv4YUsLsGtyrb3WADdaeDt18',
    authDomain: 'localhost',
    databaseURL: 'https://jogging-times-tracker.firebaseio.com/',
};

export default function configureStore(initialState, history) {
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        reduxFirebase(fbConfig, {
            userProfile: 'users',
            profileParamsToPopulate: [['role:roles']],
            profileFactory: (userData, profileData) => ({
                email: userData.email,
                role: profileData.role || 'user',
                username: profileData.username,
            }),
        }),
        // Redux Devtools
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
            ? window.devToolsExtension()
            : f => f,
    )(createStore);
    const store = createStoreWithMiddleware(rootReducer);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers/rootReducer', () => {
            const nextRootReducer = require('./reducers/rootReducer');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
