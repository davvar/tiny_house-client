import { Header } from 'antd/lib/layout/layout'
import React, { FC } from 'react'
import logo from 'assets/images/tinyhouse-logo.png'

export const AppHeaderSkeleton: FC<{}> = () => {
	return (
		<Header className='app-header'>
			<div className='app-header__logo-search-section'>
				<div className='app-header__logo'>
					<img src={logo} alt='App logo' />
				</div>
			</div>
		</Header>
	)
}
