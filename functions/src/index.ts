import {triggers} from './triggers';
import api from './api';

// export const userCreate = triggers.auth.createUser;
export const signUp = api.auth.signUp;
export const login = api.auth.login;
