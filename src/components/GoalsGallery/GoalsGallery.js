import React, { Component } from 'react';
import { TouchableOpacity, ListView, GridRow, Image, View } from '@shoutem/ui';
import { Text, Icon, List, ListItem } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';

export default class GoalsGallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			image: this.props.image,
			images: this.props.defaultImages,
			restaurants: [
				{
					image: {
						url:
							'https://shoutem.github.io/static/getting-started/restaurant-1.jpg',
					},
				},
				{
					image: {
						url:
							'https://shoutem.github.io/static/getting-started/restaurant-2.jpg',
					},
				},
				{
					image: {
						url:
							'https://shoutem.github.io/static/getting-started/restaurant-3.jpg',
					},
				},
				{
					image: {
						url:
							'https://shoutem.github.io/static/getting-started/restaurant-3.jpg',
					},
				},
				{
					image: {
						url:
							'https://shoutem.github.io/static/getting-started/restaurant-3.jpg',
					},
				},
				{
					image: {
						url:
							'https://shoutem.github.io/static/getting-started/restaurant-3.jpg',
					},
				},
				{
					image: {
						url:
							'https://shoutem.github.io/static/getting-started/restaurant-3.jpg',
					},
				},
				{
					image: {
						url:
							'https://shoutem.github.io/static/getting-started/restaurant-3.jpg',
					},
				},
			],
		};
	}

	_toggleIsShow = () => {
		this.setState(prevState => ({
			isShow: !prevState.isShow,
		}));
	};

	renderRow = (rowData, sectionId, index) => {
		const cellViews = rowData.map((item, id) => {
			return (
				<TouchableOpacity
					key={item.id}
					styleName="flexible"
					onPress={() => this._pickImage(item.image)}
				>
					<Image styleName="small" source={{ uri: item.image }} />
				</TouchableOpacity>
			);
		});

		return <GridRow columns={2}>{cellViews}</GridRow>;
	};

	_pickImage = uri => {
		this.props.getImage(uri);
		this.setState({ image: uri });
	};

	_askPermissionsAsync = async () => {
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		// you would probably do something to verify that permissions
		// are actually granted, but I'm skipping that for brevity
	};

	_pickImageFromCamera = async () => {
		await this._askPermissionsAsync();
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: 'Images',
			quality: 0.1,
		});

		console.log(result);

		if (!result.cancelled) {
			this.props.getImage(result.uri);
			this.setState({ image: result.uri });
		}
	};

	render() {
		const { images } = this.state;

		const groupedData = GridRow.groupByRows(
			this.props.defaultImages,
			2,
			() => {
				return 1;
			},
		);

		return (
			<List>
				<View
					style={{
						overflow: 'hidden',
						padding: 5,
						backgroundColor: '#fff',
					}}
				>
					<View>
						<View
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								flexDirection: 'row',
								justifyContent: 'space-around',
								alignItems: 'center',
								padding: 15,
							}}
						>
							<View
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: this.state.isShow
										? '#000'
										: '#fff',
								}}
							>
								{this.state.isShow ? (
									<Icon
										name="wallpaper"
										size={32}
										color="#fff"
										onPress={this._toggleIsShow}
									/>
								) : (
									<Icon
										name="wallpaper"
										size={32}
										color="#000"
										onPress={this._toggleIsShow}
									/>
								)}

								<Text
									style={{
										color: this.state.isShow
											? '#fff'
											: '#000',
									}}
								>
									Библиотека
								</Text>
							</View>
							<View
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Icon
									name="insert-photo"
									size={32}
									onPress={this._pickImageFromCamera}
								/>
								<Text>Галерея</Text>
							</View>
						</View>
						{this.state.isShow && (
							<ListView
								style={{ backgroundColor: '#fff', padding: 10 }}
								columns={2}
								horizontal={true}
								data={groupedData}
								renderRow={this.renderRow}
							/>
						)}
						{!!this.state.image.length ? (
							<View
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									padding: 15,
								}}
							>
								<Text style={{ padding: 10 }}>
									Активное изображение
								</Text>
								<Image
									styleName="small"
									source={{ uri: this.state.image }}
								/>
							</View>
						) : null}
					</View>
				</View>
			</List>
		);
	}
}
