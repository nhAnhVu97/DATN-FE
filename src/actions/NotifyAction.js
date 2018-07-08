
import * as Types from './../constants/ActionType';
// notifycation
export const actShowNotifycation = (types, messages) => {
    return {
        type: Types.SHOW_NOTIFICATION,
        types,
        messages
    }
}

export const actHideNotifycation = () => {
    return {
        type: Types.HIDE_NOTIICATION
    }
}