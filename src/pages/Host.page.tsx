import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import {
	Button,
	Form,
	Input,
	InputNumber,
	Layout,
	Radio,
	Typography,
	Upload
} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { HOST_LISTING } from 'graphql/mutations';
import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
	displayErrorMessage,
	displaySuccessNotification,
	listingType
} from 'utils';
import { useViewer } from 'ViewerContext';

const { Content } = Layout
const { Text, Title } = Typography
const { Item } = Form

export const Host = ({ history }: RouteComponentProps) => {
	const { viewer } = useViewer()
	const [hostListing, { loading }] = useMutation<
		IHostListingMutation,
		IHostListingMutationVariables
	>(HOST_LISTING, {
		onCompleted: ({ hostListing }) => {
			displaySuccessNotification('You successfully created your listing!')
			history.push(`listing/${hostListing.id}`)
		},
		onError: () =>
			displayErrorMessage(
				'Sorry! We were not able to create listing. Please try again later'
			),
	})

	const [imageLoading, setImageLoading] = useState(false)
	const [imageBase64Value, setImageBase64Value] = useState<string | null>(null)

	const handleImageUpload = (info: UploadChangeParam) => {
		const { file } = info

		if (file.status === 'uploading') {
			setImageLoading(true)
			return
		}

		if (
			file.status === 'done' ||
			(file.status === 'error' && file.originFileObj)
		) {
			getBase64Value(file.originFileObj!, imageBase64Value => {
				setImageBase64Value(imageBase64Value)
				setImageLoading(false)
			})
			return
		}
	}

	if (!viewer || !viewer.id) {
		return (
			<Content className='host-content'>
				<div className='host__form-header'>
					<Title level={3} className='host__form-title'>
						You'll have to be signed in to host a listing
					</Title>
					<Text type='secondary'>
						We only allow users who've signed in to our application to host new
						listing. You can sign in at the <Link to='/login'>login </Link>
						page
					</Text>
				</div>
			</Content>
		)
	}

	if (loading) {
		return (
			<Content className='host-content'>
				<div className='host__form-header'>
					<Title level={3} className='host__form-title'>
						Please wait!
					</Title>
					<Text type='secondary'>We are creating your listing now.</Text>
				</div>
			</Content>
		)
	}

	return (
		<Content className='host-content'>
			<Form
				onFinishFailed={() =>
					displayErrorMessage('Please provide all required fields!')
				}
				onFinish={values => {
					const { city, state, postalCode, address, ...rest } = values

					const fullAddress = `${address}, ${city}, ${state}, ${postalCode}`
					const input = {
						...rest,
						address: fullAddress,
						image: imageBase64Value,
						price: values.price * 100,
					}

					hostListing({ variables: { input } })
				}}
				layout='vertical'
			>
				<div className='host__form-header'>
					<Title level={3} className='host__form-title'>
						Hi! Let's get started listing your place
					</Title>
					<Text type='secondary'>
						In this form, we'll collect some basic and additional information
						about your listing
					</Text>
				</div>

				<Item
					name='type'
					label='Home Type'
					rules={[
						{
							required: true,
							message: 'Please enter home type for your listing!',
						},
					]}
				>
					<Radio.Group>
						<Radio.Button value={listingType.Apartment}>
							<span>Apartment</span>
						</Radio.Button>
						<Radio.Button value={listingType.House}>
							<span>House</span>
						</Radio.Button>
					</Radio.Group>
				</Item>

				<Item
					label='Max # of guests'
					name='numOfGuests'
					rules={[
						{
							required: true,
							message: 'Please enter number of guests for your listing!',
						},
					]}
				>
					<InputNumber min={1} placeholder='4' />
				</Item>

				<Item
					label='Title'
					name='title'
					extra='Max characters count of 45'
					rules={[
						{
							required: true,
							message: 'Please enter a title for your listing!',
						},
					]}
				>
					<Input
						maxLength={45}
						placeholder='The iconic and luxurious Bel-Air mansion'
					/>
				</Item>

				<Item
					label='Description of listing'
					name='description'
					extra='Max characters count of 400'
					rules={[
						{
							required: true,
							message: 'Please enter a description for your listing!',
						},
					]}
				>
					<Input.TextArea
						rows={3}
						maxLength={400}
						placeholder='Modern,
						clean and iconic home of Fresh Prince situated in the heart of Bel-Air mansion'
					/>
				</Item>

				<Item
					label='Address'
					name='address'
					rules={[
						{
							required: true,
							message: 'Please enter a address for your listing!',
						},
					]}
				>
					<Input placeholder='251 North Bristol Avenue' />
				</Item>

				<Item
					label='City/Town'
					name='city'
					rules={[
						{
							required: true,
							message: 'Please enter a city/town for your listing!',
						},
					]}
				>
					<Input placeholder='Los Angeles' />
				</Item>

				<Item
					label='State/Province'
					name='state'
					rules={[
						{
							required: true,
							message: 'Please enter a state/province for your listing!',
						},
					]}
				>
					<Input placeholder='California' />
				</Item>

				<Item
					label='Postal/ZipCode'
					name='postalCode'
					rules={[
						{
							required: true,
							message: 'Please enter a postal/zipcode for your listing!',
						},
					]}
				>
					<Input placeholder='Please enter a zip code for your listing!' />
				</Item>

				<Item
					label='Image'
					name='image'
					extra='Images have to be under 1MB in size and of type JPG or PNG'
					rules={[
						{
							required: true,
							message: 'Please add an image for your listing!',
						},
					]}
				>
					<div className='host__form-image-upload'>
						<Upload
							name='image'
							listType='picture-card'
							className='avatar-uploader'
							showUploadList={false}
							action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
							beforeUpload={beforeImageUpload}
							onChange={handleImageUpload}
						>
							{imageBase64Value ? (
								<img
									style={{ width: 'auto', height: 'inherit' }}
									src={imageBase64Value}
									alt=''
								/>
							) : (
								<div>
									{imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
									<div className='ant-upload-text'>Upload</div>
								</div>
							)}
						</Upload>
					</div>
				</Item>

				<Item
					label='Price'
					name='price'
					extra='All prices in $USD/day'
					rules={[
						{
							required: true,
							message: 'Please enter a price for your listing!',
						},
					]}
				>
					<InputNumber min={0} placeholder='120' />
				</Item>

				<Item>
					<Button htmlType='submit' type='primary'>
						Submit
					</Button>
				</Item>
			</Form>
		</Content>
	)
}

const beforeImageUpload = (file: File) => {
	const fileIsValidImage =
		file.type === 'image/jpeg' || file.type === 'image/png'
	const fileIsValidSize = file.size / 1024 / 1024 < 1

	if (!fileIsValidImage) {
		displayErrorMessage("You're only able to upload valid JPG or PNG files!")
		return false
	}

	if (!fileIsValidSize) {
		displayErrorMessage(
			"You're only able to upload valid image files of under 1MB in size!"
		)
		return false
	}

	return fileIsValidImage && fileIsValidSize
}

const getBase64Value = (
	img: File | Blob,
	callback: (imageBase64Value: string) => void
) => {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result as string))
	reader.readAsDataURL(img)
}
