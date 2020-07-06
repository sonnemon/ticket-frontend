import { SET_USER_TOKEN, SET_AUTH_USER, SET_APP_LOADING, LOGOUT_USER } from '../constants';

const INITIAL_STATE = {
	isLoading: false,
	userToken: null,
	user: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case SET_APP_LOADING:
			return {
				...state,
				isLoading: payload
			};
		case SET_AUTH_USER:
			return {
				...state,
				user: payload
			};
		case SET_USER_TOKEN:
			return {
				...state,
				userToken: payload
			};
		case LOGOUT_USER:
			return {
				isLoading: false,
				userToken: null,
				user: {}
			};
		default:
			return state;
	}
};
