import { gql } from '@apollo/client';

export const LISTINGS = gql`
	query Listings(
		$location: String
		$filter: ListingsFilter!
		$listingsPage: Int!
		$limit: Int!
	) {
		listings(
			location: $location
			filter: $filter
			page: $listingsPage
			limit: $limit
		) {
			total
			region
			result {
				id
				title
				image
				address
				price
				numOfGuests
			}
		}
	}
`
