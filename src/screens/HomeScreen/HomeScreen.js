import React from 'react';
import { NetInfo } from 'react-native';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { requestLogOut, checkIsAuth, logOut } from '../../ducks/profile';
// import { fetchGoalsSuccess } from '../../ducks/goals';
import { setSelectedFilter, setOpenedCategory } from '../../ducks/filterGoals';
import { fetchGoalsSuccess, addActivity } from '../../ducks/goalsOffline';

import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { Header, Icon, Avatar } from 'react-native-elements';
import {
	TouchableOpacity,
	ImageBackground,
	Screen,
	Subtitle,
	ListView,
	GridRow,
	Card,
	View,
	Overlay,
	Heading,
} from '@shoutem/ui';
import { fb } from '../../services/api';
// import { addActivity } from '../../services/api/goals';
import { createUser } from '../../services/api/user';
import DrawerToggle from '../../components/DrawerToggle/DrawerToggle';
import { store } from '../../../App';
import saveState from '../../utils/persistStoreFirebase';

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

	persistStateWithFirebase(isConnected) {
		if (!isConnected) {
			return false;
		}
		return saveState(store.getState(), undefined, 'from mount');
	}

	componentDidMount() {
		let that = this;

		NetInfo.isConnected.addEventListener(
			'connectionChange',
			this.persistStateWithFirebase,
		);

		fb.auth().onAuthStateChanged(async user => {
			if (user) {
				let profile = {
					userPhoto: user.photoURL,
					email: user.email,
				};
				profile.uid = user.uid;
				profile.name = this.props.profile.name;

				if (user.displayName && user.displayName.length > 1) {
					profile.name = user.displayName;
				}

				this.props.checkIsAuth(profile);

				//New code
				// ============================================================
				saveState(
					store.getState(),
					this.props.fetchGoalsSuccess,
					'auth',
				);
				// await fb
				// 	.database()
				// 	.ref(`goals/${user.uid}`)
				// 	.once('value', snapshot => {
				// 		// console.log('snapshot.val()', snapshot.val());

				// 		// this.props.fetchGoalsSuccess(snapshot.val());
				// 	});

				//End new code
				// ============================================================

				that.unsubscribe = store.subscribe(() => {
					saveState(store.getState());
				});
			} else {
				// this.unsubscribe();
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

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener(
			'connectionChange',
			this.persistStateWithFirebase,
		);
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

	_addActivity = goalId => {
		const activity = {
			id: uuidv4(),
			date: moment().format(),
			createdDate: moment().format(),
		};

		this.props.addActivity(activity, goalId);
	};

	_isHideActivityButton = activity =>
		_.some(activity, activity => {
			let now = moment().format('YYYY-MM-DD');
			let date = moment(activity.date).format('YYYY-MM-DD');

			return moment(now).isSame(date);
		});

	_toggleModal = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
	};

	_turnOffModal = () => {
		this.setState({ isModalVisible: false });
	};

	_navTo = id => {
		this.props.setSelectedFilter(0);
		this.props.setOpenedCategory(id);
		this.props.navigation.navigate('GoalsScreen', {
			categoryId: id,
			selectedIndex: 0,
		});
	};

	renderRow(rowData, sectionId, index) {
		const cellViews = _.map(rowData, (item, id) => {
			if (!item.active) {
				let img = item.image.file;
				return (
					<Animatable.View
						animation="fadeInUpBig"
						easing="ease-out"
						key={item.categoryId}
					>
						<TouchableOpacity
							onPress={() =>
								this.props.isAuth
									? this._navTo(item.categoryId)
									: false
							}
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
												{item.categoryTitle}
											</Subtitle>
										</Overlay>
									</View>
								</ImageBackground>
							</Card>
						</TouchableOpacity>
					</Animatable.View>
				);
			}
			let image =
				item.image.indexOf('http') > -1
					? item.image
					: `data:image/jpeg;base64,${item.image}`;
			return (
				<Animatable.View
					animation="bounceIn"
					easing="ease-out"
					key={item.id}
				>
					<TouchableOpacity
						onPress={() =>
							this.props.isAuth
								? this.props.navigation.navigate(
										'ActivityScreen',
										{
											goal: item,
										},
								  )
								: false
						}
						styleName="flexible"
					>
						<Card styleName="flexible  vertical v-end">
							<ImageBackground
								styleName="medium-wide  vertical v-end"
								style={{
									height: 180,
									justifyContent: 'flex-end',
								}}
								source={{
									uri: image,
								}}
							>
								<View styleName="fill-parent horizontal h-start v-start">
									{!this._isHideActivityButton(
										item.physicalActivity,
									) ? (
										<Animatable.View
											animation="zoomIn"
											easing="ease-out"
										>
											<Icon
												raised
												name="pocket"
												type="material-community"
												color="#50ad4f"
												reverse
												onPress={() => {
													this._addActivity(item.id);
													return this.refs.toast.show(
														'Активность добавлена',
														2000,
													);
												}}
											/>
										</Animatable.View>
									) : null}
								</View>
								<View
									styleName="content  vertical v-end"
									style={{ width: '100%' }}
								>
									<Overlay styleName="image-overlay  vertical v-end">
										<Subtitle
											styleName="h-center  vertical v-end"
											numberOfLines={4}
										>
											{item.goalTitle}
										</Subtitle>
									</Overlay>
								</View>
							</ImageBackground>
						</Card>
					</TouchableOpacity>
				</Animatable.View>
			);
		});

		return <GridRow columns={2}>{cellViews}</GridRow>;
	}

	render() {
		const { profile, isAuth, categorys, goals, filteredGoals } = this.props;
		let renderedData = () => _.assign({}, categorys, filteredGoals);

		const groupedData = GridRow.groupByRows(renderedData(), 2, () => {
			return 1;
		});

		return (
			<Screen>
				<Header
					leftComponent={
						<DrawerToggle navigation={this.props.navigation} />
					}
					centerComponent={{
						text: 'Goals',
						style: { color: '#fff' },
					}}
					statusBarProps={{
						barStyle: 'light-content',
					}}
					// rightComponent={{
					// 	icon: 'person',
					// 	color: '#fff',
					// 	underlayColor: 'transparent',
					// 	onPress: () =>
					// 		this.props.navigation.navigate('ProfileScreen'),
					// }}
					rightComponent={
						<Animatable.View animation="zoomIn" easing="ease-out">
							<Avatar
								small
								rounded
								source={
									isAuth && profile.userPhoto
										? { uri: profile.userPhoto }
										: anonimProfile
								}
								onPress={() =>
									this.props.navigation.navigate(
										'ProfileScreen',
									)
								}
								activeOpacity={0.7}
							/>
						</Animatable.View>
					}
				/>
				{/*<View
					style={{
						position: 'absolute',
						top: '50%',
						width: 130,
						height: 130,
						backgroundColor: 'transparent',
						alignItems: 'center',
						justifyContent: 'center',
						alignSelf: 'center',
						zIndex: 10,
					}}
				>
					<Animatable.View animation="zoomIn" easing="ease-out">
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
											{isAuth ? '' : 'Авторизация'}
										</Heading>
									</Overlay>
								</View>
							</ImageBackground>
						</TouchableOpacity>
					</Animatable.View>
									</View>*/}

				{/*<ListView data={groupedData} renderRow={this.renderRow} />*/}
				<ListView data={groupedData} renderRow={this.renderRow} />

				<Toast ref="toast" />
			</Screen>
		);
	}
}

const mapStateToProps = state => ({
	categorys: state.categorys,
	goals: state.goalsOffline,
	isAuth: state.profile.isAuth,
	profile: state.profile.profile,
	filteredGoals: _.chain(state.goalsOffline)
		.filter({ defaultGoal: false, active: 1 })
		.groupBy(value => {
			return value.goalCategory.categoryId;
		})
		.map(value => {
			return _.maxBy(value, item => {
				return new Date(item.createdDate).getTime();
			});
		})
		.keyBy(item => item.goalCategory.categoryId)
		.value(),
});

const mapDispatchToProps = {
	requestLogOut,
	checkIsAuth,
	fetchGoalsSuccess,
	logOut,
	setSelectedFilter,
	setOpenedCategory,
	addActivity,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomeScreen);
