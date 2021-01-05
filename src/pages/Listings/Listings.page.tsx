import { useQuery } from '@apollo/client';
import { Affix, Layout, List, Skeleton, Typography } from 'antd';
import { ErrorBanner, ListingCard } from 'Components';
import { LISTINGS } from 'graphql/queries';
import { get } from 'lodash';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { listingsFilter } from 'utils';
import { ListingsSkeleton } from '.';
import { ListingsPagination } from './components';
import { ListingsFilters } from './components/ListingsFilters';

const { Title, Paragraph, Text } = Typography

interface IMatchParams {
	location: string
}

interface IProps extends RouteComponentProps<IMatchParams> {}

const { Content } = Layout
const PAGE_LIMIT = 8

export const Listings: FC<IProps> = ({ match }) => {
	const locationRef = useRef(match.params.location)
	const [filter, setFilter] = useState(listingsFilter.PRICE_LOW_TO_HIGH)
	const [page, setPage] = useState(1)
	const { data, loading, error } = useQuery<
		IListingsQuery,
		IListingsQueryVariables
	>(LISTINGS, {
		skip: locationRef.current !== match.params.location && page !== 1,
		variables: {
			location: match.params.location,
			listingsPage: page,
			limit: PAGE_LIMIT,
			filter,
		},
	})

	useEffect(() => {
		setPage(1)
		locationRef.current = match.params.location
	}, [match.params.location])

	if (loading || error) {
		return (
			<>
				{error && (
					<ErrorBanner description="We either couldn't find anything matching your search or have encountered an error. If you're searching for a unique location, try searching again with more common keywords." />
				)}
				<Content className='listings'>
					<ListingsSkeleton cardsCount={PAGE_LIMIT}>
						<Skeleton paragraph={{ rows: 1 }} active />
					</ListingsSkeleton>
				</Content>
			</>
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
			<div>
				<Affix offsetTop={64}>
					<ListingsPagination
						pageSize={PAGE_LIMIT}
						total={listings.total}
						page={page}
						setPage={setPage}
					/>
					<ListingsFilters filter={filter} setFilter={setFilter} />
				</Affix>
				<List
					grid={{ column: 4, gutter: 8, xs: 1, sm: 2, lg: 4 }}
					dataSource={listings.result}
					renderItem={listing => (
						<List.Item>
							<ListingCard listing={listing} />
						</List.Item>
					)}
				/>
			</div>
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
