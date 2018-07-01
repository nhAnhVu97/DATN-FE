import * as Types from './../constants/ActionType';

var initialState = {
    isShow: false,
    types: "",
    messages: "",
};

const notifycation = (state = initialState, action) => {
    switch (action.type) {
        case Types.SHOW_NOTIFICATION:
            return { ...state, isShow: true, types: action.types, messages: action.messages }
        // case Types.CLOSE_NOTIFICATION:
        //     return { ...state, isLoading: false, items: action.article };
        default:
            return state;
    }
}


export default notifycation;