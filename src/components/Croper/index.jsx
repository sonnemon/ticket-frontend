import React, { useState } from 'react';
import CropperImage from 'react-cropper';
import { Modal } from '../Modal';
import Button from '../Button';

export const Cropper = ({ image, callback }) => {
	const [ cropper, setCropper ] = useState(React.createRef(null));
	const callbackModal = async (isSucces) => {
		if (isSucces) {
			const imageCropped = cropper.getCroppedCanvas().toDataURL();
			const res = await fetch(imageCropped);
			const blob = await res.blob();
			callback(isSucces, new File([ blob ], 'File name', { type: 'image/png' }));
		} else {
			callback(isSucces);
		}
	};
	return (
		<Modal title="Seleccione el area a mostrar" callback={callbackModal}>
			<div className="section">
				<CropperImage
					ready={() => {}}
					autoCropArea={10}
					style={{
						height: 350,
						width: 350,
						margin: 'auto',
						border: '1px solid'
					}}
					aspectRatio={1}
					guides={true}
					dragMode={'crop'}
					src={image}
					ref={(cropper) => {
						setCropper(cropper);
					}}
				/>
			</div>
			<div className="buttons has-addons is-centered">
				<Button
					className="is-dark"
					icon="expand"
					onClick={() =>
						cropper.setCropBoxData({
							width: 350,
							height: 350,
							left: 0,
							top: 0
						})}
				/>
				<Button className="is-dark" icon="search-minus" onClick={() => cropper.zoom('-0.1')} />
				<Button className="is-dark" icon="search-plus" onClick={() => cropper.zoom('0.1')} />
				<Button className="is-dark" icon="redo" onClick={() => cropper.reset()} />
			</div>
		</Modal>
	);
};
