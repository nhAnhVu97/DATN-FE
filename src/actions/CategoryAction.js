import callApi from './../ultils/callApi';
import * as Types from './../constants/ActionType';
import { actShowNotifycation, actHideNotifycation } from './NotifyAction';
import { BASE_URL } from './../ultils/config';
import { stringify } from 'querystring';
//fetch category
export const actFetchCategoryRequest = () => {
    return (dispatch) => {
        dispatch(actFetchCategory());
        return callApi(`${BASE_URL}categories`, "GET", null).then(res => {
            if (res) {
                dispatch(actFetchCategorySuccess(res.data))
            }
        }).catch(error => {
            if (error) {
                dispatch(actFetchCategoryError(error.message))
            }
        })
    }
};

export const actFetchCategory = () => {
    return {
        type: Types.FETCH_ALL_CATEGORY,
    }
}

export const actFetchCategorySuccess = (category) => {
    return {
        type: Types.FETCH_ALL_CATEGORY_SUCCESS,
        category
    }
};

export const actFetchCategoryError = (error) => {
    return {
        type: Types.FETCH_ALL_CATEGORY_ERROR,
        category: error
    }
}


//category per id
export const actFetchCategoryWithIdRequest = (id) => {
    return (dispatch) => {
        dispatch(actFetchCategoryWithId());
        return callApi(`${BASE_URL}categories/${id}`, "GET", null).then(res => {
            if (res) {
                dispatch(actFetchCategoryWithIdSuccess(res.data))
            }
        }).catch(error => {
            if (error) {
                dispatch(actFetchCategoryWithIdError(error.message))
            }
        })
    }

}

export const actFetchCategoryWithId = () => {
    return {
        type: Types.FETCH_CATEGORY_WITH_ID
    }
}

export const actFetchCategoryWithIdSuccess = (category) => {
    return {
        type: Types.FETCH_CATEGORY_WITH_ID_SUCCESS,
        category
    }
}

export const actFetchCategoryWithIdError = (error) => {
    return {
        type: Types.FETCH_CATEGORY_WITH_ID_ERROR,
        category: error
    }
}

//edit category
export const actEditCategoryRequest = (category) => {
    return (dispatch) => {
        dispatch(actEditCategory());
        return callApi(`${BASE_URL}categories/${category.id}`, "PUT", category).then(res => {
            console.log(res)
            if (res) {
                dispatch(actEditCategorySuccess(res.data))
                dispatch(actShowNotifycation("success", "Cập nhật thành công"))
                setTimeout(() => {
                    dispatch(actHideNotifycation());
                }, 10000);
            }
        }).catch(error => {
            console.log(error)
            if (error) {
                dispatch(actEditCategoryError(error.message))
                dispatch(actShowNotifycation("error", error.message))
            }
        })
    }
}

export const actEditCategory = () => {
    return {
        type: Types.UPDATE_CATEGORY
    }
}

export const actEditCategorySuccess = (category) => {
    return {
        type: Types.UPDATE_CATEGORY_SUCCESS,
        category
    }
}

export const actEditCategoryError = (error) => {
    return {
        type: Types.UPDATE_CATEGORY_ERROR,
        category: error
    }
}

// add category
export const actAddCategoryRequest = (category) => {
    return (dispatch) => {
        dispatch(actAddCategory());
        return callApi(`${BASE_URL}category`, "POST", category).then(res => {
            console.log("res", res.data)
            if (res.status === 200) {
                dispatch(actAddCategorySuccess(res.data))
                dispatch(actShowNotifycation("success", "Thêm thành công"))
                setTimeout(() => {
                    dispatch(actHideNotifycation());
                }, 10000);
            }
        }).catch(error => {
            dispatch(actAddCategoryError(error))
            console.log(error)
            dispatch(actShowNotifycation("error", error.message))

        })
    }
}

export const actAddCategory = () => {
    return {
        type: Types.ADD_CATEGORY,
    }
}

export const actAddCategorySuccess = (category) => {
    return {
        type: Types.ADD_CATEGORY_SUCCESS,
        category
    }
}

export const actAddCategoryError = (error) => {
    return {
        type: Types.ADD_CATEGORY_ERROR,
        category: error
    }
}