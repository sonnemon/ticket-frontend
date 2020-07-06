import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {} from '../actions';
import { push } from 'connected-react-router';
import { Home, Company, Login } from './asyncRoutes';
import { appSelector } from '../selectors';

class RouterApp extends React.Component {
	render() {
		return (
			<Layout {...this.props}>
				<Switch>
					<Route path={'/'} component={() => <Home />} exact />
					<Route path={'/company'} component={() => <Company />} exact />
					<Route path={'/login'} component={() => <Login />} exact />
				</Switch>
			</Layout>
		);
	}
}

export const Layout = withRouter((props) => {
	return <Fragment>{props.children}</Fragment>;
});

const mapStateToProps = (state) => {
	const {} = appSelector(state);
	return {};
};

export default connect(mapStateToProps, {
	push
})(RouterApp);
