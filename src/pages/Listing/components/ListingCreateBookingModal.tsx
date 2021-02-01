import { KeyOutlined } from '@ant-design/icons'
import { Button, Divider, Modal, Typography } from 'antd'
import moment, { Moment } from 'moment'
import React, { FC } from 'react'
import { formatListingPrice } from 'utils'

const { Paragraph, Text, Title } = Typography

interface IProps {
	price: number
	checkInDate: Moment
	checkOutDate: Moment
	visible: boolean
	setVisible: (visible: boolean) => void
}

export const ListingCreateBookingModal: FC<IProps> = ({
	visible,
	setVisible,
	checkInDate,
	checkOutDate,
	price,
}) => {
	const daysBooked = checkOutDate.diff(checkInDate, 'days') + 1
	const listingPrice = price * daysBooked
	// const tinyHouseFee = 0.05 * listingPrice
	// const totalPrice = tinyHouseFee + listingPrice

	return (
		<Modal
			centered
			footer={null}
			visible={visible}
			onCancel={() => setVisible(false)}
		>
			<div className='listing-booking-modal'>
				<div className='listing-booking-modal__intro'>
					<Title className='listing-booking-modal__intro-title'>
						<KeyOutlined />
					</Title>
					<Title level={3} className='listing-booking-modal__intro-title'>
						Book your trip
					</Title>
					<Paragraph>
						Enter your payment information to book the listing from the date
						between{' '}
						<Text mark strong>
							{moment(checkInDate).format('MMMM Do YYYY')}{' '}
						</Text>{' '}
						and{' '}
						<Text mark strong>
							{moment(checkOutDate).format('MMMM Do YYYY')}
						</Text>
						, inclusive.
					</Paragraph>
				</div>
				<Divider />

				<div className='listing-booking-modal__charge-summary'>
					<Paragraph>
						{formatListingPrice(price, false)} * {daysBooked} days ={' '}
						<Text strong>{formatListingPrice(listingPrice, false)}</Text>
					</Paragraph>
					{/* <Paragraph>
						TinyHouse Fee <sub>~ 5%</sub> ={' '}
						<Text strong>{formatListingPrice(tinyHouseFee)}</Text>
					</Paragraph> */}
					<Paragraph className='listing-booking-modal__charge-summary-total'>
						Total = <Text mark>{formatListingPrice(listingPrice, false)}</Text>
					</Paragraph>
				</div>

				<Divider />

				<div className='listing-booking-modal__stripe-card-section'>
					<Button
						size='large'
						type='primary'
						className='listing-booking-modal__cta'
					>
						Book
					</Button>
				</div>
			</div>
		</Modal>
	)
}
