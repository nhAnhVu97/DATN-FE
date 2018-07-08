import callApi from './../ultils/callApi';
import * as Types from './../constants/ActionType';
import { BASE_URL } from './../ultils/config';
import { actShowNotifycation } from './NotifyAction';

export const actLoginRequest = (user) => {
    return (dispatch) => {
        dispatch(actLogin());
        return callApi(`${BASE_URL}loogin`, "POST", user).then(res => {
            if (res) {
                dispatch(actLoginSuccess(res.data))
                console.log(res.data)
                localStorage.setItem('user', res.data);
                dispatch(actShowNotifycation("success", "Đăng nhập thành công"))
            }
        }).catch(error => {
            if (error) {
                dispatch(actLoginError(error.message))
                dispatch(actShowNotifycation("error", error.message))
            }
        })
    }
}

export const actLogin = () => {
    return {
        type: Types.LOGIN
    }
}

export const actLoginSuccess = (user) => {
    return {
        type: Types.LOGIN_SUCCESS,
        user
    }
}

export const actLoginError = (user) => {
    return {
        type: Types.LOGIN,
        user
    }
}