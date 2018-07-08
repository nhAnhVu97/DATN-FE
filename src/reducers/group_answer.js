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
        case Types.FETCH_GROUP_ANSWERS:
            return { ...state, isLoading: true }
        case Types.FETCH_GROUP_ANSWERS_SUCCESS:
            return { ...state, isLoading: false, items: action.groupAnswer }
        case Types.FETCH_GROUP_ANSWERS_ERROR:
            return { ...state, isLoading: false, error: action.groupAnswer }
        case Types.FETCH_GROUP_ANSWERS_WITH_ID_TEST_TYPE:
            return { ...state, isLoading: true }
        case Types.FETCH_GROUP_ANSWERS_WITH_ID_TEST_TYPE_SUCCESS:
            return { ...state, isLoading: false, items: action.groupAnswer }
        case Types.FETCH_GROUP_ANSWERS_WITH_ID_TEST_TYPE_ERROR:
            return { ...state, isLoading: false, error: action.groupAnswer }
        case Types.ADD_GROUP_ANSWERS:
            return { ...state, isLoading: true }
        case Types.ADD_GROUP_ANSWERS_SUCCESS:
            state.items.push(action.groupAnswer)
            console.log(state)
            return { ...state, isLoading: false }
        case Types.ADD_GROUP_ANSWERS_ERROR:
            return { ...state, isLoading: true, error: action.groupAnswer }
        case Types.UPDATE_GROUP_ANSWERS:
            return { ...state, isLoading: true }
        case Types.UPDATE_GROUP_ANSWERS_SUCCESS:
            index = findIndex(state.items, action.groupAnswer.id)
            state.items[index] = action.groupAnswer;
            return { ...state, isLoading: false }
        case Types.UPDATE_GROUP_ANSWERS_ERROR:
            return { ...state, isLoading: false, error: action.groupAnswer }
        default:
            return state;
    }
}


export default question;