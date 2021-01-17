import { useMutation } from '@apollo/client'
import { Spin, Layout } from 'antd'
import { CONNECT_STRIPE } from 'graphql/mutations'
import React, { useEffect, useRef, FC } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { displaySuccessNotification } from 'utils'
import { useViewer } from 'ViewerContext'

const { Content } = Layout

interface IProps extends RouteComponentProps {}

export const Stripe: FC<IProps> = ({ history }) => {
	const { viewer, setViewer } = useViewer()
	const [connectStripe, { data, error, loading }] = useMutation<
		IConnectStripeMutation,
		IConnectStripeMutationVariables
	>(CONNECT_STRIPE, {
		onCompleted: data => {
			if (data && data.connectStripe) {
				setViewer(viewer => ({
					...viewer,
					hasWallet: data.connectStripe.hasWallet,
				}))

				displaySuccessNotification(
					"You've successfully connected your Stripe account!",
					'You can now begin to create listings in the Host page'
				)
			}
		},
	})

	const connectStripeRef = useRef(connectStripe)
	useEffect(() => {
		const code = new URL(window.location.href).searchParams.get('code')

		if (code) {
			connectStripeRef.current({ variables: { input: { code } } })
		} else {
			history.replace('/login')
		}
	}, [history])

	if (data && data.connectStripe) {
		return <Redirect to={`/user/${viewer.id}`} />
	}

	if (loading) {
		return (
			<Content className='stripe'>
				<Spin size='large' tip='Connecting your Stripe account...' />
			</Content>
		)
	}

	if (error) {
		return <Redirect to={`/user/${viewer.id}?stripe_error=true`} />
	}

	return null
}
