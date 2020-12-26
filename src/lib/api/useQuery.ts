import { isEmpty } from 'lodash'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { server } from '.'

interface IState<TData> {
	data: TData | null
	loading: boolean
	error: boolean
}

interface IQueryResult<TData> extends IState<TData> {
	reFetch: () => Promise<void>
}

type Action<TData> =
	| { type: 'FETCH_ERROR' }
	| { type: 'FETCH_SUCCESS'; payload: TData }
	| { type: 'FETCH' }

const reducer = <TDate>() => (
	state: IState<TDate>,
	action: Action<TDate>
): IState<TDate> => {
	switch (action.type) {
		case 'FETCH':
			return { ...state, loading: true }
		case 'FETCH_SUCCESS':
			return { data: action.payload, loading: false, error: false }
		case 'FETCH_ERROR':
			return { ...state, loading: false, error: true }
		default:
			throw new Error()
	}
}

export const useQuery = <TData = any>(query: string): IQueryResult<TData> => {
	const [state, dispatch] = useReducer(reducer<TData>(), {
		data: null,
		loading: false,
		error: false,
	})

	const fetch = useCallback(async () => {
		try {
			dispatch({ type: 'FETCH' })
			const { data, errors } = await server.fetch<TData>({ query })

			if (!isEmpty(errors)) {
				throw new Error(errors[0].message)
			}

			dispatch({ type: 'FETCH_SUCCESS', payload: data })
		} catch (err) {
			dispatch({ type: 'FETCH_ERROR' })
			throw console.error(err)
		}
	}, [query])

	useEffect(() => {
		fetch()
	}, [fetch])

	return { ...state, reFetch: fetch }
}
