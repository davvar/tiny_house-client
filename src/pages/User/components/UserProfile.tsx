import { useMutation } from '@apollo/client'
import { Avatar, Button, Card, Divider, Tag, Typography } from 'antd'
import { DISCONNECT_STRIPE } from 'graphql/mutations'
import React, { FC } from 'react'
import {
	displayErrorMessage,
	displaySuccessNotification,
	formatListingPrice,
} from 'utils'

const { Paragraph, Text, Title } = Typography
console.log(process.env)

const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&scope=read_write`
interface IProps {
	user: IUser
	viewerIsUser: boolean
	setViewer: React.Dispatch<React.SetStateAction<IViewer>>
	handleUserRefetch: () => Promise<void>
}

export const UserProfile: FC<IProps> = ({
	user,
	viewerIsUser,
	setViewer,
	handleUserRefetch,
}) => {
	const [disconnectStripe, { loading }] = useMutation<
		IDisconnectStripeMutation,
		IDisconnectStripeMutationVariables
	>(DISCONNECT_STRIPE, {
		onCompleted: data => {
			if (data && data.disconnectStripe) {
				setViewer(viewer => ({
					...viewer,
					hasWallet: data.disconnectStripe.hasWallet,
				}))

				displaySuccessNotification(
					"You've successfully disconnected from Stripe",
					"You'll have to reconnect with Stripe to continue to create listings"
				)
				handleUserRefetch()
			}
		},
		onError: () => {
			displayErrorMessage(
				"Sorry! We weren't able to disconnect you from Stripe. Please try again later!"
			)
		},
	})

	const redirectToStripe = () => (window.location.href = stripeAuthUrl)

	const additionalDetail = user.hasWallet ? (
		<>
			<Paragraph>
				<Tag color='green'>Stripe Registered</Tag>
			</Paragraph>
			<Paragraph>
				Income Earned:{' '}
				<Text strong>
					{user.income ? formatListingPrice(user.income) : '$0'}
				</Text>
			</Paragraph>
			<Button
				loading={loading}
				onClick={() => disconnectStripe()}
				type='primary'
				className='user-profile__details-cta'
			>
				Disconnect Stripe
			</Button>
			<Paragraph>
				By disconnection, yo won't be able to receive{' '}
				<Text strong> any further payments</Text>. This will prevent users from
				booking listings tha ypu might already created.
			</Paragraph>
		</>
	) : (
		<>
			<Paragraph>
				Interested to become a TinyHouse host? Register with your Stripe
				account!
			</Paragraph>
			<Button
				onClick={redirectToStripe}
				type='primary'
				className='user-profile__details-cta'
			>
				Connect with Stripe
			</Button>
			<Paragraph type='secondary'>
				TinyHouse uses{' '}
				<a
					href='https://stripe.com/en-US/connect'
					target='blank'
					rel='noopener noreferrer'
				>
					Stripe
				</a>{' '}
				to help transfer your money.
			</Paragraph>
		</>
	)

	const additionalDetailSection = viewerIsUser && (
		<>
			<Divider />
			<div className='user-profile__details'>
				<Title level={4}>Additional Details</Title>
				{additionalDetail}
			</div>
		</>
	)

	return (
		<div className='user-profile'>
			<Card className='user-profile__card'>
				<div className='user-profile__avatar'>
					<Avatar size={100} src={user.avatar} />
				</div>
				<Divider />
				<div className='user-profile__details'>
					<Title level={4}>Details</Title>
					<Paragraph>
						Name: <Text strong>{user.name}</Text>
					</Paragraph>
					<Paragraph>
						Contact: <Text strong>{user.contact}</Text>
					</Paragraph>
				</div>
				{additionalDetailSection}
			</Card>
		</div>
	)
}
