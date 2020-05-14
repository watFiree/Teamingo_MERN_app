import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

// eslint-disable-next-line no-underscore-dangle
const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer,compose(applyMiddleware(thunk),devtools))

export default store;