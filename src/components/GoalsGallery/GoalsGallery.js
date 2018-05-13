import React, { Component } from 'react';
import { TouchableOpacity, ListView, GridRow, Image, View } from '@shoutem/ui';
import { Text, Icon, List, ListItem } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';

export default class GoalsGallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			image: 'http://demo.makitweb.com/broken_image/images/noimage.png',
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
		const cellViews = rowData.map((restaurant, id) => {
			return (
				<TouchableOpacity
					key={id}
					styleName="flexible"
					onPress={() => this._pickImage(restaurant.image.url)}
				>
					<Image
						styleName="small"
						source={{ uri: restaurant.image.url }}
					/>
				</TouchableOpacity>
			);
		});

		return <GridRow columns={2}>{cellViews}</GridRow>;
	};

	_pickImage = uri => {
		this.setState({ image: uri });
	};

	_pickImageFromCamera = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: 'Images',
		});

		console.log(result);

		if (!result.cancelled) {
			this.setState({ image: result.uri });
		}
	};

	render() {
		const restaurants = this.state.restaurants;

		const groupedData = GridRow.groupByRows(restaurants, 2, () => {
			return 1;
		});

		return (
			<List>
				{/*<ListItem
							hideChevron={true}
							containerStyle={{
								borderBottomWidth: 0,
							}}
							subtitle={
								<CheckBox
									title="Изменить изображение цели"
									onPress={this.toggleNotification}
									checked={this.state.notification}
								/>
							}
						/>*/}
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
