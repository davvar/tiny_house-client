import { Card, Layout, Spin, Typography } from 'antd'
import React, { FC, useEffect, useRef } from 'react'
import { useApolloClient, useMutation } from 'react-apollo'
import { Redirect, RouteComponentProps, useLocation } from 'react-router-dom'
import { ErrorBanner } from '../../lib/Components'
import { LOG_IN } from '../../lib/graphql/mutations'
import {
	LogIn as LogInData,
	LogInVariables,
} from '../../lib/graphql/mutations/LogIn/__generated__/LogIn'
import { AUTH_URL } from '../../lib/graphql/queries/Authurl'
import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/Authurl/__generated__/AuthUrl'
import { IViewer } from '../../lib/types'
import {
	displayErrorMessage,
	displaySuccessNotification,
} from '../../lib/utils'

import googleLogo from './assets/google_logo.jpg'

interface IProps extends RouteComponentProps {
	setViewer: (viewer: IViewer) => void
}

const { Content } = Layout
const { Text, Title } = Typography

export function useQuery() {
	return new URLSearchParams(useLocation().search)
}

export const Login: FC<IProps> = ({ setViewer, history }) => {
	const client = useApolloClient()
	const [
		logIn,
		{ data: logInData, loading: logInLoading, error: logInError },
	] = useMutation<LogInData, LogInVariables>(LOG_IN, {
		onCompleted: data => {
			if (data && data.logIn) {
				setViewer(data.logIn)
				window.sessionStorage.setItem('token', data.logIn.token!)
				displaySuccessNotification("You've successfully logged in!")
			}
		},
	})

	const logInRef = useRef(logIn)
	useEffect(() => {
		const code = new URL(window.location.href).searchParams.get('code')

		if (code) {
			logInRef.current({ variables: { input: { code } } })
		}
	}, [])

	const handleAuthorize = async () => {
		try {
			const { data } = await client.query<AuthUrlData>({ query: AUTH_URL })

			window.location.href = data.authUrl
		} catch (error) {
			displayErrorMessage("Sorry! We weren't able to log you in.")
		}
	}

	if (logInLoading) {
		return (
			<Content className='log-in'>
				<Spin size='large' tip='Logging you in...' />
			</Content>
		)
	}

	if (logInData && logInData.logIn) {
		const { id: viewerId } = logInData.logIn
		return <Redirect to={`/users/${viewerId}`} />
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
					onClick={handleAuthorize}
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
