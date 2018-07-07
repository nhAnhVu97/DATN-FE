import callApi from './../ultils/callApi';
import * as Types from './../constants/ActionType';
import { BASE_URL } from './../ultils/config';
import { actShowNotifycation } from './NotifyAction';
export const actFetchArticleRequest = () => {
    return (dispatch) => {
        dispatch(actFetchArticle());
        return callApi(`${BASE_URL}articles/getall`, "GET", null).then(res => {
            if (res) {
                dispatch(actFetchArticleSuccess(res.data))
            }
        }).catch(error => {
            if (error) {
                dispatch(actFetchArticleError(error.message))
            }
        })
    }
};

export const actFetchArticle = () => {
    return {
        type: Types.FETCH_ALL_ARTICLE,
    }
}

export const actFetchArticleSuccess = (data) => {
    return {
        type: Types.FETCH_ALL_ARTICLE_SUCCESS,
        data
    }
};

export const actFetchArticleError = (error) => {
    return {
        type: Types.FETCH_ALL_ARTICLE_ERROR,
        data: error
    }
}


//fetch article per id

export const actFetchArticleWithIdRequest = (id) => {
    return (dispatch) => {
        dispatch(actFetchArticleWithId());
        return callApi(`${BASE_URL}articles/${id}`, "GET", null).then(res => {
            if (res) {
                dispatch(actFetchArticleWithIdSuccess(res.data))
            }
        }).catch(error => {
            if (error) {
                dispatch(actFetchArticleWithIdError(error.message))
            }
        })
    }
};

export const actFetchArticleWithId = () => {
    return {
        type: Types.FETCH_ARTICLE_WITH_ID,
    }
}

export const actFetchArticleWithIdSuccess = (article) => {
    return {
        type: Types.FETCH_ARTICLE_WITH_ID_SUCCESS,
        article
    }
};

export const actFetchArticleWithIdError = (error) => {
    return {
        type: Types.FETCH_ARTICLE_WITH_ID_ERROR,
        article: error
    }
}


// UPDATE ARTICLE

export const actUpdateArticleRequest = (article) => {
    return (dispatch) => {
        dispatch(actUpdateArticle());
        return callApi(`${BASE_URL}articles/${article.id}`, "PUT", article).then(res => {
            if (res) {
                dispatch(actUpdateArticleSuccess(res.data))
                console.log(res.data)
                dispatch(actShowNotifycation("success", "Cập nhật thành công"))
            }
        }).catch(error => {
            if (error) {
                dispatch(actUpdateArticleError(error.message))
                dispatch(actShowNotifycation("error", error.message))
            }
        })
    }
};

export const actUpdateArticle = () => {
    return {
        type: Types.UPDATE_ARTICLE,
    }
}

export const actUpdateArticleSuccess = (article) => {
    return {
        type: Types.UPDATE_ARTICLE_SUCCESS,
        article
    }
};

export const actUpdateArticleError = (error) => {
    return {
        type: Types.UPDATE_ARTICLE_ERROR,
        article: error
    }
}



// ADD ARTICLE

export const actAddArticleRequest = (article) => {
    return (dispatch) => {
        dispatch(actAddArticle());
        return callApi(`${BASE_URL}articles`, "POST", article).then(res => {
            if (res) {
                dispatch(actAddArticleSuccess(res.data))
                console.log(res.data)
                dispatch(actShowNotifycation("success", "Thêm thành công"))
            }
        }).catch(error => {
            if (error) {
                dispatch(actAddArticleError(error.message))
                dispatch(actShowNotifycation("error", error.message))
            }
        })
    }
};

export const actAddArticle = () => {
    return {
        type: Types.ADD_ARTICLE,
    }
}

export const actAddArticleSuccess = (article) => {
    return {
        type: Types.ADD_ARTICLE_SUCCESS,
        article
    }
};

export const actAddArticleError = (error) => {
    return {
        type: Types.ADD_ARTICLE_ERROR,
        article: error
    }
}