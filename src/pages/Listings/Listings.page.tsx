import { gql } from 'apollo-boost'
import React, { FC } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { Listings as ListingsData } from './__generated__/Listings'
import {
	DeleteListing as DeleteListingData,
	DeleteListingVariables,
} from './__generated__/DeleteListing'
import 'styles/Listings.css'
import { Alert, Avatar, Button, List, Spin } from 'antd'
import { ListingsSkeleton } from './components/ListingsSkeleton';

const LISTINGS = gql`
	query Listings {
		listings {
			id
			title
			image
			address
			price
			numOfGuests
			numOfBeds
			numOfBaths
			rating
		}
	}
`

const DELETE_LISTINGS = gql`
	mutation DeleteListing($id: ID!) {
		deleteListing(id: $id) {
			id
		}
	}
`

interface IProps {
	title: string
}

export const Listings: FC<IProps> = ({ title }) => {
	const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS)
	const [
		deleteListing,
		{ loading: deleteListingLoading, error: deleteListingError },
	] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTINGS)

	const onDeleteListing = (id: string) => async () => {
		await deleteListing({ variables: { id } })
		refetch()
	}

	const listings = data ? data.listings : null
	const listingsList = listings && (
		<List
			itemLayout='horizontal'
			dataSource={listings}
			renderItem={({ title, address, image, id }) => (
				<List.Item
					actions={[
						<Button type='primary' onClick={onDeleteListing(id)}>
							Delete
						</Button>,
					]}
				>
					<List.Item.Meta
						title={title}
						description={address}
						avatar={<Avatar src={image} shape='square' size={48} />}
					/>
				</List.Item>
			)}
		/>
	)

	if (error) {
		return (
			<div className='listings'>
				<ListingsSkeleton error title={title} />
			</div>
		)
	}

	if (loading) {
		return (
			<div className='listings'>
				<ListingsSkeleton title={title} />
			</div>
		)
	}

	const deleteListingErrorAlert = deleteListingError && (
		<Alert
			type='error'
			message='Something went wrong - please try again later'
			className='listings_alert'
		/>
	)

	return (
		<div className='listings'>
			<Spin spinning={deleteListingLoading}>
				{deleteListingErrorAlert}
				<h2>{title}</h2>
				{listingsList}
			</Spin>
		</div>
	)
}

export default Listings
