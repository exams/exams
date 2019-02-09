import {
    QUESTS_HTTP_FAILED,
    LIST_QUESTTYPE_SUCCESS,
    DELETE_SINGLECHOICE_SUCCESS,
    LIST_SINGLECHOICE_SUCCESS,
    LIST_MULTICHOICE_SUCCESS,
    LIST_JUDGE_SUCCESS,
    LIST_BLANK_SUCCESS,
    LIST_QUESTANSWER_SUCCESS,
    LIST_MIXING_SUCCESS
} from './actions'

// Initial State
const initialState = { data: [] };

const QuestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_QUESTTYPE_SUCCESS:
            const questTypes = action.data
            return {
                ...state,
                questTypes,
                status: 'success'
            };
        case LIST_SINGLECHOICE_SUCCESS:
            const singleChoices = action.data
            return {
                ...state,
                singleChoices,
                status: 'success'
            };
        case DELETE_SINGLECHOICE_SUCCESS:
            return {
                ...state,
                status: 'success'
            };
        case LIST_MULTICHOICE_SUCCESS:
            const multiChoices = action.data
            return {
                ...state,
                multiChoices,
                status: 'success'
            };
        case LIST_JUDGE_SUCCESS:
            const judges = action.data
            return {
                ...state,
                judges,
                status: 'success'
            };
        case LIST_BLANK_SUCCESS:
            const blanks = action.data
            return {
                ...state,
                blanks,
                status: 'success'
            };
        case LIST_QUESTANSWER_SUCCESS:
            const questAnswers = action.data
            return {
                ...state,
                questAnswers,
                status: 'success'
            };
        case LIST_MIXING_SUCCESS:
            const mixings = action.data
            return {
                ...state,
                mixings,
                status: 'success'
            };
        case QUESTS_HTTP_FAILED :
            return {
                status: 'failed'
            };

        default:
            return state;
    }
};

export default QuestsReducer;
