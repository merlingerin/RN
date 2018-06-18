import React from 'react';
import _ from 'lodash';
import { requestLogOut, checkIsAuth, logOut } from '../../ducks/profile';
import { fetchGoalsSuccess } from '../../ducks/goals';
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
import { fb } from '../../services/api';
import Expo from 'expo';
import { categorys } from '../../services/categorys';
import { createUser } from '../../services/api/user';
import { subscribeToGoals } from '../../services/api/goals';

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
			isModalVisible: false,
		};
	}

	componentDidMount() {
		fb.auth().onAuthStateChanged(user => {
			if (user) {
				let profile = {
					userPhoto: user.photoURL,
					name: user.displayName,
					email: user.email,
				};
				this.props.checkIsAuth(profile);

				fb.database()
					.ref(`users/${user.uid}/goals`)
					.on('value', snapshot => {
						const goals = _.keyBy(snapshot.val(), 'id');

						this.props.fetchGoalsSuccess(goals);
						createUser(user.uid, {
							profile: profile,
							goals: { ...this.props.goals, ...goals },
						});
					});
			} else {
				this.props.logOut();
			}
		});
		// if (!_.isEmpty(fb.auth().currentUser)) {
		// 	let user = fb.auth().currentUser;
		// let profile = {
		// 	user: {
		// 		userPhoto: user.photoURL,
		// 		name: user.displayName,
		// 		email: user.email,
		// 	},
		// };
		// 	this.props.singIn(profile);
		// }
		// fb.auth().onAuthStateChanged(user => {
		// 	if (user) {
		// 		// this.props.navigation.goBack();
		// 		console.log('auth!!!', user);
		// 		this.props.singIn(user);
		// 	} else {
		// 		alert('No user signed in');
		// 	}
		// });
	}

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
					onPress={() =>
						this.props.isAuth
							? this._navTo(category.categoryId)
							: false
					}
					// onPress={
					// 	this.state.isAuth
					// 		? () => this._navTo(category.categoryId)
					// 		: this._toggleModal
					// }
					key={category.categoryId}
					styleName="flexible"
				>
					<Card styleName="flexible  vertical v-end">
						<ImageBackground
							styleName="medium-wide  vertical v-end"
							style={{
								height: 180,
								justifyContent: 'flex-end',
							}}
							source={img}
						>
							<View
								styleName="content  vertical v-end"
								style={{ width: '100%' }}
							>
								<Overlay styleName="image-overlay  vertical v-end">
									<Subtitle
										styleName="h-center  vertical v-end"
										numberOfLines={4}
									>
										{category.categoryTitle}
									</Subtitle>
								</Overlay>
							</View>
						</ImageBackground>
					</Card>
				</TouchableOpacity>
			);
		});

		return <GridRow columns={2}>{cellViews}</GridRow>;
	}

	render() {
		const { profile, isAuth, categorys } = this.props;
		let isFirstArticle = true;
		const groupedData = GridRow.groupByRows(categorys, 2, () => {
			return 1;
		});
		return (
			<Screen>
				<Header
					// leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{
						text: 'Goals',
						style: { color: '#fff' },
					}}
					// rightComponent={{ icon: 'home', color: '#fff' }}
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
						// onPress={this._toggleModal}
						onPress={() =>
							this.props.navigation.navigate('ProfileScreen')
						}
						style={{
							borderWidth: 1,
							borderColor: 'rgba(0,0,0,0.2)',
							alignItems: 'center',
							justifyContent: 'center',
							margin: 'auto',

							width: 130,
							height: 130,
							backgroundColor: '#fff',
							borderRadius: 100,
							zIndex: 10,
							overflow: 'hidden',
						}}
					>
						<ImageBackground
							styleName="medium-square"
							style={{
								width: 130,
								height: 130,
								borderRadius: 100,
								justifyContent: 'flex-end',
								paddingBottom: 20,
							}}
							source={
								isAuth && profile.userPhoto
									? { uri: profile.userPhoto }
									: anonimProfile
							}
						>
							<View
								styleName="content  vertical v-end"
								style={{ width: '100%' }}
							>
								<Overlay
									style={{
										padding: 2,
									}}
								>
									<Heading style={{ fontSize: 14 }}>
										{isAuth ? profile.name : 'Авторизация'}
									</Heading>
								</Overlay>
							</View>
						</ImageBackground>
					</TouchableOpacity>
				</View>

				<ListView data={groupedData} renderRow={this.renderRow} />
				<AuthModal
					isVisible={this.state.isModalVisible}
					turnOffModal={this._turnOffModal}
					handleAuth={this.props.fetchProfile}
				/>
			</Screen>
		);
	}
}

const mapStateToProps = state => ({
	categorys: state.categorys,
	goals: state.goals,
	isAuth: state.profile.isAuth,
	profile: state.profile.profile,
});

const mapDispatchToProps = {
	requestLogOut,
	checkIsAuth,
	fetchGoalsSuccess,
	logOut,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomeScreen);
