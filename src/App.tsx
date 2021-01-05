import { useMutation } from '@apollo/client';
import { Affix, Layout, Spin } from 'antd';
import { AppHeader, AppHeaderSkeleton, ErrorBanner } from 'Components';
import { LOG_IN } from 'graphql/mutations';
import { Home, Host, Listing, Listings, Login, NotFound, User } from 'pages';
import React, { useEffect, useRef, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { displayErrorMessage } from 'utils';

const initialViewer: IViewer = {
	id: null,
	token: null,
	avatar: null,
	hasWallet: null,
	didRequest: false,
}

export const App = () => {
	const history = useHistory()
	const [viewer, setViewer] = useState<IViewer>(initialViewer)
	const [searchQuery, setSearchQuery] = useState<string>('')

	const [logIn, { error }] = useMutation<
		ILogInMutation,
		ILogInMutationVariables
	>(LOG_IN, {
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

	const onSearch = (query: string) => {
		query = query.trim()
		if (query) {
			history.push(`/listings/${query}`)
			setSearchQuery(query)
		} else {
			displayErrorMessage('Please enter a valid search!')
		}
	}

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
		<Layout id='app'>
			{logInErrorBannerElement}
			<Affix offsetTop={0} className='app__affix-header'>
				<AppHeader
					viewer={viewer}
					setViewer={setViewer}
					onSearch={onSearch}
				/>
			</Affix>
			<Switch>
				<Route exact path='/' render={() => <Home onSearch={onSearch} />} />
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
	)
}
