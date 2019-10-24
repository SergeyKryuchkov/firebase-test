
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../helpers/Auth';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER
} from '../actions';

import {
    loginUserSuccess,
    loginUserError,
    registerUserSuccess,
    registerUserError
} from './actions';

const loginWithEmailPasswordAsync = async (email, password) =>
    await auth(email, password)
        .then(authUser => authUser)
        .catch(error => error);

function* loginWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    try {
        const { data, error } = yield call(loginWithEmailPasswordAsync, email, password);
        if (data) {
            yield put(loginUserSuccess(data['user']));
            history.push('/');
        } else if (error) {
            yield put(loginUserError(error.message));
        } else yield put(loginUserError());
    } catch (error) {
        yield put(loginUserError(error));
    }
}

const registerWithEmailPasswordAsync = async (email, password) =>
    await auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);

function* registerWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload
    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, email, password);
        if (!registerUser.message) {
            localStorage.setItem('user_id', registerUser.user.uid);
            yield put(registerUserSuccess(registerUser));
            history.push('/')
        } else {
            yield put(registerUserError(registerUser.message));

        }
    } catch (error) {
        yield put(registerUserError(error));
    }
}

const logoutAsync = async (history) => {
    localStorage.removeItem('test-token');
    history.push('/')
}

function* logout({ payload }) {
    const { history } = payload
    try {
        yield call(logoutAsync, history);
    } catch (error) {
    }
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}


export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
    ]);
}