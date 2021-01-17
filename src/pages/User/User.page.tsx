import { useQuery } from '@apollo/client'
import { Col, Row, Layout } from 'antd'
import { ErrorBanner, PageSkeleton } from 'Components'
import { USER } from 'graphql/queries'
import { get } from 'lodash'
import React, { FC, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useViewer } from 'ViewerContext'
import { UserBookings, UserListings, UserProfile } from './components'

const { Content } = Layout
const PAGE_LIMIT = 4

interface IMatchParams {
	id: string
}

interface IProps extends RouteComponentProps<IMatchParams> {}

export const User: FC<IProps> = ({ match }) => {
	const { viewer, setViewer } = useViewer()
	const [listingsPage, setListingsPage] = useState(1)
	const [bookingsPage, setBookingsPage] = useState(1)

	const { data, loading, error, refetch } = useQuery<IQueryUserArgs>(USER, {
		variables: {
			id: match.params.id,
			bookingsPage,
			listingsPage,
			limit: PAGE_LIMIT,
		},
	})

	const handleUserRefetch = async () => {
		await refetch()
	}

	const stripeError = new URL(window.location.href).searchParams.get(
		'stripe_error'
	)
	const stripeErrorBanner = stripeError && (
		<ErrorBanner description='We had an issue connecting with Stripe. Please try again soon.' />
	)

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
		<UserProfile
			viewerIsUser={viewerIsUser}
			setViewer={setViewer}
			handleUserRefetch={handleUserRefetch}
			user={user as IUser}
		/>
	) : null

	return (
		<Content className='user'>
			{stripeErrorBanner}
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
