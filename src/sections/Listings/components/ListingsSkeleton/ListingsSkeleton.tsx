import { Alert, Divider, Skeleton } from 'antd'
import React, { FC } from 'react'
import './styles/ListingsSkeleton.css'

interface IProps {
	title: string
	error?: boolean
}

export const ListingsSkeleton: FC<IProps> = ({ title, error = false }) => (
	<>
		<h2>{title}</h2>
		{error && <Alert className='listing-skeleton-alert' type='error' message='Something went wrong...' />}
		<Skeleton active paragraph={{ rows: 1 }} />
		<Divider />
		<Skeleton active paragraph={{ rows: 1 }} />
		<Divider />
		<Skeleton active paragraph={{ rows: 1 }} />
	</>
)
