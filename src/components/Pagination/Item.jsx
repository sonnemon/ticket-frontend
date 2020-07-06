import React from 'react';

export default ({ isEllipsis, disabled, page, isNext, isPrev, active, onClick, onChangePage }) => {
	if (isEllipsis) {
		return (
			<li>
				<span className="pagination-ellipsis">&hellip;</span>
			</li>
		);
	}
	return (
		<li onClick={() => onChangePage(page)}>
			<a className={`pagination-link ${active ? 'is-current' : ''}`} aria-label="Goto page 1">
				{page}
			</a>
		</li>
	);
};
