import callApi from './../ultils/callApi';
import * as Types from './../constants/ActionType';
export const actFetchArticleRequest = () => {
    return (dispatch) => {
        dispatch(actFetchArticle());
        return callApi(`https://5b28e8c584ce2c0014d4d0bd.mockapi.io/article`, "GET", null).then(res => {
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
        return callApi(`https://5b28e8c584ce2c0014d4d0bd.mockapi.io/article/${id}`, "GET", null).then(res => {
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