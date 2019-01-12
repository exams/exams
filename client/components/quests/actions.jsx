import { instance as axios } from '../../axios'
import {singleChoiceApi, multiChoiceApi, judgeApi, blankApi, questAnswerApi, mixingApi} from '../../api/api'
import questTypes from './questTypes.json'

export const QUESTS_HTTP_FAILED = 'QUESTS_HTTP_FAILED'

export const LIST_SINGLECHOICE_SUCCESS = 'LIST_SINGLECHOICE_SUCCESS'
export const listSingleChoice = (subject) => {
    return (dispatch) => {
        axios.get(singleChoiceApi, {
            params: {
                subject: subject
            }
        }).then(response => {
            dispatch({
                type: LIST_SINGLECHOICE_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: QUESTS_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}

export const LIST_MULTICHOICE_SUCCESS = 'LIST_MULTICHOICE_SUCCESS'
export const listMultiChoice = (subject) => {
    console.log(subject)
    return (dispatch) => {
        axios.get(multiChoiceApi, {
            params: {
                subject: subject
            }
        }).then(response => {
            dispatch({
                type: LIST_MULTICHOICE_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: QUESTS_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}

export const LIST_JUDGE_SUCCESS = 'LIST_JUDGE_SUCCESS'
export const listJudge = (subject) => {
    return (dispatch) => {
        axios.get(judgeApi, {
            params: {
                subject: subject
            }
        }).then(response => {
            dispatch({
                type: LIST_JUDGE_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: QUESTS_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}

export const LIST_BLANK_SUCCESS = 'LIST_BLANK_SUCCESS'
export const listBlank = (subject) => {
    return (dispatch) => {
        axios.get(blankApi, {
            params: {
                subject: subject
            }
        }).then(response => {
            dispatch({
                type: LIST_BLANK_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: QUESTS_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}

export const LIST_QUESTANSWER_SUCCESS = 'LIST_QUESTANSWER_SUCCESS'
export const listQuestAnswer = (subject) => {
    return (dispatch) => {
        axios.get(questAnswerApi, {
            params: {
                subject: subject
            }
        }).then(response => {
            dispatch({
                type: LIST_QUESTANSWER_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: QUESTS_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}

export const LIST_MIXING_SUCCESS = 'LIST_MIXING_SUCCESS'
export const listmixing = (subject) => {
    return (dispatch) => {
        axios.get(mixingApi, {
            params: {
                subject: subject
            }
        }).then(response => {
            dispatch({
                type: LIST_MIXING_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: QUESTS_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}

export const LIST_QUESTTYPE_SUCCESS = 'LIST_QUESTTYPE_SUCCESS'
export const listQuestTypes = () => {
    return (dispatch) => {
        dispatch({
            type: LIST_QUESTTYPE_SUCCESS,
            data: questTypes
        })
    }
}