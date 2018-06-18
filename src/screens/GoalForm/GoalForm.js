import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { saveNewGoal } from '../../services/api/goals';
import { addNewGoal, removeGoal } from '../../ducks/goals';
import { FlatList, Image, StyleSheet } from 'react-native';
import TimePicker from '../../components/TimePicker/TimePicker';
import GoalsGallery from '../../components/GoalsGallery/GoalsGallery';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import WeekDaysSegment from '../../components/WeekDaysSegment/WeekDaysSegment';
import { fb } from '../../services/api';
import {
	Header,
	List,
	ListItem,
	Text,
	CheckBox,
	Tile,
	Icon,
	Slider,
} from 'react-native-elements';
import {
	Container,
	Content,
	Tabs,
	Left,
	Right,
	Body,
	Card,
	H1,
	CardItem,
	Badge,
	Picker,
	Segment,
	Item,
	Label,
	Input,
	Button,
	Switch,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Title, View, Subtitle, Heading } from '@shoutem/ui';
import GoalTitleInput from '../../components/GoalTitleInput/GoalTitleInput';
import DeadlinePicker from '../../components/DeadlinePicker/DeadlinePicker';
// import LabelSelect from 'react-native-label-select';

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

const styles = {
	container: {
		inline: {
			display: 'flex',
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
	},
};

const defaultGoal = {
	active: 0,
	defaultGoal: false,
	activityRepeat: {
		days: [],
		id: 1,
		remidner: false,
		time: ['7:50'],
		title: 'каждый день',
	},
	goalTitle: 'Новая цель',
	deadline: '2021-08-31',
	goalCategory: {
		categoryId: 0,
		categoryTitle: 'Спорт, Здоровье',
		color: '#F38181',
	},
	// id: 'd001',
	image:
		'https://img.freepik.com/free-vector/business-concept-businessman-standing-on-the-arrows-that-are-shot-for-goal_1362-74.jpg?size=338&ext=jpg',
	timestamp: new Date(),
};

class GoalForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...defaultGoal,
			...(this.props.goal ? this.props.goal : {}),
			sliderValue: 1,
		};
		this.defaultGoalState = this.state = {
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
			deadline: date,
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

	componentWillReceiveProps(nextProps) {
		console.log('nextProps', nextProps);
	}

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
		this.setState({
			activityRepeat: {
				...this.state.activityRepeat,
				id: +value,
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

	toggleWeekButton = id => {
		let { days } = this.state.activityRepeat;

		if (_.some(days, item => id === item)) {
			this.setState({
				activityRepeat: {
					...this.state.activityRepeat,
					days: _.filter(
						this.state.activityRepeat.days,
						item => item !== id,
					),
				},
			});
		} else {
			this.setState({
				activityRepeat: {
					...this.state.activityRepeat,
					days: [...this.state.activityRepeat.days, id],
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
		goal.defaultGoal = _.isEqual(goal, this.defaultGoalState);
		goal.id ? false : (goal.id = uuidv4());
		// goal.timestamp = moment().format();
		// this.props.addNewGoal(goal);
		await saveNewGoal({
			...this.props.goals,
			[goal.id]: goal,
		});
		this.props.navigation.goBack();
	};

	_deleteGoal = async () => {
		let { id } = this.state;
		let goals = _.filter(this.props.goals, goal => goal.id !== id);
		let byId = _.keyBy(goals, 'id');
		this.props.removeGoal(byId);
		await saveNewGoal({ ...byId });
		this.props.navigation.goBack();
	};

	_finishedGoal = async () => {
		let goal = _.omit(this.state, ['sliderValue']);

		await fb
			.database()
			.ref(`/users/${fb.auth().currentUser.uid}/goals/${goal.id}`)
			.set({
				...goal,
				active: 2,
			});
		this.setState({ active: 2 });
	};

	_restartGoal = async () => {
		let goal = _.omit(this.state, ['sliderValue']);

		await fb
			.database()
			.ref(`/users/${fb.auth().currentUser.uid}/goals/${goal.id}`)
			.set({
				...goal,
				active: 0,
			});
		this.setState({ active: 0 });
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
							text: 'Редактировать цель',
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
									Цель завершена
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
						text: 'Редактировать цель',
						style: { color: '#fff' },
					}}
				/>
				<Content>
					<Text h4 style={{ paddingLeft: 10 }}>
						Описание
					</Text>
					<List>
						{this.state.id && (
							<ListItem
								// title="Включить достижение цели"
								hideChevron={true}
								subtitle={
									<View
										styleName="horizontal space-between"
										style={{ padding: 15 }}
									>
										<Subtitle>Приостановить цель</Subtitle>
										<Switch
											onValueChange={value =>
												this.setState({
													active: value ? 1 : 0,
												})
											}
											value={
												this.state.active === 1
													? true
													: false
											}
										/>
									</View>
								}
							/>
						)}
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
									date={moment(this.state.deadline).format(
										'YYYY-MM-DD',
									)}
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
						{this.state.activityRepeat.id === 4 && (
							<ListItem
								title="Дни активности"
								hideChevron={true}
								subtitle={
									<WeekDaysSegment
										toggleWeekButton={this.toggleWeekButton}
										pickedWeekDays={
											this.state.activityRepeat.days
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
						<Button
							iconLeft
							block
							primary
							disabled={_.isEqual(goal, this.defaultGoalState)}
							style={{ width: '100%', marginBottom: 10 }}
							onPress={this._createNewGoal}
						>
							<Text style={{ color: '#fff' }}>Сохранить</Text>
						</Button>
						{this.state.id &&
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
											Завершить
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
							)}
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
});

const mapDispatchToProps = {
	addNewGoal,
	removeGoal,
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalForm);
