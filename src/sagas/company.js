import { call, takeLatest, put, select } from 'redux-saga/effects';
import { api, apiRest } from '../apis';

import {
	SET_COMPANY_COUNT,
	SET_COMPANY_LIST,
	SET_COMPANY_LOADING,
	CREATE_COMPANY,
	READ_COMPANY,
	UPDATE_COMPANY,
	DELETE_COMPANY
} from '../constants';

function* readCompanyF({ payload }) {
	yield put({
		type: SET_COMPANY_LOADING,
		payload: true
	});

	const { app: { userToken } } = yield select();

	let query = `
    query getCompanies(
      $filter: String
      $page: Int
      $limit: Int
    ){
      companies(
        filter: $filter
        page: $page
        limit: $limit
      ){
        rows{
          companyId
          name
					img
					status
          createdAt
					updatedAt
        }
        count
        statusCode
      }   
    }
  `;
	let data;
	try {
		data = yield call(api, query, payload.variables, userToken);
	} catch (e) {
		console.log('Error readCompanyF', e);
	}
	if (data.companies.statusCode == 200) {
		yield put({
			type: SET_COMPANY_LIST,
			payload: data.companies.rows
		});
		yield put({
			type: SET_COMPANY_COUNT,
			payload: data.companies.count
		});
	}
	payload.callback(data.companies.statusCode);

	yield put({
		type: SET_COMPANY_LOADING,
		payload: false
	});
}

function* deleteCompanyF({ payload }) {
	yield put({
		type: SET_COMPANY_LOADING,
		payload: true
	});

	const { app: { userToken } } = yield select();

	let query = `
		mutation deleteCompanyMutation(
			$companyId: GUID
		){
			deleteCompany(
				companyId: $companyId
			){
				message
				statusCode
			}   
		}
  `;
	let data;
	try {
		data = yield call(api, query, payload.variables, userToken);
	} catch (e) {
		console.log('Error deleteCompanyF', e);
	}
	payload.callback(data.deleteCompany.statusCode);
	yield put({
		type: SET_COMPANY_LOADING,
		payload: false
	});
}

function* createCompanyF({ payload }) {
	yield put({
		type: SET_COMPANY_LOADING,
		payload: true
	});

	const { app: { userToken } } = yield select();

	let query = `
		mutation createCompanyMutation(
			$input: CompanyInput
		){
			createCompany(
				input: $input
			){
				message
				statusCode
				data{
					companyId
					name
					img
					createdAt
					updatedAt
					status
				}
			}   
		}
  `;
	let data;
	try {
		data = yield call(api, query, payload.variables, userToken);
	} catch (e) {
		console.log('Error createCompanyF', e);
	}
	if (payload.files.length) {
		let formData = new FormData();
		formData.append('companyId', data.createCompany.data.companyId);
		formData.append('company_img', payload.files[0]);
		yield call(apiRest, formData, 'upload/company', {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	}

	payload.callback(data.createCompany.statusCode);
	yield put({
		type: SET_COMPANY_LOADING,
		payload: false
	});
}

function* updateCompanyF({ payload }) {
	yield put({
		type: SET_COMPANY_LOADING,
		payload: true
	});

	const { app: { userToken } } = yield select();

	let query = `
		mutation updateCompanyMutation(
			$input: CompanyInput
			$companyId: GUID
		){
			updateCompany(
				input: $input,
				companyId: $companyId
			){
				message
				statusCode
				data{
					companyId
					name
					updatedAt
				}
			}   
		}
  `;
	let data;
	try {
		data = yield call(api, query, payload.variables, userToken);
	} catch (e) {
		console.log('Error updateCompanyF', e);
	}
	if (payload.files.length) {
		let formData = new FormData();
		formData.append('companyId', data.updateCompany.data.companyId);
		formData.append('company_img', payload.files[0]);
		yield call(apiRest, formData, 'upload/company', {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	}

	payload.callback(data.updateCompany.statusCode);
	yield put({
		type: SET_COMPANY_LOADING,
		payload: false
	});
}

export default [
	takeLatest(READ_COMPANY, readCompanyF),
	takeLatest(DELETE_COMPANY, deleteCompanyF),
	takeLatest(CREATE_COMPANY, createCompanyF),
	takeLatest(UPDATE_COMPANY, updateCompanyF)
];
