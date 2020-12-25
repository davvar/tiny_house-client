interface IBody<TVariables> {
	query: string
	variables?: TVariables
}

export const server = {
	fetch: async <TData = any, TVariables = any>(body: IBody<TVariables>) => {
		const res = await fetch('/api', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})

		return res.json() as Promise<{ data: TData }>
	},
}
