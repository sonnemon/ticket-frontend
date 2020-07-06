import React, { PureComponent } from 'react';
import { Navbar } from '../../components/Navbar';
import Menu from '../../components/Menu';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { appSelector } from '../../selectors';
import { logoutUser } from '../../actions';

class Layout extends PureComponent {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (!this.props.userToken) {
			this.props.push('/login');
		}
	}
	handleLogout() {
		this.props.logoutUser();
		this.props.push('/login');
	}
	render() {
		return (
			<div className="layout">
				<section className="section is-paddingless">
					<Navbar logout={this.handleLogout.bind(this)} />
				</section>
				<section className="section is-paddingless is_fullheight">
					<div className="columns is-marginless is_fullheight">
						<Menu />
						<div className="column">
							<div>{this.props.children}</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	const appState = appSelector(state);
	return {
		...appState
	};
};
const mapDispatchToProps = {
	push,
	logoutUser
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
