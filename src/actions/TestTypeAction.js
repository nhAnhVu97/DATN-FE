import callApi from './../ultils/callApi';
import * as Types from './../constants/ActionType';
import { actShowNotifycation,actHideNotifycation } from './NotifyAction';
import { BASE_URL } from './../ultils/config';

export const actFetchTestTypeRequest = () => {
    return (dispatch) => {
        dispatch(actFetchTestType())
        return callApi(`${BASE_URL}testtypes`, "GET", null).then(res => {
           
            dispatch(actFetchTestTypeSuccess(res.data))
        }).catch(err => {
            dispatch(actFetchTestTypeError(err.message))
        })
    }
}

export const actFetchTestType = () => {
    return {
        type: Types.FETCH_TEST_TYPE
    }
}

export const actFetchTestTypeSuccess = (testType) => {
    return {
        type: Types.FETCH_TEST_TYPE_SUCCESS,
        testType
    }
}

export const actFetchTestTypeError = (testType) => {
    return {
        type: Types.FETCH_TEST_TYPE_ERROR,
        testType
    }
}