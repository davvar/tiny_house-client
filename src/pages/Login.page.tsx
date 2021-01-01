import { Card, Layout, Spin, Typography } from 'antd'
import React, { FC, useEffect, useRef } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { ErrorBanner } from '../Components'

import { displayErrorMessage, displaySuccessNotification } from '../utils'

import googleLogo from 'assets/images/google_logo.jpg'
import {
	IViewer,
	useAuthUrlLazyQuery,
	useLogInMutation,
} from '__generated__/graphql'

interface IProps extends RouteComponentProps {
	setViewer: (viewer: IViewer) => void
}

const { Content } = Layout
const { Text, Title } = Typography

export const Login: FC<IProps> = ({ setViewer }) => {
	const [authorize, authQuery] = useAuthUrlLazyQuery()

	const [
		logIn,
		{ data: logInData, loading: logInLoading, error: logInError },
	] = useLogInMutation({
		onCompleted: data => {
			if (data && data.logIn) {
				setViewer(data.logIn)
				window.sessionStorage.setItem('token', data.logIn.token!)
				displaySuccessNotification("You've successfully logged in!")
			}
		},
	})

	useEffect(() => {
		if (authQuery.data) {
			window.location.href = authQuery.data.authUrl
		} else if (authQuery.error) {
			displayErrorMessage("Sorry! We weren't able to log you in.")
		}
	}, [authQuery.data, authQuery.error])

	const logInRef = useRef(logIn)
	useEffect(() => {
		const code = new URL(window.location.href).searchParams.get('code')

		if (code) {
			logInRef.current({ variables: { input: { code } } })
		}
	}, [])

	if (logInLoading) {
		return (
			<Content className='log-in'>
				<Spin size='large' tip='Logging you in...' />
			</Content>
		)
	}

	if (logInData && logInData.logIn) {
		const { id: viewerId } = logInData.logIn
		return <Redirect to={`/user/${viewerId}`} />
	}

	const logInErrorBannerElement = logInError && (
		<ErrorBanner message="Sorry! We weren't able to log you in." />
	)

	return (
		<Content className='log-in'>
			{logInErrorBannerElement}
			<Card className='log-in-card'>
				<div className='log-in-card__intro'>
					<Title level={3} className='log-in-card__intro-title'>
						<span role='img' aria-label='wave'>
							👋
						</span>
					</Title>
					<Title level={3} className='log-in-card__intro-title'>
						Log in to TinyHouse
					</Title>
					<Text>Sign in with Google to start booking available rentals</Text>
				</div>
				<button
					onClick={() => {
						console.log('clicked')
						authorize()
					}}
					className='log-in-card__google-button'
				>
					<img
						style={{ height: 50, width: 50, margin: 0 }}
						src={googleLogo}
						className='log-in-card__google-button'
						alt='Google Logo'
					/>
					<span className='log-in-card__google-button-text'>
						Sign in with Google
					</span>
				</button>
				<Text type='secondary'>
					Note: By signing in, you'll be redirected to the Google consent form
					to sign in with your Google accoutn
				</Text>
			</Card>
		</Content>
	)
}

// ----------------------- MY_IMPLEMENTATION -----------------------

// let query = useQuery()
// const tryToLogIn = useCallback(():
// 	| Promise<FetchResult<LogIn, Record<string, any>, Record<string, any>>>
// 	| undefined => {
// 	const code = query.get('code')

// 	if (code) {
// 		return client.mutate<LogIn, LogInVariables>({
// 			mutation: LOG_IN,
// 			variables: { input: { code } },
// 		})
// 	}
// }, [client, query])

// useEffect(() => {
// 	;(async () => {
// 		const viewer = await tryToLogIn()
// 		console.log({ viewer })

// 		if (viewer) {
// 			history.push('/')
// 		}
// 	})()

// }, [tryToLogIn, history])
// ----------------------- MY_IMPLEMENTATION_END -----------------------
