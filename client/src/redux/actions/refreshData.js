import axios from 'axios';
import {REFRESH_DATA_STARTED, REFRESH_DATA_SUCCESS, REFRESH_DATA_FAILURE} from './actionTypes'

const refreshDataStarted = () => ({
    type: REFRESH_DATA_STARTED,
  });
  
  const refreshDataSuccess = (data) => ({
    type: REFRESH_DATA_SUCCESS,
    payload: {
        ...data
    }
  });
  
  const refreshDataFailure = (error) => ({
    type: REFRESH_DATA_FAILURE,
    payload: {
      error,
    },
  });

export const refreshData = id => {
    return dispatch => {
        dispatch(refreshDataStarted())
        axios.get(`/user/?id=${id}`)
        .then(({data}) => dispatch(refreshDataSuccess(data)))
        .catch(err => dispatch(refreshDataFailure(err)))
    }
}