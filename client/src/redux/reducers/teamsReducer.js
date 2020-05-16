import * as types from '../actions/actionTypes';

const initialState = {
  data: [],
  loading: false,
  creating: false,
  editing: false,
  deleting: false,
  error: null,
};

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGOUT:
      return {
        ...initialState,
      };
    case types.GET_TEAMS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case types.GET_TEAMS_SUCCESS:
      return {
        ...state,
        ...state.teams,
        loading: false,
        error: null,
        data: [...action.payload.teams],
      };
    case types.GET_TEAMS_FAILURE:
      return {
        ...state,
        ...state.teams,
        loading: false,
        error: action.payload.error,
      };
    case types.CREATE_NOTE_SUCCESS_UPDATE_TEAM:
      return {
        ...state,
        data: [
          ...state.data.map((item, index) =>
            index === action.payload.index
              ? { ...item, notes: [...item.notes, action.payload.id] }
              : item,
          ),
        ],
      };
    case types.CREATE_TEAM_STARTED:
      return {
        ...state,
        creating: true,
      };
    case types.CREATE_TEAM_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case types.CREATE_TEAM_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case types.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data.map((item) =>
            item.name === action.payload.teamName
              ? {
                  ...item,
                  notes: [
                    ...item.notes.filter((id) => id !== action.payload.id),
                  ],
                }
              : item,
          ),
        ],
      };
    case types.DELETE_TEAM_STARTED:
      return {
        ...state,
        deleting: true,
      };
    case types.DELETE_TEAM_SUCCESS:
      return {
        ...state,
        deleting: false,
        data: [...state.data.filter((item) => item._id !== action.payload.id)],
      };
    case types.DELETE_TEAM_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.payload.error,
      };
    case types.EDIT_TEAM_STARTED:
      return {
        ...state,
        editing: true,
      };
    case types.EDIT_TEAM_SUCCESS:
      return {
        ...state,
        editing: false,
        error: false,
        data: [
          ...state.data.map((team) =>
            team._id === action.payload._id ? { ...action.payload } : team,
          ),
        ],
      };
    case types.GET_NOTES_FAILURE:
      return {
        ...state,
        editing: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default teamsReducer;
