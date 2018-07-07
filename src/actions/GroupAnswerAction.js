import callApi from './../ultils/callApi';
import * as Types from './../constants/ActionType';
import { actShowNotifycation } from './NotifyAction';
import { BASE_URL } from './../ultils/config';

export const actAddGroupAnswersRequest = (items) => {
    return (dispatch) => {
        dispatch(actAddGroupAnswers())
        return callApi(`${BASE_URL}answertypes`, "POST", items).then(res => {
            dispatch(actAddGroupAnswersSuccess(res.data))
            dispatch(actShowNotifycation("success", "Thêm thành công"))
        }).catch(err => {
            dispatch(actAddGroupAnswersError(err.message))
            dispatch(actShowNotifycation("error", err.message))
        })
    }
}

export const actAddGroupAnswers = () => {
    return {
        type: Types.ADD_GROUP_ANSWERS
    }
}

export const actAddGroupAnswersSuccess = (groupAnswer) => {
    return {
        type: Types.ADD_GROUP_ANSWERS_SUCCESS,
        groupAnswer
    }
}

export const actAddGroupAnswersError = (groupAnswer) => {
    return {
        type: Types.ADD_GROUP_ANSWERS_ERROR,
        groupAnswer
    }
}

export const actFetchGroupAnswersRequest = () => {
    return (dispatch) => {
        dispatch(actFetchGroupAnswers())
        return callApi(`${BASE_URL}answertypes`, "GET", null).then(res => {
            dispatch(actFetchGroupAnswersSuccess(res.data))
        }).catch(err => {
            dispatch(actFetchGroupAnswersError(err.message))
        })
    }
}

export const actFetchGroupAnswers = () => {
    return {
        type: Types.FETCH_GROUP_ANSWERS
    }
}

export const actFetchGroupAnswersSuccess = (groupAnswer) => {
    return {
        type: Types.FETCH_GROUP_ANSWERS_SUCCESS,
        groupAnswer
    }
}

export const actFetchGroupAnswersError = (groupAnswer) => {
    return {
        type: Types.FETCH_GROUP_ANSWERS_ERROR,
        groupAnswer
    }
}


export const actFetchGroupAnswersWithIdRequest = (id) => {
    return (dispatch) => {
        dispatch(actFetchGroupAnswersWithId())
        return callApi(`${BASE_URL}answertypes/${id}`, "GET", null).then(res => {
            dispatch(actFetchGroupAnswersWithIdSuccess(res.data))
        }).catch(err => {
            dispatch(actFetchGroupAnswersWithIdError(err.message))
        })
    }
}

export const actFetchGroupAnswersWithId = () => {
    return {
        type: Types.FETCH_GROUP_ANSWERS_WITH_ID
    }
}

export const actFetchGroupAnswersWithIdSuccess = (groupAnswer) => {
    return {
        type: Types.FETCH_GROUP_ANSWERS_WITH_ID_SUCCESS,
        groupAnswer
    }
}

export const actFetchGroupAnswersWithIdError = (groupAnswer) => {
    return {
        type: Types.FETCH_GROUP_ANSWERS_WITH_ID_ERROR,
        groupAnswer
    }
}


export const actUpdateGroupAnswerRequest = (items) => {
    return (dispatch) => {
        console.log(items)
        dispatch(actUpdateGroupAnswer())
        return callApi(`${BASE_URL}answertypes/${items.id}`, "PUT", items).then(res => {
            dispatch(actUpdateGroupAnswerSuccess(res.data))
            dispatch(actShowNotifycation("success", "Sửa thành công"))
        }).catch(err => {
            dispatch(actUpdateGroupAnswerError(err.message))
            dispatch(actShowNotifycation("error", err.message))
        })
    }
}

export const actUpdateGroupAnswer = () => {
    return {
        type: Types.UPDATE_GROUP_ANSWERS
    }
}

export const actUpdateGroupAnswerSuccess = (groupAnswer) => {
    return {
        type: Types.UPDATE_GROUP_ANSWERS_SUCCESS,
        groupAnswer
    }
}

export const actUpdateGroupAnswerError = (groupAnswer) => {
    return {
        type: Types.UPDATE_GROUP_ANSWERS_ERROR,
        groupAnswer
    }
}