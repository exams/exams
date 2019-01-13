import {
    RECORD_REQUEST_ERROR,
    ADD_SINGECHOICE_SUCCESS,
    CLEAN_SINGECHOICE_SUCCESS,
    ADD_MULTICHOICE_SUCCESS,
    CLEAN_MULTICHOICE_SUCCESS,
    ADD_JUDGE_SUCCESS,
    CLEAN_JUDGE_SUCCESS,
    ADD_BLANK_SUCCESS,
    CLEAN_BLANK_SUCCESS,
    ADD_QUESTANSWER_SUCCESS,
    CLEAN_QUESTANSWER_SUCCESS,
    ADD_MIXING_SUCCESS,
    CLEAN_MIXING_SUCCESS
} from './actions'

// Initial State
const initialState = { data: [] };

const RecordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SINGECHOICE_SUCCESS :
            const singleChoice = action.data
            return {
                ...state,
                singleChoice,
                status: 'success'
            };
        case ADD_MULTICHOICE_SUCCESS:
            const multiChoice = action.data
            return {
                ...state,
                multiChoice,
                status: 'success'
            };
        case ADD_JUDGE_SUCCESS:
            const judge = action.data;
            return {
                ...state,
                judge,
                status: 'success'
            }
        case ADD_BLANK_SUCCESS:
            const blank = action.data;
            return {
                ...state,
                blank,
                status: 'success'
            }
        case ADD_QUESTANSWER_SUCCESS:
            const questAnswer = action.data;
            return {
                ...state,
                questAnswer,
                status: 'success'
            }
        case ADD_MIXING_SUCCESS:
            const mixing = action.data;
            return {
                ...state,
                mixing,
                status: 'success'
            }
        case CLEAN_SINGECHOICE_SUCCESS:
            delete state.singleChoice;
            return {
                ...state,
                status: 'success'
            }
        case CLEAN_MULTICHOICE_SUCCESS:
            delete state.multiChoice;
            return {
                ...state,
                status: 'success'
            }
        case CLEAN_JUDGE_SUCCESS:
            delete state.judge;
            return {
                ...state,
                status: 'success'
            }
        case CLEAN_BLANK_SUCCESS:
            delete state.blank;
            return {
                ...state,
                status: 'success'
            }
        case CLEAN_QUESTANSWER_SUCCESS:
            delete state.questAnswer;
            return {
                ...state,
                status: 'success'
            }
        case CLEAN_MIXING_SUCCESS:
            delete state.mixing;
            return {
                ...state,
                status: 'success'
            }
        case RECORD_REQUEST_ERROR :
            return {
                status: 'failed'
            };
        default:
            return state;
    }
};

// Export Reducer
export default RecordsReducer;
