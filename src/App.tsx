import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useMutation } from 'react-apollo'
import { LOG_IN } from './graphql/mutations'
import { Home, Host, Listing, Listings, Login, NotFound, User } from './pages'
import { AppHeader, AppHeaderSkeleton, ErrorBanner } from './Components'
import {
	LogIn as ILogInData,
	LogInVariables as ILogInVariables,
} from './graphql/mutations/LogIn/__generated__/LogIn'
import Layout from 'antd/lib/layout/layout'
import { Affix, Spin } from 'antd'

const initialViewer: IViewer = {
	id: null,
	token: null,
	avatar: null,
	hasWallet: null,
	didRequest: false,
}

export const App = () => {
	const [viewer, setViewer] = useState<IViewer>(initialViewer)
	const [logIn, { error }] = useMutation<ILogInData, ILogInVariables>(LOG_IN, {
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
				<div className='app-skeleton__spin-section'>
					<Spin size='large' tip='Launching TinyHouse' />
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
