import { call, takeLatest, put, all } from 'redux-saga/effects';
import { api } from '../apis';
import jwtDecode from 'jwt-decode';

import { SET_APP_LOADING, SET_USER_TOKEN, SET_AUTH_USER, SINGIN_USER } from '../constants';

function* singInF({ payload }) {
	yield put({
		type: SET_APP_LOADING,
		payload: true
	});
	let query = `
    query singInQuery(
      $email:String!
      $password:String!
    ){
      singIn(
        email: $email
        password: $password
      ){
        message
        statusCode
        data
      }
    }
  `;
	let data;
	try {
		data = yield call(api, query, payload.variables);
	} catch (e) {
		console.log('Error deleteAreaF', e);
	}
	if (data.singIn.statusCode == 200) {
		yield put({
			type: SET_USER_TOKEN,
			payload: data.singIn.data.token
		});
		yield put({
			type: SET_AUTH_USER,
			payload: jwtDecode(data.singIn.data.token)
		});
	}
	payload.callback(data.singIn.statusCode);
	yield put({
		type: SET_APP_LOADING,
		payload: true
	});
}

export default [ takeLatest(SINGIN_USER, singInF) ];
