import { Button, Card, Divider } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Paragraph from 'antd/lib/typography/Paragraph'
import Title from 'antd/lib/typography/Title'
import Text from 'antd/lib/typography/Text'
import React, { FC } from 'react'
import { User as IUserData } from '../../../../lib/graphql/queries/User/__generated__/User'

interface IProps {
	user: IUserData['user']
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
