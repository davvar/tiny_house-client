import { Card, List } from 'antd';
import listingLoadingCover from 'assets/images/listing-loading-card-cover.jpg';
import React, { FC } from 'react';

interface IProps {
	cardsCount?: number
}

export const ListingsSkeleton: FC<IProps> = ({ children, cardsCount = 4 }) => {
	const emptyData = Array(cardsCount).fill({})

	return (
		<div className='home-listings-skeleton'>
			{children}
			<List
				grid={{ gutter: 8, xs: 1, sm: 2, lg: 4, column: 4 }}
				dataSource={emptyData}
				renderItem={() => (
					<List.Item>
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
