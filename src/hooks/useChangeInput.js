import React, { useState } from 'react';

export const useInputValue = (initialValue) => {
	let [ value, setValue ] = useState(initialValue);
	const onChange = ({ value }) => setValue(value);
	return { value, onChange };
};
