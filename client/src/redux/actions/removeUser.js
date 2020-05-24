import axios from 'axios'
import {REMOVE_USER_STARTED, REMOVE_USER_SUCCESS, REMOVE_USER_FAILURE} from './actionTypes';

const removeUserStarted = () => ({
    type: REMOVE_USER_STARTED
});

const removeUserSuccess = data => ({
    type: REMOVE_USER_SUCCESS,
    payload: {
        ...data
    }
});

const removeUserFailure = error => ({
    type: REMOVE_USER_FAILURE,
    payload: {
        error
    }
})


export const removeUser = input => {
    return dispatch => {
        dispatch(removeUserStarted());
        axios.delete('/teams/user', {
            data: input
        })
        .then(({data}) => dispatch(removeUserSuccess(data)))
        .catch(err => dispatch(removeUserFailure(err)))
    }
}