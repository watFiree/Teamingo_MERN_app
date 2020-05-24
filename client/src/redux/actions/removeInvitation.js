import axios from 'axios';
import {REMOVE_INVITATION_STARTED, REMOVE_INVITATION_SUCCESS, REMOVE_INVITATION_FAILURE} from './actionTypes'

const removeInvitationStarted = () => ({
    type: REMOVE_INVITATION_STARTED,
  });
  
  const removeInvitationSuccess = (data) => ({
    type: REMOVE_INVITATION_SUCCESS,
    payload: {
        ...data
    }
  });
  
  const removeInvitationFailure = (error) => ({
    type: REMOVE_INVITATION_FAILURE,
    payload: {
      error,
    },
  });

export const removeInvitation = input => {
    return dispatch => {
        dispatch(removeInvitationStarted())
        axios.delete('/user/invite', {
            data: input
        })
        .then(({data}) => dispatch(removeInvitationSuccess(data)))
        .catch(err => dispatch(removeInvitationFailure(err)))
    }
}