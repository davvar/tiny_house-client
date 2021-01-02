import { Col, Layout, Row, Typography } from 'antd';
import cancunImage from 'assets/images/cancun.jpg';
import mapBackgroundImage from 'assets/images/map-background.jpg';
import sanFransiscoImage from 'assets/images/san-fransisco.jpg';
import React, { FC } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { displayErrorMessage } from 'utils';
import { HomeHero } from './components';

const { Paragraph, Title } = Typography
const { Content } = Layout

interface IProps extends RouteComponentProps {}

export const Home: FC<IProps> = ({ history }) => {
	const onSearch = (query: string) => {
		if (query.trim()) {
			history.push(`/listings/${query.trim()}`)
		} else {
			displayErrorMessage('Please enter a valid search!')
		}
	}

	return (
		<Content
			style={{ background: `url(${mapBackgroundImage})` }}
			className='home'
		>
			<HomeHero onSearch={onSearch} />

			<div className='home__cta-section'>
				<Title className='home__cta-section-title' level={2}>
					Your guide for all things rental
				</Title>
				<Paragraph>
					Helping you make the best decision in renting your last minute
					locations.
				</Paragraph>
				<Link
					to='listings/united%20states'
					className='ant-btn ant-btn-primary ant-btn-large home__cta-section-button'
				>
					Popular listings in the United States
				</Link>
			</div>

			<div className='home__listings'>
				<Title level={4} className='home__listings-title'>
					Listing of any kind
				</Title>
				<Row gutter={12}>
					<Col xs={24} sm={12}>
						<Link to='/listings/san%20fransisco'>
							<div className='home__listings-img-cover'>
								<img
									src={sanFransiscoImage}
									className='home__listings-img'
									alt='San Fransisco'
								/>
							</div>
						</Link>
					</Col>
					<Col xs={24} sm={12}>
						<Link to='/listings/cancun '>
							<div className='home__listings-img-cover'>
								<img
									src={cancunImage}
									className='home__listings-img'
									alt='Cancun'
								/>
							</div>
						</Link>
					</Col>
				</Row>
			</div>
		</Content>
	)
}
