import React, { Component } from 'react';
import { TouchableOpacity, ListView, GridRow, Image, View, ImageBackground, Tile, Overlay, Row } from '@shoutem/ui';
import { Text, Icon, List, ListItem } from 'react-native-elements';
import { ImagePicker, Permissions, LinearGradient } from 'expo';
import _ from 'lodash';
import { Button } from 'native-base';
import goalsImages from '../../data/goalsImages';

const Styles = {
	row: {
		row: {
			display: 'flex',
			paddingLeft: 0,
			paddingRight: 0,
			paddingTop: 0,
			paddingBottom: 0,
		},
		button: {
			flex: 1,
			width: '100%',
			paddingLeft: 0,
			paddingRight: 0,
			paddingTop: 9,
			paddingBottom: 9,
		},
		text: {
			fontFamily: 'M-Regular',
			textAlign: 'center',
		},
	},
};

export default class GoalsGallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			image: this.props.image,
			savedImage: this.props.image,
			images: this.props.defaultImages,
			openedMenu: false,
		};
	}

	_toggleIsShow = () => {
		this.setState(prevState => ({
			isShow: !prevState.isShow,
		}));
	};

	_openMenu = () => this.setState({ openedMenu: true });
	_closeMenu = () => this.setState({ openedMenu: false });

	renderRow = (rowData, sectionId, index) => {
		const cellViews = rowData.map((item, id) => {
			return (
				<TouchableOpacity key={id} styleName="flexible" onPress={() => this._pickImage(item)}>
					<Image styleName="small" source={item} />
				</TouchableOpacity>
			);
		});

		return <GridRow columns={2}>{cellViews}</GridRow>;
	};

	_pickImage = uri => {
		this.setState({ image: uri });
	};

	_getImage = () => {
		this.props.getImage(this.state.image);
		this.setState({ isShow: false });
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
			base64: true,
		});

		if (!result.cancelled) {
			this.setState({ image: result.base64 });
			this._closeMenu();
		}
	};

	render() {
		const images = this.props.defaultImages;
		let { image } = this.props;

		const groupedData = GridRow.groupByRows(goalsImages, 2, () => {
			return 1;
		});

		const renderButtons = this.props.image !== this.state.image;

		return (
			<View
				style={{
					overflow: 'hidden',
					backgroundColor: '#fff',
				}}
			>
				<View>
					{!!image ? (
						<ImageBackground
							styleName="large-banner"
							source={_.isNumber(this.state.image) ? this.state.image : { uri: `data:image/jpeg;base64,${this.state.image}` }}
							// source={{
							// 	uri: this.state.image.indexOf('http') > -1 ? this.state.image : `data:image/jpeg;base64,${this.state.image}`,
							// }}
						>
							<TouchableOpacity
								styleName="fill-parent"
								style={{
									flex: 1,
									width: '100%',
								}}
								onPress={this._openMenu}
							>
								<Tile
									style={{
										position: 'absolute',
										bottom: 0,
										left: 0,
										width: '100%',
										backgroundColor: 'transparent',
									}}
								>
									<LinearGradient
										style={{
											width: '100%',
											paddingVertical: 15,
										}}
										start={[0.1, 0.1]}
										end={[1, 1]}
										colors={['rgba(252,145,93, .8)', 'rgba(252,211,116, .8)']}
									>
										<Text
											style={{
												width: '100%',
												textAlign: 'center',
												color: '#fff',
												fontSize: 14,
											}}
										>
											Кликните, что бы изменить изображение цели
										</Text>
									</LinearGradient>
								</Tile>
								{this.state.openedMenu && (
									<Tile
										style={{
											maxWidth: 150,
											marginHorizontal: 'auto',
											marginVertical: 10,
											borderRadius: 7,
											overflow: 'hidden',
										}}
									>
										<View styleName="column">
											<Row
												style={{
													backgroundColor: '#8700ca',
												}}
											>
												<Text style={{ color: '#fff' }}>ВЫБРАТЬ ФОТО</Text>
											</Row>

											<Row style={Styles.row.row}>
												<TouchableOpacity
													style={Styles.row.button}
													onPress={() => {
														this._closeMenu();
														this._toggleIsShow();
													}}
												>
													<Text style={Styles.row.text} numberOfLines={1}>
														БИБЛИОТЕКА
													</Text>
												</TouchableOpacity>
											</Row>
											<Row style={Styles.row.row}>
												<TouchableOpacity style={Styles.row.button} onPress={this._pickImageFromCamera}>
													<Text style={Styles.row.text} numberOfLines={1}>
														ГАЛЕРЕЯ
													</Text>
												</TouchableOpacity>
											</Row>
											<Row
												style={{
													...Styles.row.row,
													backgroundColor: 'rgba(207, 217, 237, .3)',
												}}
											>
												<TouchableOpacity style={Styles.row.button} onPress={this._closeMenu}>
													<Text style={Styles.row.text} numberOfLines={1}>
														ОТМЕНИТЬ
													</Text>
												</TouchableOpacity>
											</Row>
										</View>
									</Tile>
								)}

								{/*<View
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
												backgroundColor: this.state
													.isShow
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
												onPress={
													this._pickImageFromCamera
												}
											/>
											<Text>Галерея</Text>
										</View>
									</View> */}
							</TouchableOpacity>
						</ImageBackground>
					) : null}

					{this.state.isShow && <ListView style={{ backgroundColor: '#fff', padding: 10 }} columns={2} horizontal={true} data={groupedData} renderRow={this.renderRow} />}
				</View>
				{renderButtons && (
					<View
						styleName="horizontal h-center v-center"
						style={{
							backgroundColor: '#edf3ff',
							borderBottomWidth: 1,
							borderBottomColor: '#dde5f5',
							paddingVertical: 15,
						}}
					>
						<Button
							style={{
								width: 70,
								backgroundColor: '#8700ca',
								shadowColor: '#8700ca',
								shadowRadius: 15,
								elevation: 3,
								borderRadius: 7,
							}}
							onPress={this._getImage}
						>
							<Text
								style={{
									color: '#fff',
									fontFamily: 'M-Regular',
									fontSize: 12,
									width: '100%',
									textAlign: 'center',
								}}
							>
								OK
							</Text>
						</Button>
						<Button
							style={{
								width: 100,
								marginLeft: 10,
								backgroundColor: '#cfd9ed',
								shadowColor: '#cfd9ed',
								shadowRadius: 15,
								elevation: 3,
								borderRadius: 7,
							}}
							onPress={() =>
								this.setState({
									image: this.props.image,
									isShow: false,
								})
							}
						>
							<Text
								style={{
									color: '#000000',
									fontFamily: 'M-Regular',
									fontSize: 12,
									width: '100%',
									textAlign: 'center',
								}}
							>
								ОТМЕНА
							</Text>
						</Button>
					</View>
				)}
			</View>
		);
	}
}
