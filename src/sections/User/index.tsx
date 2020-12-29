import { Col, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { get } from 'lodash'
import React, { FC } from 'react'
import { useQuery } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { PageSkeleton, ErrorBanner } from '../../lib/Components'
import { USER } from '../../lib/graphql/queries'
import {
	User as IUserData,
	UserVariables as IUserVariables,
} from '../../lib/graphql/queries/User/__generated__/User'
import { IViewer } from '../../lib/types'
import { UserProfile } from './components'

interface IMatchParams {
	id: string
}

interface IProps extends RouteComponentProps<IMatchParams> {
	viewer: IViewer
}

export const User: FC<IProps> = ({ viewer, match }) => {
	const { data, loading, error } = useQuery<IUserData, IUserVariables>(USER, {
		variables: { id: match.params.id },
	})

	if (loading) {
		return (
			<Content className='user'>
				<PageSkeleton />
			</Content>
		)
	}

	if (error) {
		return (
			<Content className='user'>
				<ErrorBanner description='This user may not exist.' />
				<PageSkeleton />
			</Content>
		)
	}

	const user = get(data, 'user', null)
	const viewerIsUser = viewer.id === user?.id

	const userProfileElement = user ? (
		<UserProfile viewerIsUser={viewerIsUser} user={user} />
	) : null

	return (
		<Content className='user'>
			<Row gutter={12} justify='space-between'>
				<Col xs={24}>{userProfileElement}</Col>
			</Row>
		</Content>
	)
}
