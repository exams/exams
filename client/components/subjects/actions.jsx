import { instance as axios } from '../../axios'
import {subjectsApi} from '../../api/api'

export const SUBJECT_HTTP_FAILED = 'SUBJECT_HTTP_FAILED'

export const ADD_SUBJECT_SUCCESS = 'ADD_SUBJECT_SUCCESS'

export const addSubject = (subject) => {
    return (dispatch) => {
        axios.post(subjectsApi, subject).then(response => {
            dispatch({
                type: ADD_SUBJECT_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: SUBJECT_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}

export const LIST_SUBJECT_SUCCESS = 'LIST_SUBJECT_SUCCESS'

export const listSubjects = () => {
    return (dispatch) => {
        axios.get(subjectsApi).then(response => {
            dispatch({
                type: LIST_SUBJECT_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: SUBJECT_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}