import { Pagination } from 'antd';
import React, { FC } from 'react';

interface IProps {
	total: number
	pageSize: number
	page: number
	setPage: (page: number) => void
}

export const ListingsPagination: FC<IProps> = ({
	pageSize,
	page,
	setPage,
	total,
}) => {
	return (
		<Pagination
			hideOnSinglePage
			showLessItems
			current={page}
			total={total}
			defaultPageSize={pageSize}
			onChange={setPage}
			className='listings-pagination'
		/>
	)
}
