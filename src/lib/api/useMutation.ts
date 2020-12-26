import { isEmpty } from 'lodash'
import { useState } from 'react'
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

export const useMutation = <TData = any, TVariables = any>(
	query: string
): MutationTuple<TData, TVariables> => {
	const [state, setState] = useState<IState<TData>>({
		data: null,
		loading: false,
		error: false,
	})

	const fetch = async (variables?: TVariables) => {
		try {
			setState({
				data: null,
				loading: true,
				error: false,
			})

			const { data, errors } = await server.fetch<TData, TVariables>({
				query,
				variables,
			})

			if (!isEmpty(errors)) {
				throw new Error(errors[0].message)
			}

			setState({
				data,
				loading: false,
				error: false,
			})
		} catch (err) {
			setState({
				data: null,
				loading: false,
				error: true,
			})

			throw console.error(err)
		}
	}

	return [fetch, state]
}
