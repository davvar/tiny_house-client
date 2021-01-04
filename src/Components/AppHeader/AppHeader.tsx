import Search from 'antd/lib/input/Search';
import { Header } from 'antd/lib/layout/layout';
import logo from 'assets/images/tinyhouse-logo.png';
import { get } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { MenuItems } from './components';

interface IProps {
	viewer: IViewer
	setViewer: (viewer: IViewer) => void
	onSearch: (query: string) => void
}

export const AppHeader: FC<IProps> = ({ onSearch, ...props }) => {
	const match = useRouteMatch('/listings/:searchQuery')

	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		const newSearchQuery = get(match, 'params.searchQuery', '')
		setSearchQuery(newSearchQuery)
	}, [match])

	return (
		<Header className='app-header'>
			<div className='app-header__logo-search-section'>
				<div className='app-header__logo'>
					<Link to='/'>
						<img src={logo} alt='App logo' />
					</Link>
				</div>
				<div className='app-header__search-input'>
					<Search
						value={searchQuery}
						onChange={({ target }) => {
							setSearchQuery(target.value)
						}}
						onSearch={onSearch}
						enterButton
						placeholder="Search 'Yerevan'"
					/>
				</div>
			</div>
			<div className='app-header__menu-section'>
				<MenuItems {...props} />
			</div>
		</Header>
	)
}
