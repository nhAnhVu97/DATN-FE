import * as Types from './../constants/ActionType';
import findIndex from './../ultils/helper';
var initialState = {
    items: [],
    isLoading: false,
    error: ""
};

const question = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.FETCH_QUESTION_TYPE:
            return { ...state, isLoading: true }
        case Types.FETCH_QUESTION_TYPE_SUCCESS:
            return { ...state, isLoading: false, items: action.questions }
        case Types.FETCH_QUESTION_TYPE_ERROR:
            return { ...state, isLoading: true, error: action.questions }
        case Types.ADD_QUESTION:
            return { ...state, isLoading: true }
        case Types.ADD_QUESTION_SUCCESS:
            state.items.push(action.questions)
            return { ...state, isLoading: false, items: action.questions }
        case Types.ADD_QUESTION_ERROR:
            return { ...state, isLoading: false, error: action.questions }
        case Types.EDIT_QUESTION:
            return { ...state, isLoading: true }
        case Types.EDIT_QUESTION_SUCCESS:
            index = findIndex(state.items, action.questions.id)
            state.items[index] = action.questions;
            return { ...state, isLoading: false }
        case Types.EDIT_QUESTION_ERROR:
            return { ...state, isLoading: false, error: action.questions }
        case Types.DELETE_QUESTION:
            return { ...state, isLoading: true }
        case Types.DELETE_QUESTION_SUCCESS:
            index = findIndex(state.items, action.questions.id)
            state.items[index] = action.questions;
            return { ...state, isLoading: false }
        case Types.DELETE_QUESTION_ERROR:
            return { ...state, isLoading: false, error: action.questions }
        default:
            return state;
    }
}


export default question;