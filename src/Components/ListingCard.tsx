import { UserOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import Title from 'antd/lib/typography/Title'
import Text from 'antd/lib/typography/Text'
import React, { FC } from 'react'
import { formatListingPrice, iconColor } from 'utils'
import { Link } from 'react-router-dom'

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
	const { address, image, numOfGuests, price, title, id } = listing
	return (
		<Link to={`/listing/${id}`}>
			<Card
				hoverable
				cover={
					<div
						style={{ background: `url(${image})` }}
						className='listing-card__cover-img'
					></div>
				}
			>
				<div className='listing-card__details'>
					<div className='listing-card__description'>
						<Title level={4} className='listing-card__price'>
							{formatListingPrice(price)} <span>/day</span>
						</Title>
						<Text ellipsis className='listing-card__title'>
							{title}
						</Text>
						<Text ellipsis className='listing-card__address'>
							{address}
						</Text>
					</div>
					<div className='listing-card__dimensions listing-card__dimensions--guests'>
						<UserOutlined style={{ color: iconColor, marginRight: 5 }} />
						<Text>{numOfGuests} guests</Text>
					</div>
				</div>
			</Card>
		</Link>
	)
}
