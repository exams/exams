import { instance as axios } from '../../axios'
import {subjectsApi, tagsApi} from '../../api/api'

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

export const ADD_TAG_SUCCESS = 'ADD_TAG_SUCCESS'

export const addTag = (tag) => {
    return (dispatch) => {
        axios.post(tagsApi, tag).then(response => {
            dispatch({
                type: ADD_TAG_SUCCESS,
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

export const LIST_TAG_SUCCESS = 'LIST_TAG_SUCCESS'

export const listTags = () => {
    return (dispatch) => {
        axios.get(tagsApi).then(response => {
            dispatch({
                type: LIST_TAG_SUCCESS,
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