import { Col, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { get } from 'lodash'
import React, { FC, useState } from 'react'
import { useQuery } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { PageSkeleton, ErrorBanner } from '../../Components'
import { USER } from '../../graphql/queries'
import {
	User as IUserData,
	UserVariables as IUserVariables,
} from '../../graphql/queries/User/__generated__/User'

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
	const { data, loading, error } = useQuery<IUserData, IUserVariables>(USER, {
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
			userListings={userListings}
			limit={PAGE_LIMIT}
		/>
	)
	const userBookingsElement = userBookings && (
		<UserBookings
			setBookingsPage={setBookingsPage}
			bookingsPage={bookingsPage}
			userBookings={userBookings}
			limit={PAGE_LIMIT}
		/>
	)

	const userProfileElement = user ? (
		<UserProfile viewerIsUser={viewerIsUser} user={user} />
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
