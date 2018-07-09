import * as Types from './../constants/ActionType';
import findIndex from './../ultils/helper';
var initialState = {
    items: [],
    isLoading: false,
    error: null,
    isSuccess : false,
};

const auth = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.LOGIN:
            return { ...state, isLoading: true }
        case Types.LOGIN_SUCCESS:
            return { ...state, isLoading: false, isSuccess:true , items: action.user , error:null }
        case Types.LOGIN_ERROR:
            return { ...state, isLoading: false, error: action.user }
        default:
            return state;
    }
}




export default auth;