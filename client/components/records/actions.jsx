import { instance as axios } from '../../axios'
import { singleChoiceApi, multiChoiceApi, judgeApi, blankApi, questAnswerApi, mixingApi } from '../../api/api'

export const RECORD_REQUEST_ERROR = 'RECORD_REQUEST_ERROR'

export const ADD_SINGECHOICE_SUCCESS = 'ADD_SINGECHOICE_SUCCESS'
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
export const CLEAN_SINGECHOICE_SUCCESS = 'CLEAN_SINGECHOICE_SUCCESS'
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

export const CLEAN_MULTICHOICE_SUCCESS = 'CLEAN_MULTICHOICE_SUCCESS'
export const cleanMultiChoice = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_MULTICHOICE_SUCCESS
        })
    }
}

export const ADD_JUDGE_SUCCESS = 'ADD_JUDGE_SUCCESS'
export const addJudge = (judge) => {
    return (dispatch) => {
        axios.post(judgeApi, judge).then(response => {
            dispatch({
                type: ADD_JUDGE_SUCCESS,
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

export const CLEAN_JUDGE_SUCCESS = 'CLEAN_JUDGE_SUCCESS'
export const cleanJudge = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_JUDGE_SUCCESS
        })
    }
}

export const ADD_BLANK_SUCCESS = 'ADD_BLANK_SUCCESS'
export const addBlank = (blank) => {
    return (dispatch) => {
        axios.post(blankApi, blank).then(response => {
            dispatch({
                type: ADD_BLANK_SUCCESS,
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

export const CLEAN_BLANK_SUCCESS = 'CLEAN_BLANK_SUCCESS'
export const cleanBlank = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_BLANK_SUCCESS
        })
    }
}

export const ADD_QUESTANSWER_SUCCESS = 'ADD_QUESTANSWER_SUCCESS'
export const addQuestAnswer = (questAnswer) => {
    return (dispatch) => {
        axios.post(questAnswerApi, questAnswer).then(response => {
            dispatch({
                type: ADD_QUESTANSWER_SUCCESS,
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

export const CLEAN_QUESTANSWER_SUCCESS = 'CLEAN_QUESTANSWER_SUCCESS'
export const cleanQuestAnswer = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_QUESTANSWER_SUCCESS
        })
    }
}

export const ADD_MIXING_SUCCESS = 'ADD_MIXING_SUCCESS'
export const addMixing = (mixing) => {
    return (dispatch) => {
        axios.post(mixingApi, mixing).then(response => {
            dispatch({
                type: ADD_MIXING_SUCCESS,
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

export const CLEAN_MIXING_SUCCESS = 'CLEAN_MIXING_SUCCESS'
export const cleanMixing = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_MIXING_SUCCESS
        })
    }
}

