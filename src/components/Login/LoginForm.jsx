import React from 'react';
import Input from '../Input';
import Button from '../Button';
import { useInputValue } from '../../hooks/useChangeInput';

export const LoginForm = ({ onSubmit, isLoading }) => {
	const email = useInputValue('');
	const password = useInputValue('');
	const onClickForm = () => {
		onSubmit({
			email: email.value,
			password: password.value
		});
	};
	return (
		<div className="box">
			<div className="field">
				<Input placeholder="Email" {...email} />
			</div>
			<div className="field">
				<Input placeholder="Contraseña" type="password" {...password} />
			</div>
			<Button
				label="Login"
				className={`is-info is-large is-fullwidth ${isLoading && 'is-loading'}`}
				onClick={onClickForm}
			/>
		</div>
	);
};
