import React, { Component } from 'react';
import ReactNotification from 'react-notifications-component';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';
import { ConnectedRouter } from 'connected-react-router';
import watcherSaga from './sagas';
import RouterApp from './router';
import { hot } from 'react-hot-loader/root';

import './utils';
import './styles.scss';
import 'cropperjs/dist/cropper.css';
import 'react-notifications-component/dist/theme.css';

const { store, persistor, sagaMiddleware, history } = configureStore();

class App extends Component {
	constructor(props) {
		super(props);
		sagaMiddleware.run(watcherSaga);
	}
	render() {
		return (
			<Provider store={store}>
				<PersistGate
					persistor={persistor}
					// onBeforeLift={__ASYNC_FUNCTION_BEFORE_REHYDRATE__}
					loading={<div>LOADING...</div>}
				>
					<ConnectedRouter history={history}>
						<ReactNotification />
						<RouterApp />
					</ConnectedRouter>
				</PersistGate>
			</Provider>
		);
	}
}

export default /* istanbul ignore next */ (IS_DEV ? hot(App) : App);
