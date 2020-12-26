import React, { FC } from 'react'
import { server } from '../../lib/api'
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

	const deleteListing = (id: string) => () => {
		server
			.fetch<DeleteListingsData, DeleteListingsVariables>({
				query: DELETE_LISTINGS,
				variables: { id },
			})
			.then(reFetch)
	}

	const listings = data ? data.listings : null
	const listingsList = (
		<ul>
			{listings?.map(listing => (
				<li key={listing.id}>
					{listing.title}
					<button onClick={deleteListing(listing.id)}>Delete a Listing</button>
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

	return (
		<div>
			<h2>{title}</h2>
			{listingsList}
		</div>
	)
}

export default Listings
