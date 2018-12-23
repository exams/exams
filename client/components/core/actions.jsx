import { instance as axios } from '../../axios'
import { authenticate, me } from '../../api/api'

export const DO_AUTHENTICATE = 'DO_AUTHENTICATE'
export const DO_AUTHENTICATE_SUCCESS = 'DO_AUTHENTICATE_SUCCESS'
export const DO_AUTHENTICATE_FAILED = 'DO_AUTHENTICATE_FAILED'

export const doAuthenticate = (values) => {
    return (dispatch) => {
        dispatch({
            type: DO_AUTHENTICATE
        })
        axios.post(authenticate, {
            usernameOrEmail: values.userName,
            password: values.password
        }).then(response => {
            dispatch({
                type: DO_AUTHENTICATE_SUCCESS,
                payload: response
            })
        }).catch(error => {
            dispatch({
                type: DO_AUTHENTICATE_FAILED,
                payload: error
            })
        })
    }
}

export const GET_ME = 'GET_ME'
export const getMe = () => {
    return (dispatch) => {
        dispatch({
            type: GET_ME
        })
        axios.get(me).then(response => {
            dispatch({
                type: DO_AUTHENTICATE_SUCCESS,
                payload: response
            })
        }).catch(error => {
            dispatch({
                type: DO_AUTHENTICATE_FAILED,
                payload: error
            })
        })
    }
}