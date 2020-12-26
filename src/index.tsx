import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { Listings, Listing, Home, Host, NotFound, User } from './sections'
import './styles/index.css'

const client = new ApolloClient({
	uri: '/api',
})

const App = () => (
	<Router>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route path='/host' component={Host} />
			<Route path='/listing/:id' component={Listing} />
			<Route path='/listings/:location?' component={Listings} />
			<Route path='/user/:id' component={User} />
			<Route component={NotFound} />
		</Switch>
	</Router>
)

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
