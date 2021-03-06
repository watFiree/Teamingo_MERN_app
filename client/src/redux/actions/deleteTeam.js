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
      .delete('/teams/', { data: input })
      .then(({data}) => dispatch(deleteTeamSuccess(data)))
      .catch((err) => dispatch(deleteTeamFailure(err)));
  };
};
