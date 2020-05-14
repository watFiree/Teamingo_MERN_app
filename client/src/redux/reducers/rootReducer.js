import {combineReducers} from 'redux';
import userReducer from './userReducer';
import notesReducer from './notesReducer';
import teamsReducer from './teamsReducer';

const rootReducer = combineReducers({
    user:userReducer,
    notes: notesReducer,
    teams: teamsReducer
});

export default rootReducer;