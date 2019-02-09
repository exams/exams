import {
    USER_HTTP_FAILED, ADD_USER_SUCCESS, LIST_USER_SUCCESS, DELETE_USER_SUCCESS
} from './actions'

const UsersReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER_SUCCESS :
            state.users = [
                action.data,
                ...state.users
            ]
            return {
                ...state,
                status: 'success'
            };
        case DELETE_USER_SUCCESS:
            state.users = state.users.filter(user => user._id !== action.data._id)
            return {
                ...state,
                status: 'success'
            };
        case LIST_USER_SUCCESS:
            const users = action.data
            return {
                users,
                ...state,
                status: 'success'
            };
        case USER_HTTP_FAILED :
            return {
                ...state,
                status: 'error'
            };

        default:
            return state;
    }
};

export default UsersReducer;
