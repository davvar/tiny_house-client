import { Header } from 'antd/lib/layout/layout';
import logo from 'assets/images/tinyhouse-logo.png';
import React from 'react';

export const AppHeaderSkeleton = () => {
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
