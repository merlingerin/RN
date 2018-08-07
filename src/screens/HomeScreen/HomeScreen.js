import React from 'react';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { requestLogOut, checkIsAuth, logOut } from '../../ducks/profile';
import { fetchGoalsSuccess } from '../../ducks/goals';
import { setSelectedFilter, setOpenedCategory } from '../../ducks/filterGoals';
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
import { addActivity } from '../../services/api/goals';
import { createUser } from '../../services/api/user';

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
		fb.auth().onAuthStateChanged(async user => {
			if (user) {
				let profile = {
					userPhoto: user.photoURL,
					name: user.displayName || this.props.profile.name || '',
					email: user.email,
				};
				this.uid = user.uid;
				this.props.checkIsAuth(profile);

				await fb
					.database()
					.ref(`users/${user.uid}/goals`)
					.on('value', snapshot => {
						const goals = _.keyBy(snapshot.val(), 'id');

						this.props.fetchGoalsSuccess(goals);
						createUser(user.uid, {
							profile: profile,
							goals: { ...goals },
						});
					});
				await fb
					.database()
					.ref(`users/${user.uid}/goals`)
					.update({ ...this.props.goals });
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
												onPress={async () => {
													const id = uuidv4();
													await addActivity(
														id,
														item,
														this.uid,
													);
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
					// leftComponent={{ icon: 'menu', color: '#fff' }}
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
	goals: state.goals,
	isAuth: state.profile.isAuth,
	profile: state.profile.profile,
	filteredGoals: _
		.chain(state.goals)
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
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomeScreen);
