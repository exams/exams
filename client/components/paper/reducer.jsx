import { createReducer } from 'redux-action-tools'
import {
    GET_PAPER_LIST
} from './actionType'

const defaultState = {
    tempaltes: [],
    status: 'initial'
}

const papersReducer = createReducer()
    .when(GET_PAPER_LIST, (state, action) => {
        return {
            ...state,
            status: 'loading'
        }
    })
    .done((state= defaultState, action) => {
        const papers = action.payload.data
        return {
            ...state,
            papers,
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

export { papersReducer as reducer }
