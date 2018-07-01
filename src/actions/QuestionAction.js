import callApi from './../ultils/callApi';
import * as Types from './../constants/ActionType';
import { actShowNotifycation } from './NotifyAction';


export const actShowQuestionTypeRequest = () => {
    return (dispatch) => {
        dispatch(actShowQuestionType())
        return callApi('http://localhost:4000/question_type', "GET", null).then(res => {
            dispatch(actShowQuestionTypeSuccess(res.data))
        }).catch(err => {
            dispatch(actShowQuestionTypeError(err.message))
        })
    }
}

export const actShowQuestionType = () => {
    return {
        type : Types.FETCH_QUESTION_TYPE
    }
}

export const actShowQuestionTypeSuccess = (questions) => {
    return {
        type : Types.FETCH_QUESTION_TYPE_SUCCESS,
        questions
    }
}

export const actShowQuestionTypeError = (questions) => {
    return {
        type : Types.FETCH_QUESTION_TYPE_ERROR,
        questions
    }
}