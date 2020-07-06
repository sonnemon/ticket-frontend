import { createSelector } from 'reselect';

const getCompanyLoading = (state) => state.company.companyLoading;
const getCompanyCount = (state) => state.company.companyCount;
const getCompanyList = (state) => state.company.companyList;

const companySelector = createSelector(
	[ getCompanyLoading, getCompanyCount, getCompanyList ],
	(companyLoading, companyCount, companyList) => ({
		companyLoading,
		companyCount,
		companyList
	})
);

export { companySelector };
