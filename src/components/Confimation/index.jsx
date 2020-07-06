import React from 'react';
import Button from '../Button';

export default function Confirmation(props) {
	return (
		<div className="modal is-active">
			<div className="modal-background" />
			<div className="modal-content">
				<div className="box">
					<article className="media">
						<div className="media-content">
							<div className="content has-text-centered">
								<p>{props.text || ''}</p>
								<div className="buttons is-centered">
									<Button
										className="is-danger"
										label="Cancelar"
										onClick={() => {
											props.cancel();
										}}
									/>
									<Button
										className="is-info"
										label="Aceptar"
										onClick={() => {
											props.accept();
										}}
									/>
								</div>
							</div>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
}
