import { instance as axios } from '../../axios'
import {usersApi, userApi, paperApi} from '../../api/api'

export const USER_HTTP_FAILED = 'USER_HTTP_FAILED'

export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'

export const addUser = (user) => {
    return (dispatch) => {
        axios.post(usersApi, user).then(response => {
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

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const deleteUser = (user) => {
    const deleteUserApi = userApi.replace(':userId', user._id)
    return (dispatch) => {
        axios.delete(deleteUserApi).then(response => {
            dispatch({
                type: DELETE_USER_SUCCESS,
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

export const LIST_USER_SUCCESS = 'LIST_USER_SUCCESS'

export const listUsers = () => {
    return (dispatch) => {
        axios.get(usersApi).then(response => {
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