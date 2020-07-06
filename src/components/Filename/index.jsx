import React, { useState } from 'react';
import { Cropper } from '../Croper';
export const Filename = ({ callback, currentImage }) => {
	const [ rawImage, setImage ] = useState('');
	const [ inputRef, setInputRef ] = useState('');
	if (currentImage) {
		currentImage = `${URL_BASE_API}${currentImage}`;
	}
	const [ imagePreview, setImagePreview ] = useState(currentImage);
	const [ cropperIsOpen, setCropperOpen ] = useState(false);
	const handleChangeimage = async (_e) => {
		setImage(URL.createObjectURL(_e.target.files[0]));
		setCropperOpen(!cropperIsOpen);
	};
	const handleCallbackCropper = (isSuccess, image = null) => {
		if (isSuccess) {
			setImagePreview(URL.createObjectURL(image));
			setCropperOpen(!cropperIsOpen);
			callback(image);
			inputRef.value = null;
		} else {
			setCropperOpen(!cropperIsOpen);
		}
	};
	return (
		<div className="field">
			<section className="section">
				<figure className="image is-256x256 has-centered is-clearfix">
					<img
						src={
							imagePreview || 'https://forexbonuslab.com/wp-content/uploads/2019/04/no-logo-available.gif'
						}
						alt="Placeholder image"
					/>
				</figure>
			</section>
			<label className="upload control">
				<div className="upload-draggable is-full-width is-primary">
					<section className="section">
						<div className="content has-text-centered">
							<p>
								<span className="icon is-large">
									{' '}
									<i className="fas fa-upload" />
								</span>
							</p>
							<p>Arrastre aqui las imagenes que quiera subir</p>
						</div>
					</section>
				</div>{' '}
				<input type="file" onChange={handleChangeimage} ref={(inputRef) => setInputRef(inputRef)} />
			</label>
			{/* {this.renderListImages()} */}
			{/* {this.props.isGallery && <div className="has-margin-top-20">{this.renderInputs()}</div>} */}
			{cropperIsOpen && <Cropper image={rawImage} callback={handleCallbackCropper} />}
		</div>
	);
};
