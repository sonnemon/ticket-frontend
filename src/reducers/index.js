import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import app from './app';
import company from './company';

export default (history) =>
	combineReducers({
		router: connectRouter(history),
		app,
		company
	});
