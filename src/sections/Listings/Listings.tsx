import { gql } from 'apollo-boost'
import React, { FC } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { Listings as ListingsData } from './__generated__/Listings'
import {
	DeleteListing as DeleteListingData,
	DeleteListingVariables,
} from './__generated__/DeleteListing'

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

	const onDeleteListing = (id: string) => () => {
		deleteListing({ variables: { id } }).then(refetch)
	}

	const listings = data ? data.listings : null
	const listingsList = (
		<ul>
			{listings?.map(listing => (
				<li key={listing.id}>
					{listing.title}
					<button onClick={onDeleteListing(listing.id)}>
						Delete a Listing
					</button>
				</li>
			))}
		</ul>
	)

	if (error) {
		return <h1>Something went wrong...</h1>
	}

	if (loading) {
		return <h1>Loading...</h1>
	}

	const deleteListingLoadingMessage = deleteListingLoading ? (
		<h4>Deletion in progress...</h4>
	) : null

	const deleteListingErrorMessage = deleteListingError ? (
		<h4>Something went wrong - please try again later</h4>
	) : null

	return (
		<div>
			<h2>{title}</h2>
			{listingsList}
			{deleteListingErrorMessage}
			{deleteListingLoadingMessage}
		</div>
	)
}

export default Listings
