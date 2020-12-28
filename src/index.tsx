import { Affix, Layout } from 'antd'
import ApolloClient from 'apollo-boost'
import React, { useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { IViewer } from './lib/types'
import reportWebVitals from './reportWebVitals'
import {
	Login,
	Listings,
	Listing,
	Home,
	Host,
	NotFound,
	User,
	AppHeader,
} from './sections'
import './styles/index.css'

const client = new ApolloClient({
	uri: '/api',
})

const initialViewer: IViewer = {
	id: null,
	token: null,
	avatar: null,
	hasWallet: null,
	didRequest: false,
}

const App = () => {
	const [viewer, setViewer] = useState<IViewer>(initialViewer)

	return (
		<Router>
			<Layout id='app'>
				<Affix offsetTop={0} className='app__affix-header'>
					<AppHeader viewer={viewer} setViewer={setViewer} />
				</Affix>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/host' component={Host} />
					<Route path='/listing/:id' component={Listing} />
					<Route path='/listings/:location?' component={Listings} />
					<Route
						exact
						path='/login'
						render={props => <Login {...props} setViewer={setViewer} />}
					/>
					<Route path='/user/:id' component={User} />
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</Router>
	)
}

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
)

reportWebVitals()
