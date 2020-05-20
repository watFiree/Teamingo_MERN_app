import axios from 'axios';
import {PROMOTE_USER_STARTED, PROMOTE_USER_SUCCESS, PROMOTE_USER_FAILURE} from './actionTypes'

const promoteUserStarted = () => ({
    type: PROMOTE_USER_STARTED,
  });
  
  const promoteUserSuccess = (data) => ({
    type: PROMOTE_USER_SUCCESS,
    payload: {
        ...data
    }
  });
  
  const promoteUserFailure = (error) => ({
    type: PROMOTE_USER_FAILURE,
    payload: {
      error,
    },
  });

export const promoteUser = input => {
    return dispatch => {
        dispatch(promoteUserStarted())
        axios.post('http://localhost:6969/user/role', {
            ...input
        })
        .then(({data}) => dispatch(promoteUserSuccess(data)))
        .catch(err => dispatch(promoteUserFailure(err)))
    }
}