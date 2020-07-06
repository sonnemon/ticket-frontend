import React from 'react';
import Button from '../Button';

export const Confirm = ({ text, callback }) => {
	return (
		<div className="modal is-active">
			<div className="modal-background" />
			<div className="modal-content">
				<div className="box">
					<article className="media">
						<div className="media-content">
							<div className="content has-text-centered">
								<p>{text || ''}</p>
								<div className="buttons is-centered">
									<Button className="is-danger" label="Cancelar" onClick={() => callback(false)} />
									<Button className="is-info" label="Aceptar" onClick={() => callback(true)} />
								</div>
							</div>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
};
