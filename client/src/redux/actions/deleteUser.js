import axios from 'axios';
import {DELETE_USER_STARTED, DELETE_USER_SUCCESS, DELETE_USER_FAILURE} from './actionTypes'

const deleteUserStarted = () => ({
    type: DELETE_USER_STARTED,
  });
  
  const deleteUserSuccess = () => ({
    type: DELETE_USER_SUCCESS,
  });
  
  const deleteUserFailure = (error) => ({
    type: DELETE_USER_FAILURE,
    payload: {
      error,
    },
  });

export const deleteUser = input => {
    return dispatch => {
        dispatch(deleteUserStarted())
        axios.delete('/user', {
            data: input
        })
        .then(() => dispatch(deleteUserSuccess()))
        .catch(err => dispatch(deleteUserFailure(err)))
    }
}