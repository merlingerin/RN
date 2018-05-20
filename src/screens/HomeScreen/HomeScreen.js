import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import { Header } from 'react-native-elements';
import {
	TouchableOpacity,
	NavigationBar,
	ImageBackground,
	Title,
	Screen,
	Subtitle,
	Divider,
	ListView,
	GridRow,
	Card,
	Image,
	View,
	Caption,
	Button,
	Text,
	Icon,
	Tile,
	Overlay,
	Heading,
} from '@shoutem/ui';
import AuthModal from '../../components/AuthModal/AuthModal';
import GoalsCard from '../../components/GoalsCard/GoalsCard';
import { db, auth } from '../../services/api';
import Expo from 'expo';
import { categorys } from '../../services/categorys';

const credential = {
	androidClientId:
		'554183303492-7770qnitnolm6lfb1qsvnhn1nbfutm3a.apps.googleusercontent.com',
	iosClientId:
		'554183303492-omjg2o28ma84h5o3t1ee2nb07sfp3cab.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
};

const anonimProfile = require('../../../assets/images/anonimProfile.png');

class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Карта',
		header: null,
	};

	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		this.state = {
			isAuth: false,
			profile: {},
			isModalVisible: false,
			categorys: this.props.categorys,
		};
	}

	authWithGoogle = async () => {
		try {
			const result = await Expo.Google.logInAsync(credential);

			if (result.type === 'success') {
				console.log('result', result);
				this.setState({
					isAuth: true,
					profile: result,
				});
				return result.accessToken;
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			console.log('error ', e);

			return { error: true };
		}
	};

	_handlePress = () => {
		// auth
		// 	.signInWithEmailAndPassword('test@test.com', '123123')
		// 	.then(user => {
		// 		console.log('user', user);
		// 	})
		// 	.catch(function(error) {
		// 		// Handle Errors here.
		// 		var errorCode = error.code;
		// 		var errorMessage = error.message;
		// 		console.log(errorMessage);
		// 	});
	};

	componentDidMount() {
		// auth.onAuthStateChanged(function(user) {
		// 	if (user) {
		// 		// User is signed in.
		// 		var displayName = user.displayName;
		// 		var email = user.email;
		// 		var emailVerified = user.emailVerified;
		// 		var photoURL = user.photoURL;
		// 		var isAnonymous = user.isAnonymous;
		// 		var uid = user.uid;
		// 		var providerData = user.providerData;
		// 		console.log(displayName);
		// 		console.log(email);
		// 		console.log(photoURL);
		// 		console.log(uid);
		// 	}
		// });
		// db
		// 	.collection('users')
		// 	.get()
		// 	.then(querySnapshot => {
		// 		querySnapshot.forEach(doc => {
		// 			console.log(`${doc.id} => ${doc.data().profile.email}`);
		// 		});
		// 	});
	}

	_toggleModal = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
	};

	_turnOffModal = () => {
		this.setState({ isModalVisible: false });
	};

	_navTo = id => {
		this.props.navigation.navigate('GoalsScreen', {
			categoryId: id,
		});
	};

	renderRow(rowData, sectionId, index) {
		const cellViews = _.map(rowData, (category, id) => {
			let img = category.image.file;
			return (
				<TouchableOpacity
					onPress={() => this._navTo(category.categoryId)}
					// onPress={
					// 	this.state.isAuth
					// 		? () => this._navTo(category.categoryId)
					// 		: this._toggleModal
					// }
					key={category.categoryId}
					styleName="flexible"
				>
					<Card styleName="flexible">
						<Image styleName="medium-wide" source={img} />
						<View styleName="content">
							<Subtitle styleName="h-center" numberOfLines={4}>
								{category.categoryTitle}
							</Subtitle>
						</View>
						<View styleName="horizontal v-center">
							<Button styleName="secondary">
								<Icon name="plus-button" />
								<Text>Поставить цель</Text>
							</Button>
						</View>
					</Card>
				</TouchableOpacity>
			);
		});

		return <GridRow columns={2}>{cellViews}</GridRow>;
	}

	render() {
		const { categorys } = this.state;
		let isFirstArticle = true;
		const groupedData = GridRow.groupByRows(categorys, 2, () => {
			return 1;
		});
		return (
			<Screen>
				<Header
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{
						text: 'Goals',
						style: { color: '#fff' },
					}}
					rightComponent={{ icon: 'home', color: '#fff' }}
				/>
				<View
					style={{
						position: 'absolute',
						top: '42%',
						width: 200,
						height: 200,
						backgroundColor: 'transparent',
						alignItems: 'center',
						justifyContent: 'center',
						alignSelf: 'center',
						zIndex: 10,
					}}
				>
					<TouchableOpacity
						onPress={this._toggleModal}
						style={{
							borderWidth: 1,
							borderColor: 'rgba(0,0,0,0.2)',
							alignItems: 'center',
							justifyContent: 'center',
							margin: 'auto',

							width: 200,
							height: 200,
							backgroundColor: '#fff',
							borderRadius: 100,
							zIndex: 10,
							overflow: 'hidden',
						}}
					>
						<ImageBackground
							styleName="medium-square"
							style={{
								width: 200,
								height: 200,
								borderRadius: 100,
							}}
							source={
								this.state.isAuth
									? { uri: this.state.profile.user.photoUrl }
									: anonimProfile
							}
							// source={{
							// 	uri: this.state.isAuth
							// 		? this.state.profile.user.photoUrl
							// 		: anonimProfile,
							// }}
						>
							<Tile styleName="md-gutter-horizontal">
								<Overlay
									styleName="image-overlay"
									style={{
										padding: 2,
									}}
								>
									<Heading>
										{this.state.isAuth
											? this.state.profile.user.name
											: 'Авторизация'}
									</Heading>
								</Overlay>
							</Tile>
						</ImageBackground>
					</TouchableOpacity>
				</View>

				<ListView data={groupedData} renderRow={this.renderRow} />
				<AuthModal
					isVisible={this.state.isModalVisible}
					turnOffModal={this._turnOffModal}
					handleAuth={this.authWithGoogle}
				/>
			</Screen>
		);
	}
}

const mapStateToProps = state => ({
	categorys: state.categorys,
});

export default connect(mapStateToProps, null)(HomeScreen);
