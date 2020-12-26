import { isEmpty } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { server } from '.'

interface IState<TData> {
	data: TData | null
	loading: boolean
	error: boolean
}

interface IQueryResult<TData> extends IState<TData> {
	reFetch: () => Promise<void>
}

export const useQuery = <TData = any>(query: string): IQueryResult<TData> => {
	const [state, setState] = useState<IState<TData>>({
		data: null,
		loading: false,
		error: false,
	})

	const fetch = useCallback(async () => {
		try {
			setState({
				data: null,
				loading: true,
				error: false,
			})

			const { data, errors } = await server.fetch<TData>({ query })

			if (!isEmpty(errors)) {
				throw new Error(errors[0].message)
			}

			setState({
				data,
				loading: false,
				error: false,
			})
		} catch (err) {
			setState({ data: null, loading: false, error: true })
			throw console.error(err)
		}
	}, [query])

	useEffect(() => {
		fetch()
	}, [fetch])

	return { ...state, reFetch: fetch }
}