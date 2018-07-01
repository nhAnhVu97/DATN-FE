import * as Types from './../constants/ActionType';

var initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const article = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_ARTICLE_WITH_ID:
            return { ...state, isLoading: true, error: null }
        case Types.FETCH_ARTICLE_WITH_ID_SUCCESS:
            return { ...state, isLoading: false, items: action.article };
        case Types.FETCH_ARTICLE_WITH_ID_ERROR:
            return { ...state, isLoading: false, error: action.article }
        default:
            return state;
    }
}


export default article;