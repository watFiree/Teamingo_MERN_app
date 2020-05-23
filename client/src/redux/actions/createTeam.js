import axios from 'axios';
import {
  CREATE_TEAM_STARTED,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
} from './actionTypes';

const createTeamStarted = () => ({
  type: CREATE_TEAM_STARTED,
});
const createTeamSuccess = (data) => ({
  type: CREATE_TEAM_SUCCESS,
  payload: {
    ...data,
  },
});

const createTeamFailure = (error) => ({
  type: CREATE_TEAM_FAILURE,
  payload: {
    error,
  },
});

// eslint-disable-next-line import/prefer-default-export
export const createTeam = (input) => {
  return (dispatch) => {
    dispatch(createTeamStarted());
    axios
      .post('http://localhost:6969/teams/', {
        ...input,
      })
      .then(({ data }) => dispatch(createTeamSuccess(data)))
      .catch(({response}) => dispatch(createTeamFailure(response.data.message)));
  };
};
