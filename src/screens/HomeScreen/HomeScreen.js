import React from 'react';
import { NetInfo, Platform } from 'react-native';
import { LinearGradient, Notifications } from 'expo';
import { persistor } from '../../../App';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { requestLogOut, checkIsAuth, logOut, updateProfileData, syncFirebaseWithProfile } from '../../ducks/profile';
import { setSelectedFilter, setOpenedCategory } from '../../ducks/filterGoals';
import { fetchGoalsSuccess, addActivity, syncGoalsWithFirebase } from '../../ducks/goalsOffline';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { Icon, Avatar } from 'react-native-elements';
import Header from '../../components/CustomHeader/CustomHeader';
import CustomNewPicker from '../../components/CustomNewPicker';
import { TouchableOpacity, ImageBackground, Screen, Subtitle, ListView, GridRow, Card, View, Overlay, Tile, Image } from '@shoutem/ui';
import { fb } from '../../services/api';
import { store } from '../../../App';
import saveState from '../../utils/persistStoreFirebase';
import { chainStoreFirebase, chainFirebaseStore } from '../../utils/chainStoreFirebase';
import Styles from '../../styles/styles';
import registerForPushNotificationsAsync from '../../../api/registerForPushNotificationsAsync';

const anonimProfile = require('../../../assets/images/anonimProfile.png');

