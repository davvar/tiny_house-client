import { Avatar, Button, Card, Divider, Typography } from 'antd';
import React, { FC } from 'react';

const { Paragraph, Text, Title } = Typography

interface IProps {
	user: IUser
	viewerIsUser: boolean
}

export const UserProfile: FC<IProps> = ({ user, viewerIsUser }) => {
	const additionalDetailSection = viewerIsUser && (
		<>
			<Divider />
			<div className='user-profile__details'>
				<Title level={4}>Additional Details</Title>
				<Paragraph>
					Interested to become a TinyHouse host? Register with your Stripe
					account!
				</Paragraph>
				<Button type='primary' className='user-profile__details-cta'>
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
