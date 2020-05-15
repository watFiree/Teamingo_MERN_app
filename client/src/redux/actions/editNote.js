import axios from 'axios';
import {EDIT_NOTE_STARTED, EDIT_NOTE_SUCCESS, EDIT_NOTE_FAILURE} from './actionTypes';

const editNoteStarted = () =>({
        type: EDIT_NOTE_STARTED
});

const editNoteSuccess = data =>({
    type: EDIT_NOTE_SUCCESS,
    payload:{
        ...data
    }
});

const editNoteFailure = error =>({
    type: EDIT_NOTE_FAILURE,
    payload:{
        error
    }
});

export const editNote = input => {
    return dispatch => {
        dispatch(editNoteStarted);
        axios.put('http://localhost:6969/notes/', {
            ...input
        })
        .then(({data}) => { console.log(data); dispatch(editNoteSuccess(data))})
        .catch(err=> dispatch(editNoteFailure(err)))
    }
}