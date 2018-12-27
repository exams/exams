import { instance as axios } from '../../axios'
import { singeChoiceApi, multiChoiceApi } from '../../api/api'

export const RECORD_REQUEST_START = 'RECORD_REQUEST_START'
export const RECORD_REQUEST_FAILED = 'RECORD_REQUEST_FAILED'

export const ADD_SINGECHOICE = 'ADD_SINGECHOICE'
export const ADD_SINGECHOICE_SUCCESS = 'ADD_SINGECHOICE_SUCCESS'
export const ADD_SINGECHOICE_FAILED = 'ADD_SINGECHOICE_FAILED'

export const addSingleChoice = (values) => {
    return (dispatch) => {
        dispatch({
            type: RECORD_REQUEST_START
        })
        axios.post(singeChoiceApi, {
            title: values.stem,
            difficulty: values.difficulty,
            analysis: values.analysis,
            answer: values.answer,
            choiceItems: values.choiceItems
        }).then(response => {
            dispatch({
                type: ADD_SINGECHOICE_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            dispatch({
                type: RECORD_REQUEST_FAILED,
                data: error
            })
        })
    }
}

export const ADD_MULTICHOICE = 'ADD_MULTICHOICE'
export const ADD_MULTICHOICE_SUCCESS = 'ADD_MULTICHOICE_SUCCESS'
export const ADD_MULTICHOICE_FAILED = 'ADD_MULTICHOICE_FAILED'

export const addMultiChoice = (values) => {
    return (dispatch) => {
        dispatch({
            type: RECORD_REQUEST_START
        })
        axios.post(multiChoiceApi, {
            usernameOrEmail: values.userName,
            password: values.password
        }).then(response => {
            dispatch({
                type: ADD_MULTICHOICE_SUCCESS,
                payload: response
            })
        }).catch(error => {
            dispatch({
                type: RECORD_REQUEST_FAILED,
                payload: error
            })
        })
    }
}