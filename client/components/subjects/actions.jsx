import { instance as axios } from '../../axios'
import {subjectsApi, subjectApi, tagsApi, tagApi} from '../../api/api'

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

export const DELETE_SUBJECT_SUCCESS = 'DELETE_SUBJECT_SUCCESS'

export const deleteSubject = (subject) => {
    return (dispatch) => {
        const deleteSubjectApi = subjectApi.replace(':subjectId', subject._id)
        axios.delete(deleteSubjectApi).then(response => {
            console.log(response)
            dispatch({
                type: DELETE_SUBJECT_SUCCESS,
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

export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS'

export const deleteTag = (tag) => {
    return (dispatch) => {
        const deleteApi = tagApi.replace(':tagId', tag._id)
        axios.delete(deleteApi).then(response => {
            console.log(response)
            dispatch({
                type: DELETE_TAG_SUCCESS,
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

export const listTags = (subjectId, shared) => {
    return (dispatch) => {
        axios.get(tagsApi, {
            params: {
                subjectId: subjectId,
                shared: shared
            }
        }).then(response => {
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