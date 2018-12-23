import {
    RECORD_REQUEST_START, RECORD_REQUEST_FAILED,
    ADD_SINGECHOICE, ADD_SINGECHOICE_SUCCESS, ADD_SINGECHOICE_FAILED,
    ADD_MULTICHOICE, ADD_MULTICHOICE_SUCCESS, ADD_MULTICHOICE_FAILED
} from './actions'

// Initial State
const initialState = { data: [] };

const RecordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECORD_REQUEST_START :
            return {
                data: [...state.data],
                status: 'loading'
            };
        case ADD_SINGECHOICE_SUCCESS :
            return {
                data: [action.singleChoice, ...state.data],
                status: 'success'
            };
        case ADD_MULTICHOICE_SUCCESS:
            return {
                data: [action.multiChoice, ...state.data],
                status: 'success'
            };
        case RECORD_REQUEST_FAILED :
            return {
                data: [...state.data],
                status: 'failed'
            };

        default:
            return state;
    }
};

/* Selectors */
export const getSingleChoice = state => state.singleChoice.data;
export const getSMultiChoice = state => state.multiChoice.data;

// Get post by cuid
// export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default RecordsReducer;
