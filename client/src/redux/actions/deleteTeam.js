import axios from 'axios';
import {
  DELETE_TEAM_STARTED,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILURE,
} from './actionTypes';

const deleteTeamStarted = () => {
  return {
    type: DELETE_TEAM_STARTED,
  };
};

const deleteTeamSuccess = (data) => {
  return {
    type: DELETE_TEAM_SUCCESS,
    payload: { ...data },
  };
};

const deleteTeamFailure = (error) => {
  return {
    type: DELETE_TEAM_FAILURE,
    payload: error,
  };
};

export const deleteTeam = (input) => {
  return (dispatch) => {
    dispatch(deleteTeamStarted());
    axios
      .delete('http://localhost:6969/teams/', { data: input })
      .then(() => dispatch(deleteTeamSuccess(input)))
      .catch((err) => dispatch(deleteTeamFailure(err)));
  };
};
