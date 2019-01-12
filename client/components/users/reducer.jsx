import {
    USER_HTTP_FAILED, ADD_USER_SUCCESS, LIST_USER_SUCCESS, CLEAN_USER_SUCCESS
} from './actions'

// Initial State
const initialState = { data: [] };

const UsersReducer = (state = initialState, action) => {
    let user
    switch (action.type) {
        case ADD_USER_SUCCESS :
            user = action.data
            return {
                ...state,
                user,
                status: 'success'
            };
        case CLEAN_USER_SUCCESS:
            user = null
            return {
                ...state,
                user,
                status: 'success'
            };
        case LIST_USER_SUCCESS:
            const users = action.data
            console.log(users)
            return {
                ...state,
                users,
                status: 'success'
            };
        case USER_HTTP_FAILED :
            return {
                status: 'error'
            };

        default:
            return state;
    }
};

export default UsersReducer;
