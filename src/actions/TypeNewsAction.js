import callApi from './../ultils/callApi';
import * as Types from './../constants/ActionType';
import { actShowNotifycation } from './NotifyAction';


export const actFetchTypeNewsRequest = () => {
    return (dispatch) => {
        dispatch(actFetchTypeNews())
        return callApi(`http://localhost:4000/typenews`, "GET", null).then(res => {
            dispatch(actFetchTypeNewsSuccess(res.data));
        }).catch(err => {
            dispatch(actFetchTypeNewsError(err.message));
        })
    }
}

export const actFetchTypeNews = () => {
    return {
        type: Types.FETCH_ALL_TYPENEWS
    }
}
export const actFetchTypeNewsSuccess = (typenews) => {
    return {
        type: Types.FETCH_ALL_TYPENEWS_SUCCESS,
        typenews
    }
}

export const actFetchTypeNewsError = (typenews) => {
    return {
        type: Types.FETCH_ALL_TYPENEWS_ERROR,
        typenews
    }
}


export const actFetchTypeNewsWithIdRequest = (id) => {
    return (dispatch) => {
        dispatch(actFetchTypeNewsWithId())
        return callApi(`http://localhost:4000/typenews/${id}`, "GET", null).then(res => {
            dispatch(actFetchTypeNewsWithIdSuccess(res.data))
        }).catch(err => {
            dispatch(actFetchTypeNewsWithIdError(err.message))
        })
    }
}

export const actFetchTypeNewsWithId = () => {
    return {
        type: Types.FETCH_TYPENEWS_WITH_ID
    }
}
export const actFetchTypeNewsWithIdSuccess = (typenews) => {
    return {
        type: Types.FETCH_TYPENEWS_WITH_ID_SUCCESS,
        typenews
    }
}
export const actFetchTypeNewsWithIdError = (typenews) => {
    return {
        type: Types.FETCH_TYPENEWS_WITH_ID,
        typenews
    }
}

export const actUpdateTypeNewsRequest = (typenews) => {
    return (dispatch) => {
        dispatch(actUpdateTypeNews())
        return callApi(`http://localhost:4000/typenews/${typenews.id}`, "PUT", typenews).then(res => {
            dispatch(actUpdateTypeNewsSuccess(res.data))
            dispatch(actShowNotifycation("success", "Cập nhật thành công"))
        }).catch(err => {
            dispatch(actUpdateTypeNewsError(err.message))
            dispatch(actShowNotifycation("error", err.message))
        })
    }
}

export const actUpdateTypeNews = () => {
    return {
        type: Types.UPDATE_TYPENEWS
    }
}

export const actUpdateTypeNewsSuccess = (typenews) => {
    return {
        type: Types.UPDATE_TYPENEWS_SUCCESS,
        typenews
    }
}

export const actUpdateTypeNewsError = (typenews) => {
    return {
        type: Types.UPDATE_TYPENEWS_ERROR,
        typenews
    }
}

export const actAddTypeNewsRequest = (typeNews) => {
    return (dispatch) => {
        dispatch(actAddTypeNews())
        return callApi(`http://localhost:4000/typenews`, "POST", typeNews).then(res => {
            dispatch(actAddTypeNewsSuccess(res.data))
            dispatch(actShowNotifycation("success", "Thêm thành công"))
        }).catch(err => {
            dispatch(actAddTypeNewsError(err.message))
            dispatch(actShowNotifycation("error", err.message))
        })
    }

}

export const actAddTypeNews = () => {
    return {
        type: Types.ADD_TYPENEWS
    }
}

export const actAddTypeNewsSuccess = (typeNews) => {
    return {
        type: Types.ADD_TYPENEWS_SUCCESS,
        typeNews
    }
}

export const actAddTypeNewsError = (typeNews) => {
    return {
        type: Types.ADD_TYPENEWS_ERROR,
        typeNews
    }
}




