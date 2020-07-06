import React from 'react';
import PropTypes from 'prop-types';

function renderError(error, errRel = false) {
	if (typeof error == 'string')
		return (
			<span className={'_select_error_container'}>
				<span style={errRel ? { position: 'relative', bottom: '0' } : {}} className={'_select_error'}>
					{error}
				</span>
			</span>
		);
	return null;
}

export default function Select({ options = [], className = '', name = 'select', value = 0, onChange, error = null }) {
	return (
		<div className="field">
			<div className="control">
				<div className={`select ${className}`}>
					<select
						name={name}
						onChange={(e) =>
							onChange(e, {
								name: e.target.name,
								value: e.target.value
							})}
						className={value == 'default' ? 'first' : ''}
						value={value}
					>
						{options.map((item, idx) => {
							return (
								<option key={`option_${item.key}`} value={item.value}>
									{item.text}
								</option>
							);
						})}
					</select>
				</div>
				{renderError(error)}
			</div>
		</div>
	);
}
