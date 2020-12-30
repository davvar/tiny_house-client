interface IViewer {
	id: string | null
	token: string | null
	avatar: string | null
	hasWallet: boolean | null
	didRequest: boolean
}

interface IListing {
	id: string
	title: string
	image: string
	address: string
	price: number
	numOfGuests: number
	numOfBeds: number
	numOfBaths: number
	rating: number
}

interface IListingsData {
	listings: IListing[]
}

interface IDeleteListingsData {
	deleteListing: IListing
}

interface IDeleteListingsVariables {
	id: string
}
