import {
    DO_AUTHENTICATE_SUCCESS, CORE_HTTP_ERROR, GET_ME_SUCCESS, CLEAN_ME_SUCCESS, CLEAN_AUTHENTICATE_SUCCESS
} from './actions'

// Initial State
const initialState = { data: [] };

const CoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case DO_AUTHENTICATE_SUCCESS :
            const auth = action.data;
            return {
                ...state,
                auth: auth,
                status: 'success'
            }
        case CLEAN_AUTHENTICATE_SUCCESS:
            delete state.auth;
            return {
                ...state,
                status: 'success'
            }
        case GET_ME_SUCCESS:
            const me = action.data;
            return {
                ...state,
                me: me,
                status: 'success'
            }
        case CLEAN_ME_SUCCESS:
            delete state.me
            return {
                ...state,
                status: 'success'
            };
        case CORE_HTTP_ERROR :
            const error = action.data;
            console.log(error)
            return {
                ...state,
                error: error,
                status: 'error'
            }

        default:
            return state;
    }
};

export default CoreReducer;
