import * as Types from './../constants/ActionType';

var initialState = {
    items: [],
    isLoading: false,
    error: ""
};

const question = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_QUESTION_TYPE:
            return { ...state, isLoading: true }
        case Types.FETCH_QUESTION_TYPE_SUCCESS:
            return { ...state, isLoading: false, items: action.questions }
        case Types.FETCH_QUESTION_TYPE_ERROR:
            return { ...state, isLoading: true, error: action.questions }
        default:
            return state;
    }
}


export default question;