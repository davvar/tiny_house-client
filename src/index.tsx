import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	ApolloLink,
	HttpLink,
	concat
} from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

import reportWebVitals from './reportWebVitals'
import './styles/index.css'


const httpLink = new HttpLink({ uri: '/api' });
const authMiddleware = new ApolloLink((operation, forward) => {
	const token = window.sessionStorage.getItem('token')
	operation.setContext({
		headers: {
			'X-CSRF-TOKEN': token || '',
		},
	})

	return forward(operation)
})

const client = new ApolloClient({
	link: concat(authMiddleware, httpLink),
	cache: new InMemoryCache(),
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
)

reportWebVitals()
