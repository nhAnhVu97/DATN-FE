
import * as Types from './../constants/ActionType';
// notifycation
export const actShowNotifycation = (types, messages) => {
    return {
        type: Types.SHOW_NOTIFICATION,
        types,
        messages
    }
}