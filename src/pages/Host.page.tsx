import {
	Layout,
	Input,
	Typography,
	Form,
	InputNumber,
	Radio,
	Upload,
	Button,
} from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/lib/upload'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { displayErrorMessage, listingType } from 'utils'
import { useViewer } from 'ViewerContext'

const { Content } = Layout
const { Text, Title } = Typography
const { Item } = Form

export const Host = () => {
	const { viewer } = useViewer()
	const [imageLoading, setImageLoading] = useState(false)
	const [imageBase64Value, setImageBase64Value] = useState<string | null>(null)

	useEffect(() => {
		debugger
	}, [])

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

	return (
		<Content className='host-content'>
			<Form layout='vertical'>
				<div className='host__form-header'>
					<Title level={3} className='host__form-title'>
						Hi! Let's get started listing your place
					</Title>
					<Text type='secondary'>
						In this form, we'll collect some basic and additional information
						about your listing
					</Text>
				</div>

				<Item label='Home Type'>
					<Radio.Group>
						<Radio.Button value={listingType.Apartment}>
							<span>Apartment</span>
						</Radio.Button>
						<Radio.Button value={listingType.House}>
							<span>House</span>
						</Radio.Button>
					</Radio.Group>
				</Item>

				<Item label='Title' extra='Max characters count of 45'>
					<Input
						maxLength={45}
						placeholder='The iconic and luxurious Bel-Air mansion'
					/>
				</Item>

				<Item
					label='Description of listing'
					extra='Max characters count of 400'
				>
					<Input.TextArea
						rows={3}
						maxLength={400}
						placeholder='Modern,
						clean and iconic home of Fresh Prince situated in the heart of Bel-Air mansion'
					/>
				</Item>

				<Item label='Address'>
					<Input placeholder='251 North Bristol Avenue' />
				</Item>

				<Item label='City/Town'>
					<Input placeholder='Los Angeles' />
				</Item>

				<Item label='State/Province'>
					<Input placeholder='California' />
				</Item>

				<Item label='Postal/ZipCode'>
					<Input placeholder='Please enter a zip code for your listing!' />
				</Item>

				<Item
					label='Image'
					extra='Images have to be under 1MB in size and of type JPG or PNG'
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

				<Item label='Price' extra='All prices in $USD/day'>
					<InputNumber min={0} placeholder='120' />
				</Item>

				<Item>
					<Button type='primary'>Submit</Button>
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
