import * as Types from './../constants/ActionType';
import findIndex from './../ultils/helper';
var initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const auth = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.LOGIN:
            return { ...state, isLoading: true }
        case Types.LOGIN_SUCCESS:
            localStorage.getItem('user') = action.user
            return { ...state, isLoading: false, items: action.user }
        case Types.LOGIN_ERROR:
            return { ...state, isLoading: false, items: action.user }
        default:
            return state;
    }
}




export default auth;