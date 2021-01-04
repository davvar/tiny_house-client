import { useQuery } from '@apollo/client';
import { Layout, List, Skeleton, Typography } from 'antd';
import { ErrorBanner, ListingCard } from 'Components';
import { LISTINGS } from 'graphql/queries';
import { get } from 'lodash';
import React, { FC, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { listingsFilter } from 'utils';
import { ListingsSkeleton } from '.';

const { Title, Paragraph, Text } = Typography

interface IMatchParams {
	location: string
}

interface IProps extends RouteComponentProps<IMatchParams> {}

const { Content } = Layout
const PAGE_LIMIT = 8

export const Listings: FC<IProps> = ({ match }) => {
	const [listingsPage, setListingsPage] = useState(1)
	const { data, loading, error } = useQuery<
		IListingsQuery,
		IListingsQueryVariables
	>(LISTINGS, {
		variables: {
			location: match.params.location,
			filter: listingsFilter.PRICE_HIGH_TO_LOW,
			limit: PAGE_LIMIT,
			listingsPage,
		},
	})

	if (error) {
		return (
			<>
				<ErrorBanner description="We either couldn't find anything matching your search or have encountered an error. If you're searching for a unique location, try searching again with more common keywords." />
				<Content className='listings'>
					<ListingsSkeleton cardsCount={PAGE_LIMIT}>
						<Skeleton paragraph={{ rows: 1 }} active />
					</ListingsSkeleton>
				</Content>
			</>
		)
	}

	if (loading) {
		return (
			<Content className='listings'>
				<ListingsSkeleton cardsCount={PAGE_LIMIT}>
					<Skeleton paragraph={{ rows: 1 }} active />
				</ListingsSkeleton>
			</Content>
		)
	}

	const listings = get(data, 'listings', null)

	const listingsRegionElement = listings?.region && (
		<Title level={3} className='listings__title'>
			Results for {listings?.region}
		</Title>
	)

	const listingsSectionElement =
		listings && listings.result.length ? (
			<List
				grid={{ column: 4, gutter: 8, xs: 1, sm: 2, lg: 4 }}
				dataSource={listings.result}
				renderItem={listing => (
					<List.Item>
						<ListingCard listing={listing} />
					</List.Item>
				)}
			/>
		) : (
			<div>
				<Paragraph>
					It appears that no listings have ye been created for this
					<Text mark>"{listings?.region}"</Text>
				</Paragraph>
				<Paragraph>
					Be the first person to create a{' '}
					<Link to='/host'>listing in this area</Link>!
				</Paragraph>
			</div>
		)

	return (
		<Content className='listings'>
			{listingsRegionElement}
			{listingsSectionElement}
		</Content>
	)
}
