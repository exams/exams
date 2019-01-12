import {
    TEMPLATE_HTTP_FAILED, ADD_TEMPLATE_SUCCESS, LIST_TEMPLATE_SUCCESS
} from './actions'

// Initial State
const initialState = { data: [] };

const TemplatesReducer = (state = initialState, action) => {

    switch (action.type) {
        case LIST_TEMPLATE_SUCCESS :
            const templates = action.data;
            return {
                ...state,
                templates,
                status: 'success'
            };
        case ADD_TEMPLATE_SUCCESS:
            const template = action.data
            return {
                ...state,
                template,
                status: 'success'
            };
        case TEMPLATE_HTTP_FAILED :
            return {
                status: 'error'
            };

        default:
            return state;
    }
};

export default TemplatesReducer;
