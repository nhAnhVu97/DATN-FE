import * as Types from './../constants/ActionType';

var initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const data = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_ALL_ARTICLE:
            return { ...state, isLoading: true, error: null }
        case Types.FETCH_ALL_ARTICLE_SUCCESS:
            return { ...state, isLoading: false, items: action.data };
        case Types.FETCH_ALL_ARTICLE_ERROR:
            return { ...state, isLoading: false, error: action.data }

        default:
            return state;
    }
}


export default data;