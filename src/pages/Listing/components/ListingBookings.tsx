import { Avatar, Divider, List, Typography } from 'antd';
import { get } from 'lodash';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IBookings } from '__generated__/graphql';

const { Text, Title } = Typography

interface IProps {
	listingBookings: IBookings
	bookingsPage: number
	setBookingsPage: (page: number) => void
	limit: number
}

export const ListingBookings: FC<IProps> = ({
	bookingsPage,
	limit,
	setBookingsPage,
	listingBookings,
}) => {
	const total = get(listingBookings, 'total', null)
	const result = get(listingBookings, 'result', null)

	const listingBookingsList = listingBookings && (
		<List
			grid={{
				gutter: 8,
				xs: 1,
				sm: 2,
				lg: 3,
			}}
			dataSource={result || undefined}
			locale={{ emptyText: 'No bookings have been made yet' }}
			pagination={{
				current: bookingsPage,
				total: total || undefined,
				defaultPageSize: limit,
				hideOnSinglePage: true,
				showLessItems: true,
				onChange: setBookingsPage,
			}}
			renderItem={listingBooking => {
				const bookingHistory = (
					<div className='listing-booking__history'>
						<div>
							Check in: <Text strong>{listingBooking.checkIn}</Text>
						</div>
						<div>
							Check out: <Text strong>{listingBooking.checkOut}</Text>
						</div>
					</div>
				)

				return (
					<List.Item>
						{bookingHistory}
						<Link to={`/user/${listingBooking.tenant.id}`}>
							<Avatar
								src={listingBooking.tenant.avatar}
								size={64}
								shape='square'
							/>
						</Link>
					</List.Item>
				)
			}}
		/>
	)

	return listingBookingsList ? (
		<div className='listing-bookings'>
			<Divider />
			<div className='listing-booking__section'>
				<Title level={4}>Bookings</Title>
			</div>
			{listingBookingsList}
		</div>
	) : null
}
