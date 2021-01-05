import { Alert } from 'antd';
import React, { FC } from 'react';

interface IProps {
	message?: string
	description?: string
}

export const ErrorBanner: FC<IProps> = ({
	message = 'Uh oh! Something went wrong :(',
	description = 'Some Description',
}) => (
	<Alert
		banner
		closable
		message={message}
		type='error'
		description={description}
		className='error-banner'
	/>
)
