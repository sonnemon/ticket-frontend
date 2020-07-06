import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Layout from '../Layout';

class Home extends PureComponent {
	render() {
		return (
			<Layout>
				<div>xD</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, {})(Home);
