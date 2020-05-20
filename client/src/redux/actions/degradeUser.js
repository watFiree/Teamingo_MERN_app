import axios from 'axios';
import {DEGRADE_USER_STARTED, DEGRADE_USER_SUCCESS, DEGRADE_USER_FAILURE} from './actionTypes'

const degradeUserStarted = () => ({
    type: DEGRADE_USER_STARTED,
  });
  
  const degradeUserSuccess = (data) => ({
    type: DEGRADE_USER_SUCCESS,
    payload: {
        ...data
    }
  });
  
  const degradeUserFailure = (error) => ({
    type: DEGRADE_USER_FAILURE,
    payload: {
      error,
    },
  });

export const degradeUser = input => {
    return dispatch => {
        dispatch(degradeUserStarted())
        axios.delete('http://localhost:6969/user/role', {
            data:input
        })
        .then(({data}) => dispatch(degradeUserSuccess(data)))
        .catch(err => dispatch(degradeUserFailure(err)))
    }
}