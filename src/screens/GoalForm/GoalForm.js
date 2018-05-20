import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { addNewGoal } from '../../ducks/goals';
import { FlatList, Image, StyleSheet } from 'react-native';
import TimePicker from '../../components/TimePicker/TimePicker';
import GoalsGallery from '../../components/GoalsGallery/GoalsGallery';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import WeekDaysSegment from '../../components/WeekDaysSegment/WeekDaysSegment';
import {
	Header,
	List,
	ListItem,
	Text,
	CheckBox,
	Tile,
	Icon,
} from 'react-native-elements';
import {
	Container,
	Button,
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
	Switch,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Title, View, Subtitle } from '@shoutem/ui';
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
	active: false,
	activityRepeat: {
		days: [],
		id: 1,
		remidner: false,
		time: [],
		title: 'каждый день',
	},
	goalTitle: 'Новая цель',
	deadline: moment(),
	goalCategory: {
		categoryId: 0,
		categoryTitle: 'Спорт, Здоровье',
		color: '#F38181',
	},
	// id: 'd001',
	image:
		'https://img.freepik.com/free-vector/business-concept-businessman-standing-on-the-arrows-that-are-shot-for-goal_1362-74.jpg?size=338&ext=jpg',
	// timestamp: moment().format(),
};

class GoalForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...defaultGoal,
			...(this.props.navigation.getParam('goal')
				? this.props.navigation.getParam('goal')
				: {}),
		};
	}
	static navigationOptions = {
		title: 'Редактировать Цель',
		header: null,
	};

	_onDeadlineChange = date => {
		this.setState({
			deadline: date,
		});
	};

	addTimePicker = id => {
		this.setState({
			activityRepeat: {
				...this.state.activityRepeat,
				time: [
					...this.state.activityRepeat.time,
					{ id: _.random(1, 1000000), time: '21:12' },
				],
			},
		});
	};

	removeTimePicker = id => {
		let times = _.filter(this.state.activityRepeat.time, item => {
			return +item.id !== +id;
		});
		this.setState({
			activityRepeat: {
				...this.state.activityRepeat,
				time: times,
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

	_createNewGoal = () => {
		let goal = this.state;
		goal.id ? false : (goal.id = uuidv4());
		goal.timestamp = moment().format();
		this.props.addNewGoal(goal);
		this.props.navigation.goBack();
	};
	render() {
		console.log('GOAL', this.state);
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
						<ListItem
							// title="Включить достижение цели"
							hideChevron={true}
							subtitle={
								<View
									styleName="horizontal space-between"
									style={{ padding: 15 }}
								>
									<Subtitle>Включить цель</Subtitle>
									<Switch
										onValueChange={value =>
											this.setState({ active: value })
										}
										value={this.state.active}
									/>
								</View>
							}
						/>
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
						<ListItem
							hideChevron={true}
							containerStyle={{
								borderBottomWidth: 0,
							}}
							subtitle={
								<CheckBox
									title="Включить Напоминание"
									onPress={this.toggleNotification}
									checked={this.state.activityRepeat.reminder}
								/>
							}
						/>
						{this.state.activityRepeat.reminder
							? _.map(this.state.activityRepeat.time, item => (
									<ListItem
										key={item.id}
										containerStyle={{
											borderTopWidth: 0,
											borderBottomWidth: 0,
										}}
										leftIcon={{ name: 'access-time' }}
										rightIcon={{
											name: 'close',
										}}
										onPressRightIcon={() =>
											this.removeTimePicker(item.id)
										}
										subtitle={
											<View>
												<TimePicker time={item.time} />
											</View>
										}
									/>
							  ))
							: null}
						{this.state.activityRepeat.reminder ? (
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
							flexDirection: 'row',
							justifyContent: 'center',
							padding: 10,
						}}
					>
						<Button
							iconLeft
							transparent
							bordered
							dark
							block
							style={{ width: '100%' }}
							onPress={this._createNewGoal}
						>
							<Text>Сохранить</Text>
						</Button>
					</View>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	goals: state.goals,
	categorys: state.categorys,
});

const mapDispatchToProps = {
	addNewGoal,
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalForm);
