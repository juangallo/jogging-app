import axios from 'axios';
import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    CLEAN_STATE,
} from './actionTypes';

import {
    API_URL,
    ENDPOINT_CREATE_USER,
    ENDPOINT_EDIT_USER,
    ENDPOINT_DELETE_USER,
} from '../consts/globals';

const createUserRequest = payload => ({
    type: CREATE_USER_REQUEST,
    payload,
});

const createUserSuccess = payload => ({
    type: CREATE_USER_SUCCESS,
    payload,
});

const createUserError = payload => ({
    type: CREATE_USER_ERROR,
    payload,
});

export const createUser = user => (dispatch) => {
    dispatch(createUserRequest(user));
    return axios
        .post(`${API_URL}/${ENDPOINT_CREATE_USER}`, {
            email: user.email,
            password: user.password,
            username: user.username,
            role: user.role,
        })
        .then((response) => {
            dispatch(createUserSuccess(response.data));
        })
        .catch((error) => {
            dispatch(createUserError(error));
        });
};

const editUserRequest = payload => ({
    type: EDIT_USER_REQUEST,
    payload,
});

const editUserSuccess = payload => ({
    type: EDIT_USER_SUCCESS,
    payload,
});

const editUserError = payload => ({
    type: EDIT_USER_ERROR,
    payload,
});

export const editUser = user => (dispatch) => {
    dispatch(editUserRequest(user));
    return axios
        .post(`${API_URL}/${ENDPOINT_EDIT_USER}`, {
            uid: user.uid,
            email: user.email,
            password: user.password,
            username: user.username,
            role: user.role,
        })
        .then((response) => {
            dispatch(editUserSuccess(response.data));
        })
        .catch((error) => {
            dispatch(editUserError(error));
        });
};

const deleteUserRequest = payload => ({
    type: DELETE_USER_REQUEST,
    payload,
});

const deleteUserSuccess = payload => ({
    type: DELETE_USER_SUCCESS,
    payload,
});

const deleteUserError = payload => ({
    type: DELETE_USER_ERROR,
    payload,
});

export const deleteUser = uid => (dispatch) => {
    dispatch(deleteUserRequest(uid));
    return axios
        .post(`${API_URL}/${ENDPOINT_DELETE_USER}`, {
            uid,
        })
        .then((response) => {
            dispatch(deleteUserSuccess(response.data));
        })
        .catch((error) => {
            dispatch(deleteUserError(error));
        });
};

const cleanStateDispatch = () => ({
    type: CLEAN_STATE,
});

export const cleanState = () => (dispatch) => {
    dispatch(cleanStateDispatch());
};
