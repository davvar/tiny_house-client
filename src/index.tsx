import { Affix, Layout, Spin } from 'antd'
import ApolloClient from 'apollo-boost'
import React, { useEffect, useRef, useState } from 'react'
import { ApolloProvider, useMutation } from 'react-apollo'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppHeaderSkeleton, ErrorBanner } from './lib/Components'
import { LOG_IN } from './lib/graphql/mutations'
import {
	LogIn as LogInData,
	LogInVariables,
} from './lib/graphql/mutations/LogIn/__generated__/LogIn'

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
	request: async operation => {
		const token = window.sessionStorage.getItem('token')
		operation.setContext({
			headers: {
				'X-CSRF-TOKEN': token || '',
			},
		})
	},
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
	const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
		onCompleted: data => {
			if (data && data.logIn) {
				setViewer(data.logIn)

				data.logIn.token
					? window.sessionStorage.setItem('token', data.logIn.token)
					: window.sessionStorage.removeItem('token')
			}
		},
	})

	const logInRef = useRef(logIn)
	useEffect(() => {
		logInRef.current()
	}, [])

	if (!viewer.didRequest && !error) {
		return (
			<Layout className='app-skeleton'>
				<AppHeaderSkeleton />
				<div className='app-skeleton__spinner'>
					<Spin
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%,-50%)',
						}}
						size='large'
						tip='Launching TinyHouse'
					/>
				</div>
			</Layout>
		)
	}

	const logInErrorBannerElement = error && (
		<ErrorBanner description="We weren't able to verify if you were logged in. Please try again later." />
	)

	return (
		<Router>
			<Layout id='app'>
				{logInErrorBannerElement}
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
					<Route
						path='/user/:id'
						render={props => <User {...props} viewer={viewer} />}
					/>
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
