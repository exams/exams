import {
    SWITCH_LANGUAGE, DO_AUTHENTICATE, GET_ME
} from './actionType'
import { createAsyncAction } from 'redux-action-tools'
import { instance as axios } from '../../axios'
import { authenticate, me } from '../../api/api'
import { localizationData } from '../../Intl/setup'

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

const switchLanguage = createAsyncAction(
    SWITCH_LANGUAGE,
    (newLang) => {
        return localizationData[newLang]
    }
)

export { switchLanguage, doAuthenticate, getMe }