import callApi from './../ultils/callApi';
import * as Types from './../constants/ActionType';
import { actShowNotifycation,actHideNotifycation } from './NotifyAction';
import { BASE_URL } from '../ultils/config';


//lay tat ca question
export const actShowQuestionTypeRequest = () => {
    return (dispatch) => {
        dispatch(actShowQuestionType())
        return callApi(`${BASE_URL}get_all_question`, "GET", null).then(res => {
            dispatch(actShowQuestionTypeSuccess(res.data))
        }).catch(err => {
            dispatch(actShowQuestionTypeError(err.message))
        })
    }
}

export const actShowQuestionType = () => {
    return {
        type: Types.FETCH_QUESTION_TYPE
    }
}

export const actShowQuestionTypeSuccess = (questions) => {
    return {
        type: Types.FETCH_QUESTION_TYPE_SUCCESS,
        questions
    }
}

export const actShowQuestionTypeError = (questions) => {
    return {
        type: Types.FETCH_QUESTION_TYPE_ERROR,
        questions
    }
}



//them question
export const actAddQuestionRequest = (items) => {
    return (dispatch) => {
        dispatch(actAddQuestion())
        return callApi(`${BASE_URL}Questions`, "POST", items).then(res => {
            console.log(res.data);
            dispatch(actAddQuestionSuccess(res.data))
            dispatch(actShowNotifycation("success", "Thêm thành công"))
            setTimeout(() => {
                dispatch(actHideNotifycation());
            }, 10000);
        }).catch(err => {
            dispatch(actAddQuestionError(err.message))
            dispatch(actShowNotifycation("error", err.message))
        })
    }
}

export const actAddQuestion = () => {
    return {
        type: Types.ADD_QUESTION
    }
}

export const actAddQuestionSuccess = (questions) => {
    return {
        type: Types.ADD_QUESTION_SUCCESS,
        questions
    }
}

export const actAddQuestionError = (questions) => {
    return {
        type: Types.ADD_QUESTION_ERROR,
        questions
    }
}

//lay \question theo id
export const actShowQuestionTypeWithIdRequest = (id) => {
    return (dispatch) => {
        dispatch(actShowQuestionTypeWithId())
        return callApi(`${BASE_URL}questions/${id}`, "GET", null).then(res => {
            dispatch(actShowQuestionTypeWithIdSuccess(res.data))
        }).catch(err => {
            dispatch(actShowQuestionTypeWithIdError(err.message))
        })
    }
}

export const actShowQuestionTypeWithId = () => {
    return {
        type: Types.FETCH_QUESTION_WITH_ID
    }
}

export const actShowQuestionTypeWithIdSuccess = (questions) => {
    return {
        type: Types.FETCH_QUESTION_WITH_ID_SUCCESS,
        questions
    }
}

export const actShowQuestionTypeWithIdError = (questions) => {
    return {
        type: Types.FETCH_QUESTION_WITH_ID_ERROR,
        questions
    }
}

//sua \question theo id
export const actEditQuestionRequest = (items) => {
    return (dispatch) => {
        dispatch(actEditQuestion())
        return callApi(`${BASE_URL}questions/${items.id}`, "PUT", items).then(res => {
            console.log(res.data)
            dispatch(actEditQuestionSuccess(res.data))
            dispatch(actShowNotifycation("success", "Cập nhật thành công"))
            setTimeout(() => {
                dispatch(actHideNotifycation());
            }, 10000);
        }).catch(err => {
            dispatch(actEditQuestionError(err.message))
            dispatch(actShowNotifycation("error", err.message))
        })
    }
}

export const actEditQuestion = () => {
    return {
        type: Types.EDIT_QUESTION
    }
}

export const actEditQuestionSuccess = (questions) => {
    return {
        type: Types.EDIT_QUESTION_SUCCESS,
        questions
    }
}

export const actEditQuestionError = (questions) => {
    return {
        type: Types.EDIT_QUESTION_ERROR,
        questions
    }
}


export const actDeleteQuestionRequest = (id) => {
    return (dispatch) => {
        dispatch(actDeleteQuestion())
        return callApi(`${BASE_URL}questions/${id}`, "DELETE", null).then(res => {
            console.log(res.data)
            dispatch(actDeleteQuestionSuccess(res.data))
            dispatch(actShowNotifycation("success", "Xóa thành công"))
            setTimeout(() => {
                dispatch(actHideNotifycation());
            }, 10000);
        }).catch(err => {
            dispatch(actDeleteQuestionError(err.message))
            dispatch(actShowNotifycation("error", err.message))
        })
    }
}

export const actDeleteQuestion = () => {
    return {
        type: Types.DELETE_QUESTION
    }
}

export const actDeleteQuestionSuccess = (questions) => {
    return {
        type: Types.DELETE_QUESTION_SUCCESS,
        questions
    }
}

export const actDeleteQuestionError = (questions) => {
    return {
        type: Types.DELETE_QUESTION_ERROR,
        questions
    }
}
