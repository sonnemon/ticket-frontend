import React from 'react';

export const Switch = (props) => {
	return (
		<div className="field">
			<input
				type="checkbox"
				name={props.name}
				className={`switch is-rounded is-outlined ${props.className ? props.className : ''}`}
				checked={props.value}
				onChange={(_e) => {
					props.onChange({
						name: props.name,
						value: !props.value
					});
				}}
			/>
			<label
				htmlFor="switchRoundedDefault"
				onClick={() => {
					if (props.onChange) {
						props.onChange({
							name: props.name,
							value: !props.value
						});
					}
				}}
			>
				{(props.labels || []).length > 1 && (props.value ? props.labels[0] || '' : props.labels[1] || '')}
			</label>
		</div>
	);
};
