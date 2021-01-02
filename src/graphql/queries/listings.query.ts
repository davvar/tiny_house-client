import { gql } from '@apollo/client';

export const LISTINGS = gql`
	query Listings($filter: ListingsFilter!, $listingsPage: Int!, $limit: Int!) {
		listings(filter: $filter, page: $listingsPage, limit: $limit) {
			total
			result {
				address
				price
				description
				numOfGuests
			}
		}
	}
`
