import { Card, List, Skeleton } from 'antd';
import listingLoadingCover from 'assets/images/listing-loading-card-cover.jpg';
import React from 'react';

export const HomeListingsSkeleton = () => {
	const emptyData = Array(4).fill({})

	return (
		<div className='home-listings-skeleton'>
			<Skeleton paragraph={{ rows: 0 }} />
			<List
				grid={{
					gutter: 8,
					xs: 1,
					sm: 2,
					lg: 4,
					column: 4
				}}
				dataSource={emptyData}
				renderItem={() => (
					<List.Item >
						<Card
							loading
							cover={
								<div
									style={{ background: `url(${listingLoadingCover})` }}
									className='home-listings-skeleton__card-cover-img'
								></div>
							}
						/>
					</List.Item>
				)}
			/>
		</div>
	)
}
