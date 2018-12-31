import {
    RECORD_REQUEST_FAILED,
    ADD_SINGECHOICE, ADD_SINGECHOICE_SUCCESS, ADD_SINGECHOICE_FAILED,
    CLEAN_SINGECHOICE_SUCCESS,
    ADD_MULTICHOICE, ADD_MULTICHOICE_SUCCESS, ADD_MULTICHOICE_FAILED
} from './actions'

// Initial State
const initialState = { data: [] };

const RecordsReducer = (state = initialState, action) => {
    let singleChoice
    switch (action.type) {
        case ADD_SINGECHOICE_SUCCESS :
            singleChoice = action.data
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
        case RECORD_REQUEST_FAILED :
            return {
                status: 'failed'
            };

        case CLEAN_SINGECHOICE_SUCCESS:
            singleChoice = null;
            return {
                ...state,
                singleChoice,
                status: 'success'
            }

        default:
            return state;
    }
};

/* Selectors */
export const getSingleChoice = state => state.singleChoice;
export const getSMultiChoice = state => state.multiChoice;

// Get post by cuid
// export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default RecordsReducer;
