import callApi from './../ultils/callApi';
import { BASE_URL } from './../ultils/config';
import * as Types from './../constants/ActionType';
import { actShowNotifycation } from './NotifyAction';
import { stringify } from 'querystring';


export const actFetchTypeNewsRequest = () => {
    return (dispatch) => {
        dispatch(actFetchTypeNews())
        return callApi(`${BASE_URL}newstype`, "GET", null).then(res => {
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
        return callApi(`${BASE_URL}newstype/${id}`, "GET", null).then(res => {
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
        return callApi(`${BASE_URL}newstype/${typenews.id}`, "PUT", typenews).then(res => {
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

export const actAddTypeNewsRequest = (typenews) => {
    return (dispatch) => {
        dispatch(actAddTypeNews())
        return callApi(`${BASE_URL}newstype`, "POST", stringify(typenews)).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                dispatch(actAddTypeNewsSuccess(res.data))
                dispatch(actShowNotifycation("success", "Thêm thành công"))
            }
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

export const actAddTypeNewsSuccess = (typenews) => {
    return {
        type: Types.ADD_TYPENEWS_SUCCESS,
        typenews
    }
}

export const actAddTypeNewsError = (typenews) => {
    return {
        type: Types.ADD_TYPENEWS_ERROR,
        typenews
    }
}


export const actFetchTypeNewsWithCategoryIdRequest = (categoryId) => {
    return (dispatch) => {
        dispatch(actFetchTypeNewsWithCategoryId())
        return callApi(`${BASE_URL}newstype_with_categoryid/${categoryId}`, "GET", null).then(res => {
            dispatch(actFetchTypeNewsWithCategoryIdSuccess(res.data));
        }).catch(err => {
            dispatch(actFetchTypeNewsWithCategoryIdError(err.message));
        })
    }
}

export const actFetchTypeNewsWithCategoryId = () => {
    return {
        type: Types.FETCH_TYPENEWS_WITH_CATEGORY_ID
    }
}
export const actFetchTypeNewsWithCategoryIdSuccess = (typenews) => {
    return {
        type: Types.FETCH_TYPENEWS_WITH_CATEGORY_ID_SUCCESS,
        typenews
    }
}

export const actFetchTypeNewsWithCategoryIdError = (typenews) => {
    return {
        type: Types.FETCH_TYPENEWS_WITH_CATEGORY_ID_ERROR,
        typenews
    }
}



