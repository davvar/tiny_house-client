import { UserOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import Title from 'antd/lib/typography/Title'
import Text from 'antd/lib/typography/Text'
import React, { FC } from 'react'

interface IProps {
	listing: {
		id: string
		title: string
		image: string
		address: string
		price: number
		numOfGuests: number
	}
}

export const ListingCard: FC<IProps> = ({ listing }) => {
	const { address, image, numOfGuests, price, title } = listing
	return (
		<Card
			hoverable
			cover={
				<div
					style={{ background: `url${image}` }}
					className='listing-card__cover-img'
				></div>
			}
		>
			<div className='listing-card__details'>
				<div className='listing-card__description'>
					<Title level={4} className='listing-price'>
						{price} <span>/day</span>
					</Title>
					<Text strong ellipsis className='listing-title'>
						{title}
					</Text>
					<Text strong ellipsis className='listing-address'>
						{address}
					</Text>
				</div>
				<div className='listing-card__dimension listing-card__dimension--guests'>
					<UserOutlined />
					<Text>{numOfGuests} guests.</Text>
				</div>
			</div>
		</Card>
	)
}
