import React from 'react';
import Button from '../Button';

export const Modal = ({ title, callback, children }) => {
	return (
		<div className={`modal is-active`}>
			<div className="modal-background" />
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">{title}</p>
					<button className="delete" aria-label="close" onClick={() => callback(false)} />
				</header>
				<section className="modal-card-body">{children}</section>
				<footer className="modal-card-foot">
					<div className="buttons is-right is-fullwidth">
						<Button className="is-danger" label="Cancelar" onClick={() => callback(false)} />
						<Button className="is-success" label="Aceptar" onClick={() => callback(true)} />
					</div>
				</footer>
			</div>
		</div>
	);
};
