import axios from 'axios';
import qs from 'qs';
import {
  GET_TEAMS_STARTED,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILURE,
} from './actionTypes';

const getTeamsStarted = () => ({
  type: GET_TEAMS_STARTED,
});

const getTeamsSuccess = (data) => ({
  type: GET_TEAMS_SUCCESS,
  payload: {
    teams: data,
  },
});

const getTeamsFailure = (error) => ({
  type: GET_TEAMS_FAILURE,
  payload: {
    error,
  },
});

export const getTeams = (teamsId) => {
  return (dispatch) => {
    dispatch(getTeamsStarted());

    axios
      .get(`http://localhost:6969/teams/`, {
        params: {
          ids: teamsId,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      })
      .then((res) => dispatch(getTeamsSuccess(res.data)))
      .catch((err) => dispatch(getTeamsFailure(err.message)));
  };
};
