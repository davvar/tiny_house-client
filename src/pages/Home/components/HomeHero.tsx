import { Card, Col, Input, Row, Typography } from 'antd';
import dubaiImage from 'assets/images/dubai.jpg';
import londonImage from 'assets/images/london.jpg';
import losAngelesImage from 'assets/images/los-angeles.jpg';
import torontoImage from 'assets/images/toronto.jpg';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography
const { Search } = Input

interface IProps {
	onSearch: (query: string) => void
}

export const HomeHero: FC<IProps> = ({ onSearch }) => {
	return (
		<div className='home-hero'>
			<div className='home-hero__search'>
				<Title className='home-hero__title'>
					Find a place you'll love to stay at
				</Title>
				<Search
					onSearch={onSearch}
					enterButton
					className='home-hero__search-input'
					placeholder="Search 'Yerevan'"
					size='large'
				/>
			</div>
			<Row gutter={12} className='home-hero__cards'>
				<Col xs={12} md={6}>
					<Link to={`/listings/toronto`}>
						<Card cover={<img alt='Toronto' src={torontoImage} />}>
							Toronto
						</Card>
					</Link>
				</Col>
				<Col xs={12} md={6}>
					<Link to={`/listings/dubai`}>
						<Card cover={<img alt='Dubai' src={dubaiImage} />}>Dubai</Card>
					</Link>
				</Col>
				<Col xs={0} md={6}>
					<Link to={`/listings/los%20angeles`}>
						<Card cover={<img alt='Los Angeles' src={losAngelesImage} />}>
							Los Angeles
						</Card>
					</Link>
				</Col>
				<Col xs={0} md={6}>
					<Link to={`/listings/london`}>
						<Card cover={<img alt='London' src={londonImage} />}>London</Card>
					</Link>
				</Col>
			</Row>
		</div>
	)
}
