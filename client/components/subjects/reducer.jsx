import {
    SUBJECT_HTTP_FAILED,
    ADD_SUBJECT_SUCCESS,
    DELETE_SUBJECT_SUCCESS,
    LIST_SUBJECT_SUCCESS,
    ADD_TAG_SUCCESS,
    LIST_TAG_SUCCESS,
    DELETE_TAG_SUCCESS
} from './actions'

const SubjectsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_SUBJECT_SUCCESS :
            state.subjects = [
                action.data,
                ...state.subjects
            ]
            return {
                ...state,
                status: 'success'
            };
        case DELETE_SUBJECT_SUCCESS:
            state.subjects = state.subjects.filter(subject => subject._id !== action.data._id)
            return {
                ...state,
                status: 'success'
            };
        case LIST_SUBJECT_SUCCESS:
            const subjects = action.data
            return {
                ...state,
                subjects,
                status: 'success'
            };
        case ADD_TAG_SUCCESS :
            const tag = action.data
            return {
                ...state,
                tag,
                status: 'success'
            };
        case DELETE_TAG_SUCCESS:
            return {
                ...state,
                status: 'success'
            };
        case LIST_TAG_SUCCESS:
            const tags = action.data
            return {
                ...state,
                tags,
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
