import { isEmpty } from 'lodash'
import { useReducer } from 'react'
import { server } from '.'

interface IState<TData> {
	data: TData | null
	loading: boolean
	error: boolean
}

type MutationTuple<TData, TVariables> = [
	(variables?: TVariables | undefined) => Promise<void>,
	IState<TData>
]

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

export const useMutation = <TData = any, TVariables = any>(
	query: string
): MutationTuple<TData, TVariables> => {
	const [state, dispatch] = useReducer(reducer<TData>(), {
		data: null,
		loading: false,
		error: false,
	})

	const fetch = async (variables?: TVariables) => {
		try {
			dispatch({ type: 'FETCH' })
			const { data, errors } = await server.fetch<TData, TVariables>({
				query,
				variables,
			})

			if (!isEmpty(errors)) {
				throw new Error(errors[0].message)
			}

			dispatch({ type: 'FETCH_SUCCESS', payload: data })
		} catch (err) {
			dispatch({ type: 'FETCH_ERROR' })
			throw console.error(err)
		}
	}

	return [fetch, state]
}
