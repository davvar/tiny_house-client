import { Header } from 'antd/lib/layout/layout';
import logo from 'assets/images/tinyhouse-logo.png';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IViewer } from '__generated__/graphql';
import { MenuItems } from './components/MenuItems';

interface IProps {
	viewer: IViewer
	setViewer: (viewer: IViewer) => void
}

export const AppHeader: FC<IProps> = props => {
	return (
		<Header className='app-header'>
			<div className='app-header__logo-search-section'>
				<div className='app-header__logo'>
					<Link to='/'>
						<img src={logo} alt='App logo' />
					</Link>
				</div>
			</div>
			<div className='app-header__menu-section'>
				<MenuItems {...props} />
			</div>
		</Header>
	)
}
