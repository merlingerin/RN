import React from 'react';
import { NetInfo } from 'react-native';
import { LinearGradient, Notifications } from 'expo';

import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { requestLogOut, checkIsAuth, logOut } from '../../ducks/profile';
import { setSelectedFilter, setOpenedCategory } from '../../ducks/filterGoals';
import { fetchGoalsSuccess, addActivity } from '../../ducks/goalsOffline';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { Icon, Avatar } from 'react-native-elements';
import Header from '../../components/CustomHeader/CustomHeader';
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
	Tile,
	Image,
} from '@shoutem/ui';
import { fb } from '../../services/api';
import { store } from '../../../App';
import saveState from '../../utils/persistStoreFirebase';
import Styles from '../../styles/styles';
import registerForPushNotificationsAsync from '../../../api/registerForPushNotificationsAsync';

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

	_registerForPushNotifications = async () => {
		// Send our push token over to our backend so we can receive notifications
		// You can comment the following line out if you want to stop receiving
		// a notification every time you open the app. Check out the source
		// for this function in api/registerForPushNotificationsAsync.js
		const pushToken = await registerForPushNotificationsAsync();

		return pushToken;
		// Watch for incoming notifications
		// this._notificationSubscription = Notifications.addListener(
		// 	this._handleNotification,
		// );
	};

	// _handleNotification = ({ origin, data }) => {
	// 	console.log(
	// 		`Push notification ${origin} with data: ${JSON.stringify(data)}`,
	// 	);
	// };

	componentDidMount() {
		const that = this;
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
				profile.name = this.props.profile.name || '';
				await fb
					.database()
					.ref(`users/${profile.uid}`)
					.once('value')
					.then(snap => {
						const value = snap.val();
						if (value && value.profile && value.profile.name) {
							profile.name = value.profile.name;
						}
					});

				if (user.displayName && user.displayName.length > 1) {
					profile.name = user.displayName || '';
				}
				const pushToken = await this._registerForPushNotifications();

				this.props.checkIsAuth(profile, pushToken);

				saveState(
					store.getState(),
					this.props.fetchGoalsSuccess,
					'auth',
				);

				that.unsubscribe = store.subscribe(() => {
					saveState(store.getState());
				});
			} else {
				this.props.logOut();
			}
		});
	}

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener(
			'connectionChange',
			this.persistStateWithFirebase,
		);
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
							onPress={() =>
								this.props.isAuth
									? this._navTo(item.categoryId)
									: false
							}
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
									<Tile
										styleName="clear fill-parent"
										style={Styles.homePage.categorys.tile}
									>
										<Image
											styleName="small h-center v-center"
											source={item.icon}
										/>
										<Subtitle
											styleName="h-center v-center"
											numberOfLines={2}
											style={
												Styles.homePage.categorys.title
											}
										>
											{item.categoryTitle}
										</Subtitle>
									</Tile>
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
									borderRadius: 9,
									overflow: 'hidden',
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
												name="check-circle"
												type="material-community"
												color="rgba(103,161,37,.8)"
												reverse
												reverseColor="rgba(255,255,255,1)"
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
				<LinearGradient
					style={{ flex: 1 }}
					colors={['#ffffff', '#edf3ff', '#edf3ff']}
				>
					<Header
						leftComponent={{
							icon: 'menu',
							color: '#fff',
							underlayColor: 'transparent',
							onPress: () =>
								this.props.navigation.navigate('DrawerOpen'),
						}}
						label={'Цели'}
						statusBarProps={{
							barStyle: 'light-content',
						}}
						rightComponent={
							isAuth && profile.userPhoto ? (
								<Animatable.View
									animation="zoomIn"
									easing="ease-out"
								>
									<Avatar
										small
										rounded
										source={{ uri: profile.userPhoto }}
										onPress={() =>
											this.props.navigation.navigate(
												'ProfileScreen',
											)
										}
										activeOpacity={0.7}
									/>
								</Animatable.View>
							) : (
								{
									icon: 'user-circle-o',
									type: 'font-awesome',
									color: '#fff',
									underlayColor: '#fff',
									reverseColor: '#8700ca',
									onPress: () =>
										this.props.navigation.navigate(
											'ProfileScreen',
										),
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
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomeScreen);
