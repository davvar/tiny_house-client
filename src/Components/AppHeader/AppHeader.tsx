import Search from 'antd/lib/input/Search';
import { Header } from 'antd/lib/layout/layout';
import logo from 'assets/images/tinyhouse-logo.png';
import { last } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuItems } from './components';

interface IProps {
	onSearch: (query: string) => void
}

export const AppHeader: FC<IProps> = ({ onSearch }) => {
	const location = useLocation()
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		if (location.pathname.includes('/listings')) {
			const query = last(location.pathname.split('/')) as string
			setSearchQuery(query)
		} else setSearchQuery('')
	}, [location])

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
						onChange={e => setSearchQuery(e.target.value)}
						onSearch={onSearch}
						enterButton
						placeholder="Search 'Yerevan'"
					/>
				</div>
			</div>
			<div className='app-header__menu-section'>
				<MenuItems />
			</div>
		</Header>
	)
}
