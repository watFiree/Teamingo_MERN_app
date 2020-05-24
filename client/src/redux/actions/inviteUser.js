import axios from 'axios';
import {INVITE_USER_STARTED, INVITE_USER_SUCCESS, INVITE_USER_FAILURE} from './actionTypes'

const inviteUserStarted = () => ({
    type: INVITE_USER_STARTED,
  });
  
  const inviteUserSuccess = () => ({
    type: INVITE_USER_SUCCESS
  });
  
  const inviteUserFailure = (error) => ({
    type: INVITE_USER_FAILURE,
    payload: {
      error,
    },
  });

export const inviteUser = input => {
    return dispatch => {
        dispatch(inviteUserStarted())
        axios.post('/user/invite', {
            ...input
        })
        .then(() => dispatch(inviteUserSuccess()))
        .catch(({response}) => dispatch(inviteUserFailure(response.data.message)))
    }
}