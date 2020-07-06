import { SET_APP_LOADING, SINGIN_USER, SET_AUTH_USER, LOGOUT_USER } from '../constants';

export const setIsLoading = (payload) => ({
	type: SET_APP_LOADING,
	payload
});

export const singIn = (payload) => ({
	type: SINGIN_USER,
	payload
});

export const authSetUser = (payload) => ({
	type: SET_AUTH_USER,
	payload
});

export const logoutUser = (payload) => ({
	type: LOGOUT_USER,
	payload
});
