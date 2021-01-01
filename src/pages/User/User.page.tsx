import { Col, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { IBookings, IListings, IUser, IViewer, useUserQuery } from '__generated__/graphql'
import { get } from 'lodash'
import React, { FC, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { PageSkeleton, ErrorBanner } from '../../Components'
import { UserBookings, UserListings, UserProfile } from './components'

const PAGE_LIMIT = 4

interface IMatchParams {
	id: string
}

interface IProps extends RouteComponentProps<IMatchParams> {
	viewer: IViewer
}

export const User: FC<IProps> = ({ viewer, match }) => {
	const [listingsPage, setListingsPage] = useState(1)
	const [bookingsPage, setBookingsPage] = useState(1)

	const { data, loading, error } = useUserQuery({
		variables: {
			id: match.params.id,
			bookingsPage,
			listingsPage,
			limit: PAGE_LIMIT,
		},
	})

	if (loading) {
		return (
			<Content className='user'>
				<PageSkeleton />
			</Content>
		)
	}

	if (error) {
		return (
			<Content className='user'>
				<ErrorBanner description='This user may not exist.' />
				<PageSkeleton />
			</Content>
		)
	}

	const user = get(data, 'user', null)
	const viewerIsUser = viewer.id === user?.id

	const userListings = get(user, 'listings', null)
	const userBookings = get(user, 'bookings', null)

	const userListingsElement = userListings && (
		<UserListings
			setListingsPage={setListingsPage}
			listingsPage={listingsPage}
			userListings={userListings as IListings}
			limit={PAGE_LIMIT}
		/>
	)
	const userBookingsElement = userBookings && (
		<UserBookings
			setBookingsPage={setBookingsPage}
			bookingsPage={bookingsPage}
			userBookings={userBookings as IBookings}
			limit={PAGE_LIMIT}
		/>
	)

	const userProfileElement = user ? (
		<UserProfile viewerIsUser={viewerIsUser} user={user as IUser} />
	) : null

	return (
		<Content className='user'>
			<Row gutter={12} justify='space-between'>
				<Col xs={24}>{userProfileElement}</Col>
				<Col xs={24}>
					{userListingsElement}
					{userBookingsElement}
				</Col>
			</Row>
		</Content>
	)
}
