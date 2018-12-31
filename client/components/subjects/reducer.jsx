import {
    SUBJECT_HTTP_FAILED,
    ADD_SUBJECT_SUCCESS,
    LIST_SUBJECT_SUCCESS
} from './actions'

// Initial State
const initialState = { data: [] };

const SubjectsReducer = (state = initialState, action) => {
    let subject
    switch (action.type) {
        case ADD_SUBJECT_SUCCESS :
            subject = action.data
            return {
                ...state,
                subject,
                status: 'success'
            };
        case LIST_SUBJECT_SUCCESS:
            const subjects = action.data
            return {
                ...state,
                subjects,
                status: 'success'
            };
        case SUBJECT_HTTP_FAILED :
            return {
                status: 'failed'
            };

        default:
            return state;
    }
};

export default SubjectsReducer;
