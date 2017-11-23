import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR,
    CLEAN_STATE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
} from '../actions/actionTypes';

export default (
    state = {
        loadingCreateEdit: false,
        successCreateEdit: false,
        errorMessageCreateEdit: '',
        loadingDelete: false,
        successDelete: false,
        errorMessageDelete: '',
    },
    action,
) => {
    switch (action.type) {
    case CREATE_USER_REQUEST:
        return {
            ...state,
            loadingCreateEdit: true,
            successCreateEdit: false,
            errorMessageCreateEdit: '',
        };
    case CREATE_USER_SUCCESS:
        return {
            ...state,
            loadingCreateEdit: false,
            successCreateEdit: true,
            errorMessageCreateEdit: '',
        };
    case CREATE_USER_ERROR:
        return {
            ...state,
            loadingCreateEdit: false,
            successCreateEdit: false,
            errorMessageCreateEdit: action.payload.response.data.message,
        };
    case EDIT_USER_REQUEST:
        return {
            ...state,
            loadingCreateEdit: true,
            successCreateEdit: false,
            errorMessageCreateEdit: '',
        };
    case EDIT_USER_SUCCESS:
        return {
            ...state,
            loadingCreateEdit: false,
            successCreateEdit: true,
            errorMessageCreateEdit: '',
        };
    case EDIT_USER_ERROR:
        return {
            ...state,
            loadingCreateEdit: false,
            successCreateEdit: false,
            errorMessageCreateEdit: action.payload.response.data.message,
        };
    case DELETE_USER_REQUEST:
        return {
            ...state,
            loadingDelete: action.payload,
            successDelete: false,
            errorMessageDelete: '',
        };
    case DELETE_USER_SUCCESS:
        return {
            ...state,
            loadingDelete: false,
            successDelete: true,
            errorMessageDelete: '',
        };
    case DELETE_USER_ERROR:
        return {
            ...state,
            loadingDelete: false,
            successDelete: false,
            errorMessageDelete: action.payload.response.data.message,
        };
    case CLEAN_STATE:
        return {
            ...state,
            loadingCreateEdit: false,
            successCreateEdit: false,
            errorMessageCreateEdit: '',
            loadingDelete: false,
            successDelete: false,
            errorMessageDelete: '',
        };
    default:
        return state;
    }
};