class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Карта целей',
		header: null,
	};

	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		this.state = {
			isModalVisible: false,
			listenning: false,
		};
	}

	persistStateWithFirebase(isConnected) {
		if (!isConnected) {
			return false;
		}
		return saveState(store.getState(), undefined, 'from mount');
	}

	_registerForPushNotifications = async () => {
		// Send our push token over to our backend so we can receive notifications
		// You can comment the following line out if you want to stop receiving
		// a notification every time you open the app. Check out the source
		// for this function in api/registerForPushNotificationsAsync.js
		const pushToken = await registerForPushNotificationsAsync();

		return pushToken;
		// Watch for incoming notifications
	};
	_handleNotification = notification => {
		// console.log('NOTIFICATION =>>>', notification);
		const handleTap = _.throttle(
			this.props.navigation.navigate('ActivityScreen', {
				goalId: notification.data.id,
			}),
			2000,
		);
	};
	// _handleNotification = ({ origin, data }) => {
	// 	console.log(
	// 		`Push notification ${origin} with data: ${JSON.stringify(data)}`,
	// 	);
	// };
	/**
	 * SYNC GOALS
	 */
	_syncFirebaseGoalsWithStore = uid =>
		_.throttle(
			fb
				.database()
				.ref(`goals/${uid}`)
				.on('value', snapshot => {
					let newGoals = snapshot.val();
					let { lastLocalUpdate } = store.getState().profile;
					let lastFirebaseUpdate = 1;
					// console.log('Platform.OS', Platform.OS);
					// console.log('SYNC FIREBASE GOALS WITH DB FIRED');
					const syncCheckAndStart = _.debounce(() => {
						return fb
							.database()
							.ref(`users/${uid}/lastUpdate`)
							.once('value')
							.then(snap => {
								lastFirebaseUpdate = snap.val() || 1;
								// ============================================================
								// console.log('/========================================/');
								// console.log('Platform.OS', Platform.OS);
								// console.log('GET LAST UPDATE FRON FB 0');
								// console.log('/========================================/');
								// ============================================================
								if (lastFirebaseUpdate && lastLocalUpdate < lastFirebaseUpdate) {
									this.props.syncGoalsWithFirebase(newGoals);
								}
							});
					}, 500);
					syncCheckAndStart();
				}),
			100,
		);

	_syncFirebaseProfileWithStore = uid =>
		_.throttle(
			fb
				.database()
				.ref(`users/${uid}`)
				.on('value', snap => {
					// ============================================================

					// console.log('Platform.OS', Platform.OS);
					// console.log('SYNC FIREBASE PROFILE WITH DB START');
					// ============================================================

					const syncCheckAndStart = _.throttle(() => {
						let { lastLocalUpdate } = store.getState().profile;
						let lastFirebaseUpdate = snap.val() && snap.val().lastUpdate ? snap.val().lastUpdate : 1;
						let newProfile = snap.val() && snap.val().profile ? snap.val().profile : {};
						// ============================================================
						// console.log('/========================================/');
						// console.log('Platform.OS', Platform.OS);
						// console.log('SYNC FIREBASE PROFILE WITH DB CHECK');
						// console.log('/========================================/');
						// ============================================================
						if (lastFirebaseUpdate && lastLocalUpdate < lastFirebaseUpdate) {
							this.props.syncFirebaseWithProfile(newProfile);
						}
					}, 500);
					syncCheckAndStart();
				}),
			1000,
		);

	/**
	 * SYNC DB WITH FIREBASE ON CHANGE STORE
	 */
	_syncDbWithFIrebase = () =>
		_.debounce(
			(this.unsubscribe = store.subscribe(
				_.throttle(() => {
					// console.log('Fire => START SUBSCRIBE');
					return chainStoreFirebase(store.getState(), this.props.fetchGoalsSuccess, this.props.updateProfileData);
				}, 500),
			)),
			1000,
		);

	componentDidMount() {
		const that = this;
		NetInfo.isConnected.addEventListener('connectionChange', this.persistStateWithFirebase);
		this._notificationSubscription = Notifications.addListener(this._handleNotification);
		fb.auth().onAuthStateChanged(async user => {
			if (user) {
				const pushToken = await this._registerForPushNotifications();
				const { uid } = user;

				let profile = { ...this.props.profile, uid: user.uid };
				if (user.photoURL && !this.props.profile.userPhoto) {
					profile.userPhoto = user.photoURL;
				}

				/**
				|--------------------------------------------------
				| CHECK AUTHRORIZATION USER; CREATE TOKEN FOR NOTIFICATION;
				| CREATE AUTHORIZATION SESSION
				|--------------------------------------------------
				*/
				// if (!this.state.listenning) {
				this.props.checkIsAuth(profile, pushToken);

				/**
				|--------------------------------------------------
				| SYNC FIREABSE GOALS WITH DATABASE ON FIREBASE CHANGE
				|--------------------------------------------------
				*/
				this._syncFirebaseGoalsWithStore(uid);
				/**
				 * SYNC FIREBASE PROFILE WITH DB ON FIREBASE CHANGE
				 */
				this._syncFirebaseProfileWithStore(uid);
				/**
				|--------------------------------------------------
				| SYNC DB WITH FIREBASE ON DATABASE CHANGE
				|--------------------------------------------------
				*/
				this._syncDbWithFIrebase();
				// this.setState({
				// 	listenning: true,
				// });
				// }
			} else {
				/**
				|--------------------------------------------------
				| CLEAN ASYNC STORAGE AND LOGOUT
				|--------------------------------------------------
				*/
				await persistor.purge();
				this.props.logOut();
			}
		});
	}

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener('connectionChange', this.persistStateWithFirebase);
		/**
		 * UNSUBSCRIBE ON CLOSE APP
		 */
		if (_.isFunction(this.unsubscribe)) {
			this.unsubscribe();
		}
	}

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

	renderRow(rowData) {
		const cellViews = _.map(rowData, item => {
			if (!item.active) {
				let img = item.image.file;
				return (
					<Animatable.View
						animation="fadeInUpBig"
						easing="ease-out"
						key={item.categoryId}
						style={{
							borderRadius: 9,
							overflow: 'hidden',
						}}
					>
						<TouchableOpacity
							style={{
								borderRadius: 9,
								overflow: 'hidden',
							}}
							onPress={() => (this.props.isAuth ? this._navTo(item.categoryId) : this.props.navigation.navigate('ProfileScreen'))}
							styleName="flexible"
						>
							<Card styleName="flexible v-center h-center">
								<ImageBackground
									styleName="medium-wide"
									style={{
										height: 180,
										justifyContent: 'flex-end',
									}}
									source={img}
								>
									<Tile styleName="clear fill-parent" style={Styles.homePage.categorys.tile}>
										<Image styleName="small h-center v-center" source={item.icon} />
										<Subtitle styleName="h-center v-center" numberOfLines={2} style={Styles.homePage.categorys.title}>
											{item.categoryTitle}
										</Subtitle>
									</Tile>
								</ImageBackground>
							</Card>
						</TouchableOpacity>
					</Animatable.View>
				);
			}
			// let image = item.image.indexOf('http') > -1 || _.isNumber(item) ? item.image : `data:image/jpeg;base64,${item.image}`;
			return (
				<Animatable.View
					animation="bounceIn"
					easing="ease-out"
					key={item.id}
					style={{
						borderRadius: 9,
						overflow: 'hidden',
					}}
				>
					<TouchableOpacity
						style={{
							borderRadius: 9,
							overflow: 'hidden',
						}}
						onPress={() =>
							this.props.isAuth
								? this.props.navigation.navigate('ActivityScreen', {
										goalId: item.id,
								  })
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
									borderRadius: 9,
									overflow: 'hidden',
								}}
								// source={{
								// 	uri: image,
								// }}
								source={_.isNumber(item.image) ? item.image : { uri: `data:image/jpeg;base64,${item.image}` }}
							>
								<View styleName="fill-parent horizontal h-start v-start">
									{!this._isHideActivityButton(item.physicalActivity) ? (
										<Animatable.View animation="zoomIn" easing="ease-out">
											<Icon
												raised
												name="check-circle"
												type="material-community"
												color="rgba(103,161,37,.8)"
												reverse
												reverseColor="rgba(255,255,255,1)"
												onPress={() => {
													this._addActivity(item.id);
													return this.refs.toast.show('Активность добавлена', 2000);
												}}
											/>
										</Animatable.View>
									) : null}
								</View>
								<View styleName="content  vertical v-end" style={{ width: '100%' }}>
									<Overlay styleName="image-overlay  vertical v-end">
										<Subtitle styleName="h-center  vertical v-end" numberOfLines={4}>
											{item.goalTitle && `${item.goalTitle.slice(0, 23)}...`}
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

		const userAvatar = this.props.profile && this.props.profile.userPhoto ? this.props.profile.userPhoto : null;

		return (
			<Screen>
				{/* <CustomNewPicker /> */}
				<LinearGradient style={{ flex: 1 }} colors={['#ffffff', '#edf3ff', '#edf3ff']}>
					<Header
						leftComponent={{
							icon: 'menu',
							color: '#fff',
							underlayColor: 'transparent',
							size: 36,
							onPress: () => this.props.navigation.navigate('DrawerOpen'),
						}}
						label={'ProfiGoals'}
						statusBarProps={{
							barStyle: 'light-content',
						}}
						rightComponent={
							isAuth && userAvatar ? (
								<Animatable.View animation="zoomIn" easing="ease-out">
									<Avatar width={36} height={36} rounded source={{ uri: userAvatar }} onPress={() => this.props.navigation.navigate('ProfileScreen')} activeOpacity={0.7} />
								</Animatable.View>
							) : (
								{
									icon: 'user-circle-o',
									type: 'font-awesome',
									color: '#fff',
									underlayColor: '#fff',
									reverseColor: '#8700ca',
									size: 36,
									onPress: () => this.props.navigation.navigate('ProfileScreen'),
								}
							)
						}
					/>
					<ListView
						style={{
							list: {
								backgroundColor: 'transparent',
							},
							listContent: {
								backgroundColor: 'transparent',
							},
						}}
						data={groupedData}
						renderRow={this.renderRow}
					/>

					<Toast ref="toast" />
				</LinearGradient>
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
	updateProfileData,
	syncFirebaseWithProfile,
	syncGoalsWithFirebase,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomeScreen);
