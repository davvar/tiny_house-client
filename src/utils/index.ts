import { message, notification } from 'antd'

export const displaySuccessNotification = (
	message: string,
	description?: string
) => {
	return notification['success']({
		message,
		description,
		placement: 'topLeft',
		style: {
			marginTop: 50,
		},
	})
}

export const displayErrorMessage = (error: string) => {
	return message.error(error)
}

export const formatListingPrice = (price: number, round = true) => {
	return `$${round ? Math.round(price / 100) : price / 100}`
}

export const iconColor = '#1890ff'

export const listingsFilter: {
	PRICE_HIGH_TO_LOW: IListingsFilter
	PRICE_LOW_TO_HIGH: IListingsFilter
} = {
	PRICE_HIGH_TO_LOW: 'PRICE_HIGH_TO_LOW',
	PRICE_LOW_TO_HIGH: 'PRICE_LOW_TO_HIGH',
}
export const listingType: {
	Apartment: IListingType
	House: IListingType
} = {
	House: 'HOUSE',
	Apartment: 'APARTMENT',
}
