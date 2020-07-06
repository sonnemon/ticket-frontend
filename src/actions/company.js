import { CREATE_COMPANY, READ_COMPANY, UPDATE_COMPANY, DELETE_COMPANY } from '../constants';

export const createCompany = (payload) => ({
	type: CREATE_COMPANY,
	payload
});

export const readCompany = (payload) => ({
	type: READ_COMPANY,
	payload
});

export const updateCompany = (payload) => ({
	type: UPDATE_COMPANY,
	payload
});

export const deleteCompany = (payload) => ({
	type: DELETE_COMPANY,
	payload
});
