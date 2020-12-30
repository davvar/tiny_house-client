import { Button, Menu } from 'antd'
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import Avatar from 'antd/lib/avatar/avatar'
import { useMutation } from 'react-apollo'
import { LOG_OUT } from '../../../graphql/mutations'
import { LogOut as LogOutData } from '../../../graphql/mutations/LogOut/__generated__/LogOut'
import {
	displayErrorMessage,
	displaySuccessNotification,
} from '../../../utils'

interface IProps {
	viewer: IViewer
	setViewer: (viewer: IViewer) => void
}

const { Item, SubMenu } = Menu

export const MenuItems: FC<IProps> = ({ viewer, setViewer }) => {
	const [logOut] = useMutation<LogOutData>(LOG_OUT, {
		onCompleted: data => {
			if (data && data.logOut) {
				setViewer(data.logOut)
				window.sessionStorage.removeItem('token')
				displaySuccessNotification("You've successfully logged out!")
			}
		},

		onError: () => {
			displayErrorMessage(
				"Sorry! We weren't able to log you out. Please try again later."
			)
		},
	})

	const handleLogOut = () => {
		logOut()
	}

	const SubMenuLogin = viewer.id ? (
		<SubMenu title={<Avatar src={viewer.avatar} />}>
			<Item key='/user'>
				<Link to={`/user/${viewer.id}`}>
					<UserOutlined />
					Profile
				</Link>
			</Item>
			<Item key='/logout'>
				<div onClick={handleLogOut}>
					<LogoutOutlined />
					Logout
				</div>
			</Item>
		</SubMenu>
	) : (
		<Item>
			<Link to='/login'>
				<Button type='primary'>Sign In</Button>
			</Link>
		</Item>
	)

	return (
		<Menu mode='horizontal' selectable={false} className='menu'>
			<Item key='/host'>
				<Link to='/host'>
					<HomeOutlined />
					Host
				</Link>
			</Item>
			{SubMenuLogin}
		</Menu>
	)
}
