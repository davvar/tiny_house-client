import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { App } from './App'

import reportWebVitals from './reportWebVitals'
import './styles/index.css'

const client = new ApolloClient({
	uri: '/api',
	request: async operation => {
		const token = window.sessionStorage.getItem('token')
		operation.setContext({
			headers: {
				'X-CSRF-TOKEN': token || '',
			},
		})
	},
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
)

reportWebVitals()
