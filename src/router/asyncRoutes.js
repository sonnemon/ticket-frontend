import React from 'react';
import Loadable from 'react-loadable';

const withLoader = (loader) => ({
	...loader,
	loading: () => (
		<div className="pageloader is-active is-dark">
			<span className="title">Cargando...</span>
		</div>
	)
});

export const Home = Loadable(
	withLoader({
		loader: () => import(/* webpackChunkName: "home" */ '../containers/Home')
	})
);

export const Company = Loadable(
	withLoader({
		loader: () => import(/* webpackChunkName: "company" */ '../containers/Company')
	})
);

export const Login = Loadable(
	withLoader({
		loader: () => import(/* webpackChunkName: "company" */ '../containers/Login')
	})
);
