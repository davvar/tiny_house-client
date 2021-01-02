import { useQuery } from '@apollo/client';
import { Col, Layout, Row } from 'antd';
import { ErrorBanner, PageSkeleton } from 'Components';
import { LISTING } from 'graphql/queries';
import { get } from 'lodash';
import { Moment } from 'moment';
import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
	ListingBookings,
	ListingCreateBookings,
	ListingDetails
} from './components';

const { Content } = Layout

interface IMatchParams {
	id: string
}

interface IProps extends RouteComponentProps<IMatchParams> {}

const PAGE_LIMIT = 3

export const Listing: FC<IProps> = ({ match }) => {
	const [bookingsPage, setBookingsPage] = useState(1)
	const [checkInDate, setCheckInDate] = useState<Moment | null>(null)
	const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null)

	const { data, loading, error } = useQuery<IListingQuery ,IListingQueryVariables>(LISTING, {
		variables: {
			bookingsPage,
			id: match.params.id,
			limit: PAGE_LIMIT,
		},
	})

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
					{listing && <ListingDetails listing={listing as IListing} />}
					{listingBookings && (
						<ListingBookings
							bookingsPage={bookingsPage}
							limit={PAGE_LIMIT}
							setBookingsPage={setBookingsPage}
							listingBookings={listingBookings as IBookings}
						/>
					)}
				</Col>
				{listing && (
					<Col xs={24} lg={10}>
						<ListingCreateBookings
							checkInDate={checkInDate}
							checkOutDate={checkOutDate}
							setCheckInDate={setCheckInDate}
							setCheckOutDate={setCheckOutDate}
							price={listing.price}
						/>
					</Col>
				)}
			</Row>
		</Content>
	)
}
