interface IBookingsIndex {
	[year: string]: {
		[month: string]: {
			[day: string]: boolean
		}
	}
}
