import * as types from '../actions/actionTypes';

const initialState = {
  authenticated: false,
  data: { nickname: ' ', id: ' ' },
  invitations: [],
  notesId: [],
  teamsId: [],
  proccessing: false,
  error: false
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
        return{
          ...state,
          proccessing: true,
        };
      case types.ADD_USER_SUCCESS:
        return{
          ...state,
          invitations: [
            ...state.invitations.filter(item => item.teamId !== action.payload._id)
          ],
          notesId: [
            ...state.notesId,
            ...action.payload.notes
          ],
          teamsId: [
            ...state.teamsId,
            action.payload._id
          ],
          proccessing:false,
          error:false
        };
      case types.ADD_USER_FAILURE:
        return{
          ...state,
          proccessing:false,
          error: action.payload.error
        }
    default:
      return state;
  }
};

export default userReducer;
