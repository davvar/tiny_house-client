import React, { FC, useState } from 'react'
import { LISTING } from 'graphql/queries'
import {
	Listing as ListingDate,
	ListingVariables,
} from 'graphql/queries/Listing/__generated__/Listing'
import { useQuery } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { ErrorBanner, PageSkeleton } from 'Components'
import { Content } from 'antd/lib/layout/layout'
import { get } from 'lodash'
import { ListingDetails } from './components/ListingDetails'
import { Col, Row } from 'antd'

interface IMatchParams {
	id: string
}

interface IProps extends RouteComponentProps<IMatchParams> {}

const PAGE_LIMIT = 3

export const Listing: FC<IProps> = ({ match }) => {
	const [bookingsPage, setBookingsPage] = useState(1)

	const { data, loading, error } = useQuery<ListingDate, ListingVariables>(
		LISTING,
		{
			variables: {
				bookingsPage,
				id: match.params.id,
				limit: PAGE_LIMIT,
			},
		}
	)

	if (loading) {
		return (
			<Content className='listing'>
				<PageSkeleton />
			</Content>
		)
	}

	if (error) {
		return (
			<Content className='listing'>
				<ErrorBanner description="This listing may no exist or we've encountered an error. Please try again soon!" />
				<PageSkeleton />
			</Content>
		)
	}

	const listing = get(data, 'listing', null)
	const listingBookings = get(listing, 'bookings', null)

	return (
		<Content className='listing'>
			<Row gutter={24} justify='space-between'>
				<Col xs={24} lg={14}>
					{listing && <ListingDetails listing={listing} />}
				</Col>
			</Row>
		</Content>
	)
}
