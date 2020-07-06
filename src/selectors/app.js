import { createSelector } from 'reselect';

const getIsLoading = (state) => state.app.isLoading;
const getUserToken = (state) => state.app.userToken;
const getUser = (state) => state.app.user;

const appSelector = createSelector([ getIsLoading, getUserToken, getUser ], (isLoading, userToken, user) => ({
	isLoading,
	userToken,
	user
}));

export { appSelector };
