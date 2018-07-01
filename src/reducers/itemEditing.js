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
        default:
            return state;
    }
}




export default itemEditing;