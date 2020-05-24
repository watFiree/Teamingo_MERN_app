import axios from 'axios';
import {
  CREATE_NOTE_STARTED,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE,
  CREATE_NOTE_SUCCESS_UPDATE_TEAM,
} from './actionTypes';

const createNoteStarted = () => ({
  type: CREATE_NOTE_STARTED,
});
const createNoteSuccess = (data) => ({
  type: CREATE_NOTE_SUCCESS,
  payload: {
    ...data,
  },
});
const createNoteSuccessUpdateTeam = (data) => ({
  type: CREATE_NOTE_SUCCESS_UPDATE_TEAM,
  payload: {
    ...data,
  },
});
const createNoteFailure = (error) => ({
  type: CREATE_NOTE_FAILURE,
  payload: {
    error,
  },
});

export const createNote = (input) => {
  return (dispatch, getState) => {
    dispatch(createNoteStarted());
    axios
      .post('/notes/', {
        ...input,
      })
      .then(({ data }) => {
        dispatch(createNoteSuccess(data));
        const teamIndex = getState()
          .teams.data.map((item, index) =>
            item.name === data.teamName ? index : null,
          )
          .filter((number) => number !== null)[0];
        dispatch(
          createNoteSuccessUpdateTeam({ index: teamIndex, id: data._id }),
        );
      })
      .catch((err) => dispatch(createNoteFailure(err)));
  };
};
