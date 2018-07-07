import * as Types from './../constants/ActionType';

var initialState = {
    items: [],
    isLoading: false,
    error: ""
};

const question = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_TEST_TYPE:
            return { ...state, isLoading: true }
        case Types.FETCH_TEST_TYPE_SUCCESS:
            return { ...state, isLoading: true, items: action.testType }
        case Types.FETCH_TEST_TYPE_ERROR:
            return { ...state, isLoading: true, error: action.testType }
        default:
            return state;
    }
}


export default question;