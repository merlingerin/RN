import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import Styles from '../../styles/styles';
import { addNewGoal, removeGoal } from '../../ducks/goals';
import { saveNewGoal } from '../../ducks/goalsOffline';
import { StyleSheet, ScrollView } from 'react-native';
import TimePicker from '../../components/TimePicker/TimePicker';
import GoalsGallery from '../../components/GoalsGallery/GoalsGallery';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import WeekDaysSegment from '../../components/WeekDaysSegment/WeekDaysSegment';
import { fb } from '../../services/api';
import Header from '../../components/CustomHeader/CustomHeader';
import { List, ListItem, Text, Icon } from 'react-native-elements';
import { Container, Button } from 'native-base';
import { View, Heading, Screen, TouchableOpacity } from '@shoutem/ui';
import GoalTitleInput from '../../components/GoalTitleInput/GoalTitleInput';
import DeadlinePicker from '../../components/DeadlinePicker/DeadlinePicker';
import { activityRepeatTypeParser } from '../../utils/parsers';
import MonthCalendar from '../../components/MonthCalendar/MonthCalendar';
import { showLoader, hideLoader } from '../../ducks/loader';
import { goals } from '../../services/goals';
import recurrenceCreator from '../../utils/recurrenceCreator';

styles1 = StyleSheet.create({
	subtitleView: {
		flexDirection: 'row',
		paddingLeft: 10,
		paddingTop: 5,
	},
	ratingImage: {
		height: 19.21,
		width: 100,
	},
	ratingText: {
		paddingLeft: 10,
		color: 'grey',
	},
});

const defaultGoal = {
	active: 0,
	defaultGoal: true,
	activityRepeat: {
		weekDays: [],
		monthDays: {},
		id: 4,
		reminder: false,
		time: ['8:00'],
		title: 'каждый день',
	},
	goalTitle: '',
	deadline: moment().format(),
	goalCategory: {
		categoryId: 0,
		categoryTitle: 'Спорт, Здоровье',
		color: '#F38181',
	},
	image:
		'https://img.freepik.com/free-vector/business-concept-businessman-standing-on-the-arrows-that-are-shot-for-goal_1362-74.jpg?size=338&ext=jpg',
	timestamp: moment().format(),
};

class GoalForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...defaultGoal,
			...(this.props.goal ? this.props.goal : {}),
			sliderValue: 1,
		};
		this.defaultGoalState = {
			...defaultGoal,
			...(this.props.goal ? this.props.goal : {}),
		};
	}
	static navigationOptions = {
		title: 'Редактировать Цель',
		header: null,
	};

	_handleSlider = value => this.setState({ sliderValue: value });

	_onDeadlineChange = date => {
		this.setState({
			deadline: moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ssZ'),
		});
	};

	addTimePicker = id => {
		this.setState({
			activityRepeat: {
				...this.state.activityRepeat,
				time: [...this.state.activityRepeat.time, '20:00'],
			},
		});
	};

	removeTimePicker = id => {
		let times = _.filter(this.state.activityRepeat.time, (item, idx) => {
			return +idx !== +id;
		});
		this.setState({
			activityRepeat: {
				...this.state.activityRepeat,
				time: times,
			},
		});
	};

	handleChangeTime = (time, id) => {
		let newTimeArr = _.map(this.state.activityRepeat.time, (item, idx) => {
			return idx === id ? time : item;
		});

		this.setState({
			activityRepeat: {
				...this.state.activityRepeat,
				time: newTimeArr,
			},
		});
	};

	deleteItem = item => {
		let { arr } = this.state;
		let index = arr.findIndex(a => a === item);
		arr[index].isSelected = false;
		this.setState({ arr: arr });
	};

	onCategoryChange = value => {
		this.setState({
			goalCategory: {
				categoryId: +value,
				categoryTitle: this.props.categorys[+value].categoryTitle,
				color: this.props.categorys[+value].color,
			},
		});
	};

	onReminderIntervalChange = value => {
		const repeatType = activityRepeatTypeParser(+value);
		if (repeatType) {
			return this.setState({
				activityRepeat: {
					...this.state.activityRepeat,
					...repeatType,
				},
			});
		}
		return this.setState({
			activityRepeat: {
				...this.state.activityRepeat,
			},
		});
	};

	toggleNotification = () =>
		this.setState(prevState => ({
			activityRepeat: {
				...prevState.activityRepeat,
				reminder: !prevState.activityRepeat.reminder,
			},
		}));

	toggleShown = () => this.setState({ isShown: !this.state.isShown });

	toggleMonthDays = day => {
		let days = this.state.activityRepeat.monthDays || {};

		if (_.some(days, item => day.id === item.id)) {
			this.setState({
				activityRepeat: {
					...this.state.activityRepeat,
					monthDays: _.pickBy(days, item => item.id !== day.id),
				},
			});
		} else {
			this.setState({
				activityRepeat: {
					...this.state.activityRepeat,
					monthDays: {
						...days,
						[day.dateString]: {
							...day,
						},
					},
				},
			});
		}
	};

	toggleWeekButton = id => {
		let days = this.state.activityRepeat.weekDays || [];
		if (_.some(days, item => id === item)) {
			this.setState({
				activityRepeat: {
					...this.state.activityRepeat,
					weekDays: _.filter(days, item => item !== id),
				},
			});
		} else {
			this.setState({
				activityRepeat: {
					...this.state.activityRepeat,
					weekDays: [...days, id],
				},
			});
		}
	};

	_handleInputChange = text => {
		this.setState({
			goalTitle: text,
		});
	};

	_setImage = uri => this.setState({ image: uri });

	_createNewGoal = async () => {
		let goal = _.omit(this.state, ['sliderValue']);
		goal.active = 1;
		goal.lastModofiedDate = moment().format();
		goal.uid = this.props.profile.uid;
		if (this.state.defaultGoal) {
			goal.defaultGoal = false;
			goal.id = uuidv4();
			goal.createdDate = moment().format();
		}
		const recurrence = recurrenceCreator({ ...goal });

		if (recurrence !== null) {
			goal.recurrence = recurrence;
		}

		this.props.saveNewGoal(goal);

		this.props.navigation.goBack();
	};

	_deleteGoal = async () => {
		let { id } = this.props.goal;
		let goals = _.filter(this.props.goals, goal => goal.id !== id);
		let byId = _.keyBy(goals, 'id');
		this.props.removeGoal(byId);
		await saveNewGoal({ ...byId });
		this.props.hideLoader();
		this.props.navigation.navigate('HomeScreen');
	};

	_finishedGoal = async () => {
		let goal = _.omit(this.state, ['sliderValue']);
		goal.active = 2;
		await fb
			.database()
			.ref(`/users/${fb.auth().currentUser.uid}/goals/${goal.id}`)
			.set({
				...goal,
			});
		this.props.hideLoader();
		this.setState({ active: 2 });
	};

	_restartGoal = async () => {
		let goal = _.omit(this.state, ['sliderValue']);
		goal.active = 1;
		await fb
			.database()
			.ref(`/users/${fb.auth().currentUser.uid}/goals/${goal.id}`)
			.set({
				...goal,
			});
		this.props.hideLoader();
		this.setState({ active: 1 });
	};

	render() {
		let goal = _.omit(this.state, ['sliderValue']);
		if (this.state.active === 2) {
			return (
				<Container style={{ backgroundColor: 'blue' }}>
					<Header
						leftComponent={{
							icon: 'navigate-before',
							color: '#fff',
							underlayColor: 'transparent',
							onPress: () => this.props.navigation.goBack(),
						}}
						label={goal.goalTitle}
					/>

					<List style={{ backgroundColor: 'blue' }}>
						<ListItem
							// title="Включить достижение цели"
							hideChevron={true}
							subtitle={
								<Heading
									classNames="h-center"
									style={{ textAlign: 'center' }}
								>
									Цель достигнута
								</Heading>
							}
						/>
					</List>
					<View
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							padding: 10,
						}}
					>
						<Button
							iconLeft
							block
							success
							style={{ width: '100%', marginBottom: 10 }}
							onPress={this._restartGoal}
						>
							<Text style={{ color: '#fff' }}>
								Возобновить цель
							</Text>
						</Button>
					</View>
				</Container>
			);
		}
		return (
			<Screen styleName="paper">
				<Header
					leftComponent={{
						icon: 'navigate-before',
						color: '#fff',
						underlayColor: 'transparent',
						onPress: () => this.props.navigation.goBack(),
					}}
					label={goal.goalTitle}
				/>
				<ScrollView style={{ backgroundColor: '#edf3ff' }}>
					<GoalsGallery
						defaultImages={{ ...this.props.goals, ...goals }}
						image={this.state.image}
						getImage={this._setImage}
					/>
					<View
						style={
							{
								/**paddingLeft: 10*/
							}
						}
					>
						<View
							styleName="horizontal v-center space-between"
							style={{ ...Styles.borderBottom }}
						>
							<Text
								style={{
									...Styles.GoalForm.rowTitle,
									paddingLeft: 10,
								}}
							>
								КАТЕГОРИЯ ЦЕЛИ
							</Text>
							<CustomPicker
								selected={this.state.goalCategory.categoryId}
								onValueChange={this.onCategoryChange}
								type="categorys"
							/>
						</View>
						<View
							styleName="horizontal v-center space-between"
							style={{ ...Styles.borderBottom }}
						>
							<Text
								style={{
									...Styles.GoalForm.rowTitle,
									paddingLeft: 10,
								}}
							>
								ЦЕЛЬ
							</Text>
							<GoalTitleInput
								value={this.state.goalTitle}
								onChangeText={text =>
									this.setState({ goalTitle: text })
								}
							/>
						</View>
						<View
							styleName="horizontal v-center space-between"
							style={{ ...Styles.borderBottom }}
						>
							<Text
								style={{
									...Styles.GoalForm.rowTitle,
									paddingLeft: 10,
								}}
							>
								СРОК ДОСТИЖЕНИЯ
							</Text>
							<DeadlinePicker
								date={this.state.deadline}
								onDateChange={this._onDeadlineChange}
							/>
						</View>
						<View
							styleName="horizontal v-center space-between"
							style={{ ...Styles.borderBottom }}
						>
							<Text
								style={{
									...Styles.GoalForm.rowTitle,
									paddingLeft: 10,
								}}
							>
								АКТИВНОСТЬ
							</Text>
							<View style={{ marginLeft: 'auto' }}>
								<CustomPicker
									selected={this.state.activityRepeat.id}
									onValueChange={
										this.onReminderIntervalChange
									}
									type="reminder"
								/>
							</View>
						</View>
						{this.state.activityRepeat.id === 5 && (
							<View styleName="horizontal v-center space-between">
								<MonthCalendar
									markedDays={
										goal.activityRepeat.monthDays || {}
									}
									toggleMonthDays={this.toggleMonthDays}
								/>
							</View>
						)}
						{this.state.activityRepeat.id === 4 && (
							<View
								styleName="horizontal v-center h-center "
								style={{
									width: '100%',
								}}
							>
								<WeekDaysSegment
									toggleWeekButton={this.toggleWeekButton}
									pickedWeekDays={
										this.state.activityRepeat.weekDays
									}
								/>
							</View>
						)}
						{this.state.activityRepeat.id !== 0
							? _.map(
									this.state.activityRepeat.time,
									(item, idx) => (
										<ListItem
											key={idx}
											containerStyle={{
												borderTopWidth: 0,
												borderBottomWidth: 0,
											}}
											hideChevron={false}
											leftIcon={{
												name: 'access-time',
												color: '#8700ca',
											}}
											rightIcon={
												idx === 0
													? {
															name:
																'ios-close-circle',
															color:
																'transparent',
															type: 'ionicon',
													  }
													: {
															name:
																'ios-close-circle',
															color: '#8700ca',
															type: 'ionicon',
													  }
											}
											onPressRightIcon={() =>
												idx === 0
													? null
													: this.removeTimePicker(idx)
											}
											subtitle={
												<View>
													<TimePicker
														time={item}
														idx={idx}
														handleChange={
															this
																.handleChangeTime
														}
													/>
												</View>
											}
										/>
									),
							  )
							: null}
						{this.state.activityRepeat.id !== 0 ? (
							this.state.activityRepeat.time.length < 3 ? (
								<View
									styleName="horizontal v-center h-center space-between"
									style={{
										width: 200,
										margin: 'auto',
										backgroundColor: '#fff',
										elevation: 3,
										paddingHorizontal: 20,
										paddingVertical: 7,
										borderRadius: 7,
									}}
								>
									<TouchableOpacity
										onPress={() => this.addTimePicker()}
										style={{
											display: 'flex',
											flex: 1,
											width: '100%',
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'space-between',
										}}
									>
										<Icon
											name="md-add-circle"
											type="ionicon"
											style={{
												shadowColor: '#8700ca',
												shadowOffset: {
													width: 0,
													height: 0,
												},
												shadowOpacity: 0.2,
												shadowRadius: 30,
											}}
											color="#8700ca"
										/>
										<Text
											style={{
												textAlign: 'center',
												fontFamily: 'M-Regular',
												fontSize: 12,
												lineHeight: 12,
											}}
										>
											ДОБАВИТЬ ВРЕМЯ
										</Text>
									</TouchableOpacity>
								</View>
							) : // <ListItem
							// 	containerStyle={{
							// 		borderBottomColor: 'transparent',
							// 	}}
							// 	hideChevron={true}
							// 	leftIcon={{ name: 'add', color: '#8700ca' }}
							// 	onPressRightIcon={() =>
							// 		this.addTimePicker()
							// 	}
							// 	onPress={() => this.addTimePicker()}
							// 	subtitle={
							// 		<Text
							// 			style={{
							// 				textAlign: 'left',
							// 				fontFamily: 'M-Regular',
							// 			}}
							// 		>
							// 			ДОБАВИТЬ ВРЕМЯ
							// 		</Text>
							// 	}
							// />
							null
						) : null}
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: 10,
							}}
						>
							{!_.isEqual(goal, this.defaultGoalState) &&
								!!goal.goalTitle.length && (
									<Button
										iconLeft
										block
										primary
										style={{
											width: '100%',
											marginBottom: 10,
											backgroundColor: '#8700ca',
											shadowColor: '#8700ca',
											shadowRadius: 15,
											elevation: 3,
											borderRadius: 7,
										}}
										onPress={this._createNewGoal}
									>
										<Text
											style={{
												color: '#fff',
												fontFamily: 'M-Regular',
												fontSize: 12,
											}}
										>
											СОХРАНИТЬ
										</Text>
									</Button>
								)}
						</View>
					</View>
				</ScrollView>
			</Screen>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	goals: state.goalsOffline,
	goal: ownProps.navigation.getParam('goal')
		? state.goalsOffline[ownProps.navigation.getParam('goal').id] ||
		  goals[ownProps.navigation.getParam('goal').id]
		: {},
	categorys: state.categorys,
	profile: state.profile.profile,
	loading: state.loader.isShown,
});

const mapDispatchToProps = {
	addNewGoal,
	removeGoal,
	showLoader,
	hideLoader,
	saveNewGoal,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(GoalForm);
