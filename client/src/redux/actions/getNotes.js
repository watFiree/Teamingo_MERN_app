import axios from 'axios';
import qs from 'qs';
import {
  GET_NOTES_STARTED,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
} from './actionTypes';

const getNotesStarted = () => ({
  type: GET_NOTES_STARTED,
});

const getNotesSuccess = (data) => ({
  type: GET_NOTES_SUCCESS,
  payload: {
    notes: data,
  },
});

const getNotesFailure = (error) => ({
  type: GET_NOTES_FAILURE,
  payload: {
    error,
  },
});

export const getNotes = (notesId) => {
  return (dispatch) => {
    dispatch(getNotesStarted());

    axios
      .get(`http://localhost:6969/notes/`, {
        params: {
          ids: notesId,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      })
      .then((res) => dispatch(getNotesSuccess(res.data)))
      .catch((err) => dispatch(getNotesFailure(err.message)));
  };
};
