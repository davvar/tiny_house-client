import { useLazyQuery, useMutation } from '@apollo/client';
import { Card, Layout, Spin, Typography } from 'antd';
import googleLogo from 'assets/images/google_logo.jpg';
import { ErrorBanner } from 'Components';
import { LOG_IN } from 'graphql/mutations';
import { USER_AUTH } from 'graphql/queries';
import React, { FC, useEffect, useRef } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { displayErrorMessage, displaySuccessNotification } from 'utils';

interface IProps extends RouteComponentProps {
	setViewer: (viewer: IViewer) => void
}

const { Content } = Layout
const { Text, Title } = Typography

export const Login: FC<IProps> = ({ setViewer }) => {
	const [authorize, authQuery] = useLazyQuery<IAuthUrlQuery>(USER_AUTH)

	const [logIn, logInRes] = useMutation<
		ILogInMutation,
		ILogInMutationVariables
	>(LOG_IN, {
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

	if (logInRes.loading) {
		return (
			<Content className='log-in'>
				<Spin size='large' tip='Logging you in...' />
			</Content>
		)
	}

	if (logInRes.data && logInRes.data.logIn) {
		const { id: viewerId } = logInRes.data.logIn
		return <Redirect to={`/user/${viewerId}`} />
	}

	const logInErrorBannerElement = logInRes.error && (
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
					to sign in with your Google account
				</Text>
			</Card>
		</Content>
	)
}
