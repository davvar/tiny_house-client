import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Avatar, Button, Menu } from 'antd'
import { LOG_OUT } from 'graphql/mutations'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useViewer } from 'ViewerContext';
import { displayErrorMessage, displaySuccessNotification } from '../../../utils'

const { Item, SubMenu } = Menu

export const MenuItems: FC = () => {
	const { setViewer, viewer } = useViewer()

	const [logOut] = useMutation<ILogOutMutation, ILogOutMutationVariables>(
		LOG_OUT,
		{
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
		}
	)

	const SubMenuLogin = viewer.id ? (
		<SubMenu title={<Avatar src={viewer.avatar} />}>
			<Item key='/user'>
				<Link to={`/user/${viewer.id}`}>
					<UserOutlined />
					Profile
				</Link>
			</Item>
			<Item key='/logout'>
				<div onClick={() => logOut()}>
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
