import axios from 'axios';
import {ADD_USER_STARTED, ADD_USER_SUCCESS, ADD_USER_FAILURE} from './actionTypes'

const addUserStarted = () => ({
    type: ADD_USER_STARTED,
  });
  
  const addUserSuccess = (data) => ({
      type: ADD_USER_SUCCESS,
      payload: {
          ...data
      }
  });
  
  const addUserFailure = (error) => ({
    type: ADD_USER_FAILURE,
    payload: {
      error,
    },
  });

export const addUser = input => {
    return dispatch => {
        dispatch(addUserStarted())
        axios.post('/teams/user', {
            ...input
        })
        .then(({data}) => dispatch(addUserSuccess(data)))
        .catch(err => dispatch(addUserFailure(err)))
    }
}