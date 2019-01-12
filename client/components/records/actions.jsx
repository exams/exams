import { instance as axios } from '../../axios'
import { singleChoiceApi, multiChoiceApi } from '../../api/api'

export const RECORD_REQUEST_ERROR = 'RECORD_REQUEST_ERROR'

export const ADD_SINGECHOICE_SUCCESS = 'ADD_SINGECHOICE_SUCCESS'
export const CLEAN_SINGECHOICE_SUCCESS = 'CLEAN_SINGECHOICE_SUCCESS'

export const addSingleChoice = (singleChoice) => {
    return (dispatch) => {
        axios.post(singleChoiceApi, singleChoice).then(response => {
            dispatch({
                type: ADD_SINGECHOICE_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: RECORD_REQUEST_ERROR,
                    data: error
                })
            }
        })
    }
}

export const cleanSingleChoice = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_SINGECHOICE_SUCCESS
        })
    }
}

export const ADD_MULTICHOICE_SUCCESS = 'ADD_MULTICHOICE_SUCCESS'

export const addMultiChoice = (multiChoice) => {
    return (dispatch) => {
        axios.post(multiChoiceApi, multiChoice).then(response => {
            dispatch({
                type: ADD_MULTICHOICE_SUCCESS,
                payload: response
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: RECORD_REQUEST_ERROR,
                    data: error
                })
            }
        })
    }
}