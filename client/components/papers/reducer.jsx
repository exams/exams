import {
    PAPER_HTTP_FAILED,
    CREATE_PAPER_SUCCESS,
    LIST_PAPER_SUCCESS,
    DELETE_PAPER_SUCCESS
} from './actions'

// Initial State
const initialState = { data: [] };

const SubjectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PAPER_SUCCESS :
            const paper = action.data;
            return {
                ...state,
                paper,
                status: 'success'
            };
        case LIST_PAPER_SUCCESS:
            const papers = action.data;
            return {
                ...state,
                papers,
                status: 'success'
            };
        case DELETE_PAPER_SUCCESS:
            state.papers = state.papers.filter(paper => paper._id !== action.paperId);
            return {
                ...state,
                status: 'success'
            };
        case PAPER_HTTP_FAILED :
            return {
                status: 'failed'
            };

        default:
            return state;
    }
};

export default SubjectsReducer;
