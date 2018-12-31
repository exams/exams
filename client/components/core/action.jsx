import {
    SWITCH_LANGUAGE, DO_AUTHENTICATE, GET_ME, CLEAN
} from './actionType'
import { createAsyncAction } from 'redux-action-tools'
import { instance as axios } from '../../axios'
import { authenticate, me } from '../../api/api'

const doAuthenticate = createAsyncAction(
    DO_AUTHENTICATE,
    (values) => {
        console.log(values);
        return axios.post(authenticate, {
            usernameOrEmail: values.userName,
            password: values.password
        })
    }
)

const getMe = createAsyncAction(
    GET_ME,
    () => {
        return axios.get(me)
    }
)

const clean = createAsyncAction(
    CLEAN,
    () => {
        return axios.get(me)
    }
)

export { doAuthenticate, getMe }