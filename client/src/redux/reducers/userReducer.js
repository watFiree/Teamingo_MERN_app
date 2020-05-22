import * as types from '../actions/actionTypes';

const initialState = {
  authenticated: false,
  data: { nickname: ' ', id: ' ' },
  invitations: [],
  notesId: [],
  teamsId: [],
  processing: false,
  error: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGOUT:
      return {
        ...initialState,
      };
    case types.USER_AUTH:
      return {
        ...state,
        authenticated: true,
        data: {
          ...state.data,
          nickname: action.payload.nickname,
          id: action.payload.id,
        },
        invitations: [...action.payload.invitations],
        notesId: [...action.payload.notes],
        teamsId: [...action.payload.teams],
      };
    case types.REFRESH_DATA_STARTED:
      return{
        ...state,
        processing: true,
      };
    case types.REFRESH_DATA_SUCCESS:
      return{
        ...state,
        processing:false,
        error: false,
        invitations: [...action.payload.invitations],
        notesId: [...action.payload.notes],
        teamsId: [...action.payload.teams],
      };
    case types.REMOVE_USER_FAILURE:
      return{
        ...state,
        processing: false,
        error: action.payload.error
      };
    case types.CREATE_NOTE_SUCCESS:
      return {
        ...state,
        notesId: [...state.notesId, action.payload._id],
      };
    case types.CREATE_TEAM_SUCCESS:
      return {
        ...state,
        teamsId: [...state.teamsId, action.payload._id],
      };
    case types.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        notesId: [...state.notesId.filter((id) => id !== action.payload.id)],
      };
    case types.DELETE_TEAM_SUCCESS:
      return {
        ...state,
        notesId: [
          ...state.notesId.filter((id) => !action.payload.notes.includes(id)),
        ],
        teamsId: [...state.teamsId.filter((id) => id !== action.payload.id)],
      };
    case types.ADD_USER_STARTED:
      return {
        ...state,
        processing: true,
      };
    case types.ADD_USER_SUCCESS:
      return {
        ...state,
        invitations: [
          ...state.invitations.filter(
            (item) => item.teamId !== action.payload._id,
          ),
        ],
        notesId: [...state.notesId, ...action.payload.notes],
        teamsId: [...state.teamsId, action.payload._id],
        processing: false,
        error: false,
      };
    case types.ADD_USER_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.error,
      };
    case types.REMOVE_INVITATION_STARTED:
      return {
        ...state,
        processing: true,
      };
    case types.REMOVE_INVITATION_SUCCESS:
      return {
        ...state,
        processing: false,
        error: false,
        invitations: [
          ...state.invitations.filter(
            (item) => item.teamId !== action.payload.teamId,
          ),
        ],
      };
    case types.REMOVE_INVITATION_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.error,
      };
    case types.LEAVE_TEAM_STARTED:
      return {
        ...state,
        processing: true,
      };
    case types.LEAVE_TEAM_SUCCESS:
      return {
        ...state,
        processing: false,
        error: false,
        notesId: [
          ...state.notesId.filter(
            (id) => !action.payload.notesIds.includes(id),
          ),
        ],
        teamsId: [
          ...state.teamsId.filter((id) => id !== action.payload.teamId),
        ],
      };
    case types.LEAVE_TEAM_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.error,
      };
    case types.EDIT_USER_STARTED:
      return {
        ...state,
        processing: true,
      };
    case types.EDIT_USER_SUCCESS:
      return {
        ...state,
        processing: false,
        error: false,
        data: {
          ...state.data,
          nickname:
            action.payload.type === 'nickname'
              ? action.payload.updated
              : state.data.nickname,
        },
      };
    case types.EDIT_USER_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.error,
      };
    case types.DELETE_USER_STARTED:
      return {
        ...state,
        processing: true,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...initialState,
      };
    case types.DELETE_USER_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default userReducer;
