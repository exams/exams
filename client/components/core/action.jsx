import {
    DO_AUTHENTICATE, GET_ME
} from './actionType'
import { createAsyncAction } from 'redux-action-tools'
import { axios_instance as axios } from '../../axios'
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

export { doAuthenticate, getMe }