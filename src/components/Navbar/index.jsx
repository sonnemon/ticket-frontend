import React from 'react';
import Button from '../Button';
// import Logo from '../logo';
export const Navbar = ({ logout }) => {
	return (
		<nav className="navbar is_background_black" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="#">
					<div>{/* <Logo height={'50'} width={'200'} /> */}</div>
				</a>
				<a
					role="button"
					className="navbar-burger burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample"
				>
					<span aria-hidden="true" />
					<span aria-hidden="true" />
					<span aria-hidden="true" />
				</a>
			</div>
			<div className="navbar-end">
				<div className="navbar-item">
					<div className="buttons">
						<Button label="Logout" className={`is-danger is-light`} onClick={logout} />
					</div>
				</div>
			</div>
		</nav>
	);
};
