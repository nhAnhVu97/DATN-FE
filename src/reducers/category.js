import * as Types from './../constants/ActionType';
import findIndex from './../ultils/helper';
var initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const category = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.FETCH_ALL_CATEGORY:
            return { ...state, isLoading: true, error: null }
        case Types.FETCH_ALL_CATEGORY_SUCCESS:
            // state = action.category
            return { ...state, isLoading: false, items: action.category };
        case Types.FETCH_ALL_CATEGORY_ERROR:
            return { ...state, isLoading: false, error: action.category }
        case Types.UPDATE_CATEGORY:
            return { ...state, isLoading: true, error: null };
        case Types.UPDATE_CATEGORY_SUCCESS:
            // lay index
            index = findIndex(state.items, action.category.id)
            //gan state items o vi tri index = arr moi ==> render lai
            state.items[index] = action.category
            return { ...state, isLoading: false, };
        case Types.UPDATE_CATEGORY_ERROR:
            return { ...state, isLoading: false, error: action.category };
        case Types.ADD_CATEGORY:
            return { ...state, isLoading: true }
        case Types.ADD_CATEGORY_SUCCESS:
            //them loai moi vao state
            state.items.push(action.category)
            return { ...state, isLoading: false }
        case Types.ADD_CATEGORY_ERROR:
            return { ...state, isLoading: false, error: action.category }
        default:
            return state;
    }
}




export default category;