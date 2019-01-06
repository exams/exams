import { instance as axios } from '../../axios'
import { userApi } from '../../api/api'

export const USER_HTTP_FAILED = 'USER_HTTP_FAILED'

export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
export const CLEAN_USER_SUCCESS = 'CLEAN_USER_SUCCESS'

export const addUser = (user) => {
    return (dispatch) => {
        axios.post(userApi, user).then(response => {
            dispatch({
                type: ADD_USER_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: USER_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}

export const cleanUser = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_USER_SUCCESS
        })
    }
}

export const LIST_USER_SUCCESS = 'LIST_USER_SUCCESS'

export const listUsers = () => {
    return (dispatch) => {
        axios.get(userApi).then(response => {
            dispatch({
                type: LIST_USER_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: USER_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}