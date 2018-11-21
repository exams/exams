import { createReducer } from 'redux-action-tools'
import {
    GET_PAPAR_TEMPLATE_LIST
} from './actionType'

const defaultState = {
    tempaltes: [],
    status: 'initial'
}

const paperTemplateReducer = createReducer()
    .when(GET_PAPAR_TEMPLATE_LIST, (state, action) => {
        console.log('begin action')
        return {
            ...state,
            status: 'loading'
        }
    })
    .done((state= defaultState, action) => {
        const templates = action.payload.data
        return {
            ...state,
            templates,
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

export { paperTemplateReducer as reducer }
