import { KeyOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Divider, Modal, Typography } from 'antd';
import { CREATE_BOOKING } from 'graphql/mutations';
import { get } from 'lodash';
import moment, { Moment } from 'moment';
import React, { FC } from 'react';
import {
	CardElement,
	injectStripe,
	ReactStripeElements
} from 'react-stripe-elements';
import {
	displayErrorMessage,
	displaySuccessNotification,
	formatListingPrice
} from 'utils';

const { Paragraph, Text, Title } = Typography

interface IProps {
	listingId: string
	price: number
	checkInDate: Moment
	checkOutDate: Moment
	visible: boolean
	setVisible: (visible: boolean) => void
	clearBookingData: () => void
	handleListingRefetch: () => Promise<void>
}

const ListingCreateBookingModal: FC<
	IProps & ReactStripeElements.InjectedStripeProps
> = ({
	listingId,
	visible,
	setVisible,
	checkInDate,
	checkOutDate,
	price,
	stripe,
	clearBookingData,
	handleListingRefetch,
}) => {
	const [createBooking, { loading }] = useMutation<
		ICreateBookingMutation,
		ICreateBookingMutationVariables
	>(CREATE_BOOKING, {
		onCompleted: () => {
			clearBookingData()
			displaySuccessNotification(
				"You've successfully booked the listing!",
				'Booking history can always be found in your User page'
			)
			handleListingRefetch()
		},
		onError: () =>
			displayErrorMessage(
				"Sorry! We weren't able to successfully book the listing. Please try again later!"
			),
	})

	const daysBooked = checkOutDate.diff(checkInDate, 'days') + 1
	const listingPrice = price * daysBooked

	const handleCreateBooking = async () => {
		console.count('{ handleCreateBooking }');
		if (!stripe) {
			return displayErrorMessage("Sorry! We weren't able to connect Stripe.")
		}

		const { token: stripeToken, error } = await stripe.createToken()

		if (stripeToken) {
			await createBooking({
				variables: {
					input: {
						id: listingId,
						source: stripeToken.id,
						checkIn: moment(checkInDate).format('YYYY-MM-DD'),
						checkOut: moment(checkOutDate).format('YYYY-MM-DD'),
					},
				},
			})
		} else {
			displayErrorMessage(
				get(
					error,
					'message',
					"Sorry! We weren't able to book the listing. Please try again later."
				)
			)
		}


	}

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
					<Paragraph className='listing-booking-modal__charge-summary-total'>
						Total = <Text mark>{formatListingPrice(listingPrice, false)}</Text>
					</Paragraph>
				</div>

				<Divider />
				<CardElement
					hidePostalCode
					className='listing-booking-modal__stripe-card'
				/>
				<div className='listing-booking-modal__stripe-card-section'>
					<Button
						size='large'
						type='primary'
						className='listing-booking-modal__cta'
						loading={loading}
						onClick={handleCreateBooking}
					>
						Book
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export const WrappedListingCreateBookingModal = injectStripe(
	ListingCreateBookingModal
)
