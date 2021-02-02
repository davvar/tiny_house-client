import { Button, Card, DatePicker, Divider, Typography } from 'antd'
import { get } from 'lodash'
import moment, { Moment } from 'moment'
import React, { FC } from 'react'
import { displayErrorMessage, formatListingPrice } from 'utils'
import { useViewer } from 'ViewerContext'

const { Title, Paragraph, Text } = Typography

const DATE_FORMAT = 'YYYY/MM/DD'

interface IProps {
	host: IListing['host']
	bookingsIndex: IListing['bookingsIndex']
	price: number
	checkInDate: Maybe<Moment>
	setCheckInDate: (checkInDate: Maybe<Moment>) => void
	checkOutDate: Maybe<Moment>
	setCheckOutDate: (checkOutDate: Maybe<Moment>) => void
	setModalVisible: (modalVisible: boolean) => void
}

export const ListingCreateBookings: FC<IProps> = ({
	host,
	bookingsIndex,
	price,
	checkInDate,
	checkOutDate,
	setCheckInDate,
	setCheckOutDate,
	setModalVisible,
}) => {
	const { viewer } = useViewer()

	const bookingsIndexJSON: IBookingsIndex = JSON.parse(bookingsIndex)

	const dateIsBooked = (date: Moment): boolean => {
		const year = moment(date).year()
		const month = moment(date).month()
		const day = moment(date).date()

		return get(bookingsIndexJSON, `${year}.${month}.${day}`, false) as boolean
	}

	const disabledDate = (date: Moment) => {
		return date.isBefore(moment().endOf('day')) || dateIsBooked(date)
	}

	const viewerIsHost = viewer.id === host.id
	const checkInInputDisabled = !viewer.id || viewerIsHost || !host.hasWallet

	const verifyAndSetCheckOutDate = (selectedCheckOutDate: Maybe<Moment>) => {
		if (checkInDate && selectedCheckOutDate) {
			if (moment(selectedCheckOutDate).isBefore(moment(checkInDate, 'days'))) {
				return displayErrorMessage(
					"You can't book date of check out to be prior to check in."
				)
			}

			let dateCursor = checkInDate
			while (moment(dateCursor).isBefore(selectedCheckOutDate, 'days')) {
				dateCursor = moment(dateCursor).add(1, 'days')

				if (dateIsBooked(dateCursor)) {
					return displayErrorMessage(
						"You can't book a period of time that overlaps existing booking. Pleas try again!"
					)
				}
			}
		}

		setCheckOutDate(selectedCheckOutDate)
	}

	let buttonMessage = "You won't be charged yet"
	if (viewerIsHost) buttonMessage = "You can't book your own listing"
	else if (!viewer.id)
		buttonMessage = 'You have to be signed in to book a listing!'
	else if (!host.hasWallet)
		buttonMessage =
			"The host was disconnected from Stripe thus won't be able to receive payments"

	return (
		<div className='listing-booking'>
			<Card className='listing-booking__card'>
				<div>
					<Paragraph>
						<Title level={2} className='listing-booking__card-title'>
							{formatListingPrice(price)} <span>/day</span>
						</Title>
					</Paragraph>
					<Divider />
				</div>
				<div className='listing-booking__card-date-picker'>
					<Paragraph strong>Check In</Paragraph>
					<DatePicker
						format={DATE_FORMAT}
						value={checkInDate}
						showToday={false}
						disabledDate={disabledDate}
						disabled={checkInInputDisabled}
						onChange={setCheckInDate}
						onOpenChange={() => setCheckOutDate(null)}
					/>
				</div>
				<div className='listing-booking__card-date-picker'>
					<Paragraph strong>Check Out</Paragraph>
					<DatePicker
						format={DATE_FORMAT}
						value={checkOutDate}
						showToday={false}
						disabledDate={disabledDate}
						disabled={checkInInputDisabled || !checkInDate}
						onChange={verifyAndSetCheckOutDate}
					/>
				</div>
				<Divider />
				<Button
					disabled={checkInInputDisabled || !checkInDate || !checkOutDate}
					size='large'
					type='primary'
					className='listing-booking__card-cta'
					onClick={() => setModalVisible(true)}
				>
					Request to book!
				</Button>
				<Text type='secondary' mark>
					{buttonMessage}
				</Text>
			</Card>
		</div>
	)
}
