import axios from 'axios'
import {DELETE_NOTE_STARTED, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAILURE} from './actionTypes'

const deleteNoteStarted =() => {
    return{
        type: DELETE_NOTE_STARTED
    }
}

const deleteNoteSuccess = data => {
    return{
        type: DELETE_NOTE_SUCCESS,
        payload:{ ...data }
    }
}

const deleteNoteFailure = error => {
    return{
        type: DELETE_NOTE_FAILURE,
        payload: error
    }
}

// eslint-disable-next-line import/prefer-default-export
export const deleteNote = input => {
    return dispatch => {
        dispatch(deleteNoteStarted());
        axios.delete('http://localhost:6969/notes/', { data: input})
        .then(() => dispatch(deleteNoteSuccess(input)))
        .catch(err => dispatch(deleteNoteFailure(err)))
    }
}