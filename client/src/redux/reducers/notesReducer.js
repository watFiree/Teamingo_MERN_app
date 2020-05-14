import * as types from '../actions/actionTypes';

const initialState = { 
    data:[],
    loading:false,
    creating: false,
    deleting: false,
    error:null
}

const notesReducer = (state = initialState, action) => {
    switch (action.type){
        case (types.USER_LOGOUT):
            return{
                ...initialState
            }
        case (types.GET_NOTES_STARTED):
            return {
                ...state,
                ...state.notes,
                loading:true
            };
        case (types.GET_NOTES_SUCCESS):
            return {
                ...state,
                ...state.notes,
                loading:false,
                error:null,
                data:[...action.payload.notes]
            }
            case (types.GET_NOTES_FAILURE):
                return {
                    ...state,
                    loading:false,
                    error: action.payload.error
                };
            case (types.CREATE_NOTE_STARTED):
                return {
                    ...state,
                    creating: true
                };
            case (types.CREATE_NOTE_SUCCESS):
                return {
                    ...state,
                    creating: false,
                    error:null,
                    data:[...state.data, action.payload]
                };
            case (types.CREATE_NOTE_FAILURE):
                return {
                    ...state,
                    creating: false,
                    error: action.payload.error
                };
            case (types.DELETE_NOTE_STARTED):
                return{
                    ...state,
                    deleting: true
                };
            case (types.DELETE_NOTE_SUCCESS):
                return{
                    ...state,
                    deleting: false,
                    data:[
                        ...state.data.filter(item => item._id !== action.payload.id)
                    ]
                };
            case (types.DELETE_NOTE_FAILURE):
                return{
                    ...state,
                    deleting: false,
                    error: action.payload.error
                };   
            case (types.DELETE_TEAM_SUCCESS):
                return{
                    ...state,
                    data:[
                        ...state.data.filter(item => !action.payload.notes.includes(item._id))
                    ]
                };
        default :
            return state;
    }
};

export default notesReducer;