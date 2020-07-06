import React, { useState } from 'react';
import Input from '../Input';
export default function Search({ callback }) {
	let [ text, setText ] = useState('');
	let [ timeout, setTime ] = useState('');
	return (
		<Input
			icon="search"
			name="label"
			placeholder="Buscar..."
			value={text}
			onChange={({ value, name }) => {
				setText(value);
				if (value.length > 3 || value == '') {
					if (timeout) {
						clearTimeout(timeout);
					}
					setTime(
						setTimeout(() => {
							setTimeout(() => {
								callback(value);
							}, 300);
						}, 500)
					);
				}
			}}
		/>
	);
}
