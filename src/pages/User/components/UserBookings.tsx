import List from 'antd/lib/list'
import Paragraph from 'antd/lib/typography/Paragraph'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import { ListingCard } from 'Components';
import { IBookings } from '__generated__/graphql'
import { get } from 'lodash'
import React, { FC } from 'react'

interface IProps {
	userBookings: IBookings
	bookingsPage: number
	setBookingsPage: (page: number) => void
	limit: number
}

export const UserBookings: FC<IProps> = ({
	bookingsPage,
	limit,
	setBookingsPage,
	userBookings,
}) => {
	const total = get(userBookings, 'total', null)
	const result = get(userBookings, 'result', null)

	const userBookingsList = userBookings && (
		<List
			grid={{
				gutter: 8,
				xs: 1,
				sm: 2,
				lg: 4,
			}}
			dataSource={result || undefined}
			locale={{ emptyText: "You haven't made any bookings!" }}
			pagination={{
				position: 'top',
				current: bookingsPage,
				total: total || undefined,
				defaultPageSize: limit,
				hideOnSinglePage: true,
				showLessItems: true,
				onChange: setBookingsPage,
			}}
			renderItem={userBooking => {
				const bookingHistory = (
					<div className='user-booking__booking-history'>
						<div>
							Check in: <Text strong>{userBooking.checkIn}</Text>
						</div>
						<div>
							Check out: <Text strong>{userBooking.checkOut}</Text>
						</div>
					</div>
				)

				return (
					<List.Item>
						{bookingHistory}
						<ListingCard listing={userBooking.listing} />
					</List.Item>
				)
			}}
		/>
	)

	return userBookingsList ? (
		<div className='user-bookings'>
			<Title level={4} className='user-bookings__title'>
				Bookings
			</Title>
			<Paragraph className='user-bookings__description'>
				This section highlights the bookings you've made, and the
				check-in/check-out dates associated with that bookings.
			</Paragraph>
			{userBookingsList}
		</div>
	) : null
}
