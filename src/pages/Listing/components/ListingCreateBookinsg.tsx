import { Button, Card, DatePicker, Divider, Typography } from 'antd';
import moment, { Moment } from 'moment';
import React, { FC } from 'react';
import { displayErrorMessage, formatListingPrice } from 'utils';
import { Maybe } from '__generated__/graphql';

const { Title, Paragraph } = Typography

const DATE_FORMAT = 'YYYY/MM/DD'

interface IProps {
	price: number
	checkInDate: Maybe<Moment>
	setCheckInDate: (checkInDate: Maybe<Moment>) => void
	checkOutDate: Maybe<Moment>
	setCheckOutDate: (checkOutDate: Maybe<Moment>) => void
}

export const ListingCreateBookings: FC<IProps> = ({
	price,
	checkInDate,
	checkOutDate,
	setCheckInDate,
	setCheckOutDate,
}) => {

	const disabledDate = (date: Moment) => date.isBefore(moment().endOf('day'))

	const verifyAndSetCheckOutDate = (selectedCheckOutDate: Maybe<Moment>) => {
		if (checkInDate && selectedCheckOutDate) {
			if (moment(selectedCheckOutDate).isBefore(moment(checkInDate, 'days'))) {
				return displayErrorMessage(
					"You can't book date of check out to be prior to check in."
				)
			}
		}

		setCheckOutDate(selectedCheckOutDate)
	}

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
						disabled={!checkInDate}
						onChange={verifyAndSetCheckOutDate}
					/>
				</div>
				<Divider />
				<Button
					disabled={!checkInDate || !checkOutDate}
					size='large'
					type='primary'
					className='listing-booking__card-cta'
				>
					Request to book!
				</Button>
			</Card>
		</div>
	)
}
