import React, { FC } from 'react'
import { useMutation } from '../../lib/api/useMutation'
import { useQuery } from '../../lib/api/useQuery'
import {
	DeleteListingsData,
	DeleteListingsVariables,
	ListingsData,
} from './types'

const LISTINGS = `
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

const DELETE_LISTINGS = `
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
	const { data, loading, error, reFetch } = useQuery<ListingsData>(LISTINGS)
	const [
		deleteListing,
		{ loading: deleteListingLoading, error: deleteListingError },
	] = useMutation<DeleteListingsData, DeleteListingsVariables>(DELETE_LISTINGS)

	const onDeleteListing = (id: string) => () => {
		deleteListing({ id }).then(reFetch)
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
