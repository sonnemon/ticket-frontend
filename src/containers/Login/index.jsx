import React, { Component } from 'react';

import { connect } from 'react-redux';
import { singIn } from '../../actions';
import { appSelector } from '../../selectors';
import { push } from 'connected-react-router';
import { LoginForm } from '../../components/Login/LoginForm';
import { useCustomNotification } from '../../hooks/useNotification';

class Login extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (this.props.userToken) {
			this.props.push('/');
		}
	}
	onSubmit(fields) {
		this.props.singIn({
			variables: fields,
			callback: (statusCode) => {
				if (statusCode == 400) {
					useCustomNotification({
						title: 'SingIn failed!',
						message: 'Usuario o contraseña errornea.',
						type: 'danger',
						container: 'top-center'
					});
				} else if (statusCode == 200) {
					this.props.push('/');
				}
			}
		});
	}
	render() {
		return (
			<section className="hero is-dark is-fullheight">
				<div className="hero-body">
					<div className="container has-text-centered">
						<div className="column is-4 is-offset-4">
							<h3 className="title has-text-white">Login</h3>
							<LoginForm isLoading={false} onSubmit={this.onSubmit.bind(this)} />
						</div>
					</div>
				</div>
			</section>
		);
	}
}

const mapDispatchToProps = { singIn, push };
const mapStateToProps = (state) => {
	const { userToken } = appSelector(state);
	return {
		userToken
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
