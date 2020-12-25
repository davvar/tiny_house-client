import React, { FC } from 'react'
import { server } from '../../lib/api'
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
	const fetchListings = async () => {
		const { data } = await server.fetch<ListingsData>({ query: LISTINGS })
		console.log(data);

		return data
	}

	const deleteListing = async () => {
		const { data } = await server.fetch<
		DeleteListingsData,
		DeleteListingsVariables
		>({ query: DELETE_LISTINGS, variables: { id: '5fe5edda60c60166a71dc15c' } })

		console.log(data);
		return data
	}

	return (
		<div>
			<h2>{title}</h2>
			<button onClick={fetchListings}>Query Listings</button>
			<button onClick={deleteListing}>Delete a Listing</button>
		</div>
	)
}

export default Listings
