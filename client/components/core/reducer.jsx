import { createReducer } from 'redux-action-tools'
import {
    DO_AUTHENTICATE, GET_ME
} from './actionType'

const defaultState = {
    auth: {},
    status: 'initial'
}

const authReducer = createReducer()
    .when(DO_AUTHENTICATE, (state = defaultState, action) => {
        return {
            ...state,
            status: 'loading'
        }
    })
    .done((state= defaultState, action) => {
        const auth = action.payload.data
        return {
            ...state,
            auth: auth,
            status: 'completed'
        }
    })
    .failed((state, action) => {
        return {
            ...state,
            status: 'failed'
        }
    })
    .build({
        status: 'initial'
    })

const meReducer = createReducer()
    .when(GET_ME, (state, action) => {
        return {
            ...state,
            status: 'loading'
        }
    })
    .done((state= defaultState, action) => {
        const me = action.payload.data
        return {
            ...state,
            me,
            status: 'completed'
        }
    })
    .failed((state, action) => {
        return {
            ...state,
            status: 'failed'
        }
    })
    .build({
        status: 'initial'
    })

export { authReducer, meReducer }
