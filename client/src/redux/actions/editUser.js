import axios from 'axios';
import {
  EDIT_USER_STARTED,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
} from './actionTypes';

const editUserStarted = () => ({
  type: EDIT_USER_STARTED,
});

const editUserSuccess = (data) => ({
  type: EDIT_USER_SUCCESS,
  payload: {
    ...data,
  },
});

const editUserFailure = (error) => ({
  type: EDIT_USER_FAILURE,
  payload: {
    error,
  },
});

export const editUser = (input) => {
  return (dispatch) => {
    dispatch(editUserStarted());
    axios
      .put(`http://localhost:6969/user/${input.type}`, {
        ...input,
      })
      .then(({ data }) => dispatch(editUserSuccess(data)))
      .catch((err) => dispatch(editUserFailure(err)));
  };
};
