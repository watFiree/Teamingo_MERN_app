import axios from 'axios';
import {
  EDIT_TEAM_STARTED,
  EDIT_TEAM_SUCCESS,
  EDIT_TEAM_FAILURE,
} from './actionTypes';

const editTeamStarted = () => ({
  type: EDIT_TEAM_STARTED,
});

const editTeamSuccess = (data) => ({
  type: EDIT_TEAM_SUCCESS,
  payload: {
    ...data,
  },
});

const editTeamFailure = (error) => ({
  type: EDIT_TEAM_FAILURE,
  payload: {
    error,
  },
});

export const editTeam = (input) => {
  return (dispatch) => {
    dispatch(editTeamStarted());
    axios
      .put(`http://localhost:6969/teams/`, {
        ...input,
      })
      .then(({ data }) => dispatch(editTeamSuccess(data)))
      .catch((err) => dispatch(editTeamFailure(err)));
  };
};
