import React, { Component } from 'react';
import {
	TouchableOpacity,
	ListView,
	GridRow,
	Image,
	View,
	ImageBackground,
	Tile,
	Overlay,
	Row,
} from '@shoutem/ui';
import { Text, Icon, List, ListItem } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';
import _ from 'lodash';

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
			base64: true,
		});

		if (!result.cancelled) {
			this.props.getImage(result.base64);
			this.setState({ image: result.base64 });
			this._closeMenu();
		}
	};

	render() {
		const images = this.props.defaultImages;
		let { image } = this.props;

		const groupedData = GridRow.groupByRows(
			this.props.defaultImages,
			2,
			() => {
				return 1;
			},
		);

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
							source={{
								uri:
									this.state.image.indexOf('http') > -1
										? this.state.image
										: `data:image/jpeg;base64,${
												this.state.image
										  }`,
							}}
						>
							<TouchableOpacity
								styleName="fill-parent"
								style={{
									flex: 1,
									width: '100%',
								}}
								onPress={this._openMenu}
							>
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
												<Text style={{ color: '#fff' }}>
													ВЫБРАТЬ ФОТО
												</Text>
											</Row>

											<Row style={Styles.row.row}>
												<TouchableOpacity
													style={Styles.row.button}
													onPress={() => {
														this._closeMenu();
														this._toggleIsShow();
													}}
												>
													<Text
														style={Styles.row.text}
														numberOfLines={1}
													>
														БИБЛИОТЕКА
													</Text>
												</TouchableOpacity>
											</Row>
											<Row style={Styles.row.row}>
												<TouchableOpacity
													style={Styles.row.button}
													onPress={
														this
															._pickImageFromCamera
													}
												>
													<Text
														style={Styles.row.text}
														numberOfLines={1}
													>
														ГАЛЕРЕЯ
													</Text>
												</TouchableOpacity>
											</Row>
											<Row
												style={{
													...Styles.row.row,
													backgroundColor:
														'rgba(207, 217, 237, .3)',
												}}
											>
												<TouchableOpacity
													style={Styles.row.button}
													onPress={this._closeMenu}
												>
													<Text
														style={Styles.row.text}
														numberOfLines={1}
													>
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

					{this.state.isShow && (
						<ListView
							style={{ backgroundColor: '#fff', padding: 10 }}
							columns={2}
							horizontal={true}
							data={groupedData}
							renderRow={this.renderRow}
						/>
					)}
				</View>
			</View>
		);
	}
}
