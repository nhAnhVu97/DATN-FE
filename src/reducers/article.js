import * as Types from './../constants/ActionType';
import findIndex from './../ultils/helper';
var initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const article = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.FETCH_ALL_ARTICLE:
            return { ...state, isLoading: true, error: null };
        case Types.FETCH_ALL_ARTICLE_SUCCESS:
            return { ...state, isLoading: false, items: action.data };
        case Types.FETCH_ALL_ARTICLE_ERROR:
            return { ...state, isLoading: false, error: action.data };
        case Types.UPDATE_ARTICLE:
            return { ...state, isLoading: true };
        case Types.UPDATE_ARTICLE_SUCCESS:
            index = findIndex(state.items, action.article.id)
            state.items[index] = action.article;
            return { ...state, isLoading: false }
        case Types.UPDATE_ARTICLE_ERROR:
            return { ...state, isLoading: false, error: action.article }
        case Types.ADD_ARTICLE:
            return { ...state, isLoading: true }
        case Types.ADD_ARTICLE_SUCCESS:
            state.items.push(action.article)
            return { ...state, isLoading: false }
        case Types.ADD_ARTICLE_ERROR:
            return { ...state, isLoading: false, error: action.article }
        default:
            return state;
    }
}


export default article;