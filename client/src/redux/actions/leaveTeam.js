import axios from 'axios'
import {LEAVE_TEAM_STARTED, LEAVE_TEAM_SUCCESS, LEAVE_TEAM_FAILURE} from './actionTypes';

const leaveTeamStarted = () => ({
    type: LEAVE_TEAM_STARTED
});

const leaveTeamSuccess = data => ({
    type: LEAVE_TEAM_SUCCESS,
    payload: {
        ...data
    }
});

const leaveTeamFailure = error => ({
    type: LEAVE_TEAM_FAILURE,
    payload: {
        error
    }
})


export const leaveTeam = input => {
    return dispatch => {
        dispatch(leaveTeamStarted());
        axios.delete('http://localhost:6969/user', {
            data: input
        })
        .then(({data}) => dispatch(leaveTeamSuccess(data)))
        .catch(err => dispatch(leaveTeamFailure(err)))
    }
}