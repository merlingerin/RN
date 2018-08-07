import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { saveNewGoal } from '../../services/api/goals';
import { addNewGoal, removeGoal } from '../../ducks/goals';
import { StyleSheet } from 'react-native';
import TimePicker from '../../components/TimePicker/TimePicker';
import GoalsGallery from '../../components/GoalsGallery/GoalsGallery';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import WeekDaysSegment from '../../components/WeekDaysSegment/WeekDaysSegment';
import { fb } from '../../services/api';
import { Header, List, ListItem, Text } from 'react-native-elements';
import { Container, Content, Button } from 'native-base';
import { View, Heading } from '@shoutem/ui';
import GoalTitleInput from '../../components/GoalTitleInput/GoalTitleInput';
import DeadlinePicker from '../../components/DeadlinePicker/DeadlinePicker';
import { activityRepeatTypeParser } from '../../utils/parsers';
import MonthCalendar from '../../components/MonthCalendar/MonthCalendar';
import Spinner from 'react-native-loading-spinner-overlay';
import { showLoader, hideLoader } from '../../ducks/loader';

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
		id: 1,
		remidner: false,
		time: ['7:50'],
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
				time: [...this.state.activityRepeat.time, '21:12'],
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
		this.props.showLoader();
		let goal = _.omit(this.state, ['sliderValue']);
		goal.active = 1;
		goal.lastModofiedDate = moment().format();
		if (this.state.defaultGoal) {
			goal.defaultGoal = false;
			goal.id = uuidv4();
			goal.createdDate = moment().format();
		}

		await fb
			.database()
			.ref(`/users/${fb.auth().currentUser.uid}/goals/${goal.id}`)
			.set({
				...goal,
			});
		this.props.hideLoader();
		this.props.navigation.goBack();
	};

	_deleteGoal = async () => {
		this.props.showLoader();
		let { id } = this.props.goal;
		let goals = _.filter(this.props.goals, goal => goal.id !== id);
		let byId = _.keyBy(goals, 'id');
		this.props.removeGoal(byId);
		await saveNewGoal({ ...byId });
		this.props.hideLoader();
		this.props.navigation.navigate('HomeScreen');
	};

	_finishedGoal = async () => {
		this.props.showLoader();
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
		this.props.showLoader();
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
				<Container>
					<Header
						leftComponent={{
							icon: 'navigate-before',
							color: '#fff',
							underlayColor: 'transparent',
							onPress: () => this.props.navigation.goBack(),
						}}
						centerComponent={{
							text: goal.goalTitle,
							style: { color: '#fff' },
						}}
					/>

					<List>
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
			<Container>
				<Header
					leftComponent={{
						icon: 'navigate-before',
						color: '#fff',
						underlayColor: 'transparent',
						onPress: () => this.props.navigation.goBack(),
					}}
					centerComponent={{
						text: goal.goalTitle,
						style: { color: '#fff' },
					}}
				/>
				<Content>

					<List>
						<ListItem
							title="Категория цели"
							hideChevron={true}
							subtitle={
								<CustomPicker
									selected={
										this.state.goalCategory.categoryId
									}
									onValueChange={this.onCategoryChange}
									type="categorys"
								/>
							}
						/>
						<ListItem
							title="Цель"
							hideChevron={true}
							subtitle={
								<GoalTitleInput
									value={this.state.goalTitle}
									onChangeText={text =>
										this.setState({ goalTitle: text })
									}
								/>
							}
						/>

						<ListItem
							title="Срок достижения"
							hideChevron={true}
							subtitle={
								<DeadlinePicker
									date={this.state.deadline}
									onDateChange={this._onDeadlineChange}
								/>
							}
						/>
					</List>
					<Text h4 style={{ paddingLeft: 10 }}>
						Активность
					</Text>
					<List>
						<ListItem
							title="Повторять активность"
							style={{
								borderBottomWidth: 0,
							}}
							hideChevron={true}
							subtitle={
								<CustomPicker
									selected={this.state.activityRepeat.id}
									onValueChange={
										this.onReminderIntervalChange
									}
									type="reminder"
								/>
							}
						/>
						{this.state.activityRepeat.id === 5 && (
							<MonthCalendar
								markedDays={goal.activityRepeat.monthDays || {}}
								toggleMonthDays={this.toggleMonthDays}
							/>
						)}
						{this.state.activityRepeat.id === 4 && (
							<ListItem
								title="Дни активности"
								hideChevron={true}
								subtitle={
									<WeekDaysSegment
										toggleWeekButton={this.toggleWeekButton}
										pickedWeekDays={
											this.state.activityRepeat.weekDays
										}
									/>
								}
							/>
						)}

						{/*this.state.activityRepeat.id !== 0 && (
							<ListItem
								hideChevron={true}
								containerStyle={{
									borderBottomWidth: 0,
								}}
								subtitle={
									<CheckBox
										title="Включить Напоминание"
										onPress={this.toggleNotification}
										checked={
											this.state.activityRepeat.reminder
										}
									/>
								}
							/>
						)*/}
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
											hideChevron={
												idx === 0 ? true : false
											}
											leftIcon={{ name: 'access-time' }}
											rightIcon={
												idx === 0
													? {}
													: {
															name: 'close',
													  }
											}
											onPressRightIcon={() =>
												this.removeTimePicker(idx)
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
								<ListItem
									rightIcon={{ name: 'add' }}
									onPressRightIcon={() =>
										this.addTimePicker()
									}
									onPress={() => this.addTimePicker()}
									subtitle={<Text>Добавить время</Text>}
								/>
							) : null
						) : null}
					</List>
					<Text h4 style={{ paddingLeft: 10 }}>
						Изображение цели
					</Text>

					<GoalsGallery
						defaultImages={this.props.goals}
						image={this.state.image}
						getImage={this._setImage}
					/>
					<View
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							padding: 10,
						}}
					>
						{!_.isEqual(goal, this.defaultGoalState) &&
							!!goal.goalTitle.length && (
								<Button
									iconLeft
									block
									primary
									style={{ width: '100%', marginBottom: 10 }}
									onPress={this._createNewGoal}
								>
									<Text style={{ color: '#fff' }}>
										Сохранить
									</Text>
								</Button>
							)}

						{/*this.state.id &&
							!this.state.defaultGoal && (
								<React.Fragment>
									<Button
										iconLeft
										block
										success
										style={{
											width: '100%',
											marginBottom: 10,
										}}
										onPress={this._finishedGoal}
									>
										<Text style={{ color: '#fff' }}>
											Достигнуть
										</Text>
									</Button>
									<Button
										iconLeft
										block
										danger
										style={{
											width: '100%',
											marginBottom: 10,
										}}
										onPress={this._deleteGoal}
									>
										<Text style={{ color: '#fff' }}>
											Удалить
										</Text>
									</Button>
								</React.Fragment>
						)*/}
					</View>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	goals: state.goals,
	goal: ownProps.navigation.getParam('goal')
		? _.find(state.goals, {
				id: ownProps.navigation.getParam('goal').id,
		  })
		: {},
	categorys: state.categorys,
	profile: state.profile,
	loading: state.loader.isShown,
});

const mapDispatchToProps = {
	addNewGoal,
	removeGoal,
	showLoader,
	hideLoader,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(GoalForm);
