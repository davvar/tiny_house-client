import { gql } from '@apollo/client';

export const USER_AUTH = gql`
	query AuthUrl {
		authUrl
	}
`
