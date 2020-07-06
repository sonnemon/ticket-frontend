import React from 'react';
export default function Button(props) {
	return (
		<a
			className={`button ${props.className || ''}`}
			onClick={() => {
				props.onClick();
			}}
			disabled={props.disabled || false}
			{...props.tooltip && { ['data-tooltip']: props.tooltip }}
		>
			{props.label && <span>{props.label}</span>}
			{props.icon && (
				<span className="icon is-small">
					<i className={`fas fa-${props.icon}`} />
				</span>
			)}
		</a>
	);
}
