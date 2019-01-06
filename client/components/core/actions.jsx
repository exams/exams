import { instance as axios } from '../../axios'
import { authenticate, me } from '../../api/api'

export const DO_AUTHENTICATE_SUCCESS = 'DO_AUTHENTICATE_SUCCESS'
export const CORE_HTTP_ERROR = 'CORE_HTTP_ERROR'

export const doAuthenticate = (values) => {
    return (dispatch) => {
        axios.post(authenticate, {
            usernameOrEmail: values.userName,
            password: values.password
        }).then(response => {
            console.log(response)
            dispatch({
                type: DO_AUTHENTICATE_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            dispatch({
                type: CORE_HTTP_ERROR,
                data: error
            })
        })
    }
}

export const GET_ME_SUCCESS = 'GET_ME_SUCCESS'
export const getMe = () => {
    return (dispatch) => {
        axios.get(me).then(response => {
            console.log(response)
            dispatch({
                type: GET_ME_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            dispatch({
                type: CORE_HTTP_ERROR,
                data: error
            })
        })
    }
}

export const CLEAN_ME_SUCCESS = 'CLEAN_ME_SUCCESS'
export const cleanMe = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_ME_SUCCESS
        })
    }
}