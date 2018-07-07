import * as Types from './../constants/ActionType';
var initialState = {};

const itemEditing = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_CATEGORY_WITH_ID:
            return { ...state }
        case Types.FETCH_CATEGORY_WITH_ID_SUCCESS:
            state = action.category;
            return { ...state }
        case Types.FETCH_CATEGORY_WITH_ID_ERROR:
            return { ...state }
        case Types.FETCH_TYPENEWS_WITH_ID:
            return { ...state }
        case Types.FETCH_TYPENEWS_WITH_ID_SUCCESS:
            state = action.typenews;
            return { ...state }
        case Types.FETCH_TYPENEWS_WITH_ID_ERROR:
            return { ...state }
        case Types.FETCH_ARTICLE_WITH_ID:
            return { ...state, isLoading: true }
        case Types.FETCH_ARTICLE_WITH_ID_SUCCESS:
            state = action.article
            return { ...state, isLoading: false };
        case Types.FETCH_ARTICLE_WITH_ID_ERROR:
            return { ...state, isLoading: false };
        case Types.FETCH_GROUP_ANSWERS_WITH_ID:
            return { ...state, isLoading: true }
        case Types.FETCH_GROUP_ANSWERS_WITH_ID_SUCCESS:
            state = action.groupAnswer
            return { ...state, isLoading: false };
        case Types.FETCH_GROUP_ANSWERS_WITH_ID_ERROR:
            return { ...state, isLoading: false };

        default:
            return state;
    }
}




export default itemEditing;