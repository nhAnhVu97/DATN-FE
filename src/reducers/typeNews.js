import * as Types from './../constants/ActionType';
import findIndex from './../ultils/helper';
var initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const typeNews = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.FETCH_ALL_TYPENEWS:
            return { ...state, isloading: true }
        case Types.FETCH_ALL_TYPENEWS_SUCCESS:
            return { ...state, isLoading: false, items: action.typenews }
        case Types.FETCH_ALL_TYPENEWS_ERROR:
            return { ...state, isLoading: false, error: action.typenews }
        case Types.FETCH_TYPENEWS_WITH_CATEGORY_ID:
            return { ...state, isloading: true }
        case Types.FETCH_TYPENEWS_WITH_CATEGORY_ID_SUCCESS:
            return { ...state, isLoading: false, items: action.typenews }
        case Types.FETCH_TYPENEWS_WITH_CATEGORY_ID_ERROR:
            return { ...state, isLoading: false, error: action.typenews }
        case Types.UPDATE_TYPENEWS:
            return { ...state, isLoading: true }
        case Types.UPDATE_TYPENEWS_SUCCESS:
            index = findIndex(state.items, action.typenews.id)
            state.items[index] = action.typenews;
            return { ...state, isLoading: false }
        case Types.UPDATE_TYPENEWS_ERROR:
            return { ...state, isLoading: false, error: action.typenews }
        case Types.ADD_TYPENEWS:
            return { ...state, isLoading: true }
        case Types.ADD_TYPENEWS_SUCCESS:
            state.items.push(action.typenews)
            console.log(state)
            return { ...state, isLoading: false }
        case Types.ADD_TYPENEWS_ERROR:
            return { ...state, isLoading: false, error: action.typenews }
        default:
            return state;
    }
}


export default typeNews;