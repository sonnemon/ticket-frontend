import { all } from 'redux-saga/effects';
import app from './app';
import company from './company';

export default function* rootSaga() {
	yield all([ ...app, ...company ]);
}
