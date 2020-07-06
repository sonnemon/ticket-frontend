import React, { PureComponent } from 'react';
import lodash from 'lodash';
import PaginationItem from './Item';
import Button from '../Button';

class Pagination extends PureComponent {
	onPrev() {
		if (this.props.currentPage > 1) {
			this.props.onChangePage(this.props.currentPage - 1);
		}
	}

	onNext() {
		if (this.props.currentPage !== this.props.totalPages) {
			this.props.onChangePage(this.props.currentPage + 1);
		}
	}

	createSimpleRange(start, end, pageFactory) {
		const pages = lodash.map(lodash.range(start, end + 1), pageFactory);
		return pages;
	}
	createComplexRange(options, pageFactory) {
		const { activePage, boundaryRange, hideEllipsis, siblingRange, totalPages } = options;

		const ellipsisSize = hideEllipsis ? 0 : 1;
		const firstGroupEnd = boundaryRange;
		const firstGroup = this.createSimpleRange(1, firstGroupEnd, pageFactory);
		// console.log("first", firstGroup)
		const lastGroupStart = totalPages + 1 - boundaryRange;
		const lastGroup = this.createSimpleRange(lastGroupStart, totalPages, pageFactory);

		const innerGroupStart = Math.min(
			Math.max(activePage - siblingRange, firstGroupEnd + ellipsisSize + 1),
			lastGroupStart - ellipsisSize - 2 * siblingRange - 1
		);
		const innerGroupEnd = innerGroupStart + 2 * siblingRange;
		const innerGroup = this.createSimpleRange(innerGroupStart, innerGroupEnd, pageFactory);
		// console.log("inner", innerGroup)
		// console.log("last", lastGroup)
		return [
			...firstGroup,
			!hideEllipsis && this.createInnerPrefix(firstGroupEnd, innerGroupStart, pageFactory),
			// ellipsisSize,
			...innerGroup,
			!hideEllipsis && this.createInnerSuffix(innerGroupEnd, lastGroupStart, pageFactory),
			// ellipsisSize,
			...lastGroup
			// ].filter(Boolean)
		];
	}
	createInnerPrefix = (firstGroupEnd, innerGroupStart, pageFactory) => {
		const prefixPage = innerGroupStart - 1;
		const showEllipsis = prefixPage !== firstGroupEnd + 1;
		const prefixFactory = showEllipsis ? createEllipsisItem : pageFactory;

		return prefixFactory(prefixPage);
	};
	createInnerSuffix = (innerGroupEnd, lastGroupStart, pageFactory) => {
		const suffixPage = innerGroupEnd + 1;
		const showEllipsis = suffixPage !== lastGroupStart - 1;
		const suffixFactory = showEllipsis ? createEllipsisItem : pageFactory;

		return suffixFactory(suffixPage);
	};

	createPageFactory = (activePage) => (pageNumber) => ({
		active: activePage === pageNumber,
		type: 'pageItem',
		value: pageNumber
	});

	isSimplePagination = ({ boundaryRange, hideEllipsis, siblingRange, totalPages }) => {
		const boundaryRangeSize = 2 * boundaryRange;
		const ellipsisSize = hideEllipsis ? 0 : 2;
		const siblingRangeSize = 2 * siblingRange;

		return 1 + ellipsisSize + siblingRangeSize + boundaryRangeSize >= totalPages;
	};

	renderPages() {
		const { totalPages, currentPage } = this.props;
		const pageFactory = this.createPageFactory(currentPage);
		const options = {
			activePage: currentPage,
			boundaryRange: 3,
			hideEllipsis: true,
			siblingRange: 2,
			totalPages: totalPages
		};
		const pages = this.isSimplePagination(options)
			? this.createSimpleRange(1, options.totalPages, pageFactory)
			: this.createComplexRange(options, pageFactory);
		return pages.map((page, idx) => {
			if (!page) {
				return <PaginationItem key={`page_${idx}`} isEllipsis={true} />;
			}
			return (
				<PaginationItem
					onChangePage={this.props.onChangePage}
					key={`page_${idx}`}
					active={page.active}
					page={page.value}
					isEllipsis={false}
				/>
			);
		});
	}
	render() {
		return (
			<nav className="pagination is-centered" role="navigation" aria-label="pagination">
				<Button
					label="Anterior"
					className="pagination-previous"
					disabled={this.props.currentPage == 1 ? true : false}
					onClick={this.onPrev.bind(this)}
				/>
				<Button
					label="Siguiente"
					className="pagination-next"
					disabled={this.props.currentPage !== this.props.totalPages ? false : true}
					onClick={this.onNext.bind(this)}
				/>
				<ul className="pagination-list">{this.renderPages()}</ul>
			</nav>
		);
	}
}

export default Pagination;
