import { List, Typography } from 'antd';
import React, { FC } from 'react';
import { ListingCard } from '../../../Components';

const { Paragraph, Title } = Typography

interface IProps {
	userListings: IListings
	listingsPage: number
	setListingsPage: (page: number) => void
	limit: number
}

export const UserListings: FC<IProps> = ({
	limit,
	listingsPage,
	setListingsPage,
	userListings,
}) => {
	const { result, total } = userListings

	const userListingsList = (
		<List
			grid={{
				gutter: 8,
				column: 4,
				xs: 1,
				sm: 2,
				lg: 4,
			}}
			dataSource={result}
			locale={{ emptyText: "User doesn't have any listings yet" }}
			pagination={{
				position: 'top',
				current: listingsPage,
				total,
				defaultPageSize: limit,
				hideOnSinglePage: true,
				showLessItems: true,
				onChange: setListingsPage,
			}}
			renderItem={userListing => (
				<List.Item>
					<ListingCard listing={userListing} />
				</List.Item>
			)}
		/>
	)

	return (
		<div className='user-listings'>
			<Title level={4} className='user-listings__title'>
				Listings
			</Title>
			<Paragraph className='user-listings__description'>
				This section highlights the listings this user currently hosts and has
				made available for bookings.
			</Paragraph>
			{userListingsList}
		</div>
	)
}
