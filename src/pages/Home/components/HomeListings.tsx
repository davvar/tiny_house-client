import { List, Typography } from 'antd';
import { ListingCard } from 'Components';
import React, { FC } from 'react';

interface IProps {
	listings: IListingsQuery['listings']['result']
	title: string
}

export const HomeListings: FC<IProps> = ({ listings, title }) => {
	return (
		<div className='home-listings'>
			<Typography.Title level={4} className='home-listings__title'>
				{title}
			</Typography.Title>
			<List
				grid={{
					gutter: 8,
					xs: 1,
					sm: 2,
					lg: 4,
					column: 4
				}}
				dataSource={listings}
				renderItem={listing => (
					<List.Item>
						<ListingCard listing={listing} />
					</List.Item>
				)}
			/>
		</div>
	)
}
