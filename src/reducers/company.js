import { SET_COMPANY_COUNT, SET_COMPANY_LIST, SET_COMPANY_LOADING } from '../constants';

const INITIAL_STATE = {
	companyList: [],
	companyCount: 0,
	companyLoading: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case SET_COMPANY_COUNT:
			return {
				...state,
				companyCount: payload
			};
		case SET_COMPANY_LOADING:
			return {
				...state,
				companyLoading: payload
			};
		case SET_COMPANY_LIST:
			return {
				...state,
				companyList: payload
			};
		default:
			return state;
	}
};
