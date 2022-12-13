import { userConstants } from '../_constants';

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                ...state,
                registering: true,
                registerError: ''
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                from: action.from,
                registed: true,
                registerError: ''
            };
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                registed: false,
                registerError: action.error
            };
        default:
            return state
    }
}