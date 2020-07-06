import React, { useState } from 'react';
import { Modal } from '../Modal';
import Input from '../Input';
import { Switch } from '../Switch';
import { useInputValue } from '../../hooks/useChangeInput';
import { Filename } from '../Filename';

export const CompanyModal = ({ callback, company }) => {
	const name = useInputValue(company.name || '');
	const status = useInputValue(company.status || false);
	const [ fileImage, setFileImage ] = useState(null);
	const callbackModal = (isSucees) => {
		callback(
			isSucees,
			{ companyId: company.companyId, name: name.value, status: status.value },
			fileImage ? [ fileImage ] : []
		);
	};
	const callbackFile = (fileImage) => {
		setFileImage(fileImage);
	};
	return (
		<Modal title="Crear Copañia" callback={callbackModal}>
			<div className="field">
				<label className="label">Nombre de la compañia</label>
				<Input name="name" icon="building" placeholder={'Ingrese...'} {...name} />
			</div>
			<div className="field">
				<label className="label">Estado</label>
				<div className="control">
					<Switch name="status" className="is-medium" labels={[ 'Activo', 'Inactivo' ]} {...status} />
				</div>
			</div>
			<Filename callback={callbackFile} currentImage={company.img} />
		</Modal>
	);
};
