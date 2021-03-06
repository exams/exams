import { instance as axios } from '../../axios'
import { singleChoicesApi, multiChoicesApi, judgesApi, blanksApi, questAnswersApi, mixingsApi,
    mixBlanksApi, mixJudgesApi, mixMultiChoicesApi, mixQuestAnswersApi, mixSingleChoicesApi} from '../../api/api'

export const RECORD_REQUEST_ERROR = 'RECORD_REQUEST_ERROR'

export const ADD_SINGECHOICE_SUCCESS = 'ADD_SINGECHOICE_SUCCESS'
export const addSingleChoice = (singleChoice) => {
    return (dispatch) => {
        axios.post(singleChoicesApi, singleChoice).then(response => {
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
        axios.post(multiChoicesApi, multiChoice).then(response => {
            dispatch({
                type: ADD_MULTICHOICE_SUCCESS,
                payload: response.data
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
        axios.post(judgesApi, judge).then(response => {
            dispatch({
                type: ADD_JUDGE_SUCCESS,
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
        axios.post(blanksApi, blank).then(response => {
            dispatch({
                type: ADD_BLANK_SUCCESS,
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
        axios.post(questAnswersApi, questAnswer).then(response => {
            dispatch({
                type: ADD_QUESTANSWER_SUCCESS,
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
        axios.post(mixingsApi, mixing).then(response => {
            dispatch({
                type: ADD_MIXING_SUCCESS,
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

export const CLEAN_MIXING_SUCCESS = 'CLEAN_MIXING_SUCCESS'
export const cleanMixing = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_MIXING_SUCCESS
        })
    }
}

export const ADD_MIXSINGLECHOICE_SUCCESS = 'ADD_MIXSINGLECHOICE_SUCCESS'
export const addMixSingleChoice = (mixSingleChoice) => {
    return (dispatch) => {
        axios.post(mixSingleChoicesApi, mixSingleChoice).then(response => {
            dispatch({
                type: ADD_MIXSINGLECHOICE_SUCCESS,
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

export const CLEAN_MIXSINGLECHOICE_SUCCESS = 'CLEAN_MIXSINGLECHOICE_SUCCESS'
export const cleanMixSingleChoice = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_MIXSINGLECHOICE_SUCCESS
        })
    }
}

export const ADD_MIXMULTICHOICE_SUCCESS = 'ADD_MIXMULTICHOICE_SUCCESS'
export const addMixMultiChoice = (mixMultiChoice) => {
    return (dispatch) => {
        axios.post(mixMultiChoicesApi, mixMultiChoice).then(response => {
            dispatch({
                type: ADD_MIXMULTICHOICE_SUCCESS,
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

export const CLEAN_MIXMULTICHOICE_SUCCESS = 'CLEAN_MIXMULTICHOICE_SUCCESS'
export const cleanMixMultiChoice = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_MIXMULTICHOICE_SUCCESS
        })
    }
}

export const ADD_MIXBLANK_SUCCESS = 'ADD_MIXBLANK_SUCCESS'
export const addMixBlank = (mixBlank) => {
    return (dispatch) => {
        axios.post(mixBlanksApi, mixBlank).then(response => {
            dispatch({
                type: ADD_MIXBLANK_SUCCESS,
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

export const CLEAN_MIXBLANK_SUCCESS = 'CLEAN_MIXBLANK_SUCCESS'
export const cleanMixBlank = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_MIXBLANK_SUCCESS
        })
    }
}

export const ADD_MIXJUDGE_SUCCESS = 'ADD_MIXJUDGE_SUCCESS'
export const addMixJudge = (mixJudge) => {
    return (dispatch) => {
        axios.post(mixJudgesApi, mixJudge).then(response => {
            dispatch({
                type: ADD_MIXJUDGE_SUCCESS,
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

export const CLEAN_MIXJUDGE_SUCCESS = 'CLEAN_MIXJUDGE_SUCCESS'
export const cleanMixJudge = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_MIXJUDGE_SUCCESS
        })
    }
}

export const ADD_MIXQUESTANSWER_SUCCESS = 'ADD_MIXQUESTANSWER_SUCCESS'
export const addMixQuestAnswer = (mixQuestAnswer) => {
    return (dispatch) => {
        axios.post(mixQuestAnswersApi, mixQuestAnswer).then(response => {
            dispatch({
                type: ADD_MIXQUESTANSWER_SUCCESS,
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

export const CLEAN_MIXQUESTANSWER_SUCCESS = 'CLEAN_MIXQUESTANSWER_SUCCESS'
export const cleanMixQuestAnswer = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_MIXQUESTANSWER_SUCCESS
        })
    }
}

