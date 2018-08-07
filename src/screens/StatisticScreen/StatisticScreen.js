import React from 'react';
import _ from 'lodash';
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
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Title, Heading, Screen, View, Subtitle } from '@shoutem/ui';
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

const weekDays = [
	{
		id: '0',
		title: 'Пт',
	},
	{
		id: '1',
		title: 'Вт',
	},
	{
		id: '2',
		title: 'Ср',
	},
	{
		id: '3',
		title: 'Чт',
	},
	{
		id: '4',
		title: 'Пт',
	},
	{
		id: '5',
		title: 'Сб',
	},
	{
		id: '6',
		title: 'Вс',
	},
];

export default class GoalForm extends React.Component {
	static navigationOptions = {
		title: 'Редактировать Цели',
		header: null,
	};

	state = {
		notification: true,
		categoryKey: 2,
		reminderInterval: 3,
		goalTitle: 'Чиканить мяч 20 минут',
		pickedWeekDays: [1, 5],
		isShown: false,
		selected: 'key2',
		time: [
			{
				id: 1,
				time: '21:15',
			},
		],
		date: '2018-05-01',
		arr: [
			{
				name: 'Aspirin',
				isSelected: false,
				value: 1,
			},
			{
				name: 'MarginTop',
				isSelected: true,
				value: 2,
			},
			{
				name: 'Dooper',
				isSelected: true,
				value: 3,
			},
			{
				name: 'Young Skywalker',
				isSelected: false,
				value: 4,
			},
			{
				name: 'Jedi Master',
				isSelected: true,
				value: 5,
			},
			{
				name: 'Anakin',
				isSelected: false,
				value: 6,
			},
			{
				name: 'ナウシカ',
				isSelected: false,
				value: 7,
			},
			{
				name: '你好',
				isSelected: false,
				value: 8,
			},
		],
	};

	_onDeadlineChange = date => {
		this.setState({
			date: date,
		});
	};

	addTimePicker = id => {
		this.setState({
			time: [
				...this.state.time,
				{ id: _.random(1, 10000), time: '21:12' },
			],
		});
	};

	removeTimePicker = id => {
		let times = _.remove(this.state.time, item => {
			return +item.id === +id;
		});
		this.setState({});
	};

	selectConfirm = list => {
		let { arr } = this.state;
		for (let item of list) {
			let index = arr.findIndex(ele => ele === item);
			if (~index) {
				arr[index].isSelected = true;
			} else {
				continue;
			}
		}
		this.setState({ arr: arr });
	};

	deleteItem = item => {
		let { arr } = this.state;
		let index = arr.findIndex(a => a === item);
		arr[index].isSelected = false;
		this.setState({ arr: arr });
	};

	onCategoryChange = value => {
		this.setState({
			categoryKey: value,
		});
	};

	onReminderIntervalChange = value => {
		this.setState({
			reminderInterval: value,
		});
	};

	toggleNotification = () =>
		this.setState(prevState => ({
			notification: !prevState.notification,
		}));

	toggleShown = () => this.setState({ isShown: !this.state.isShown });

	toggleWeekButton = id => {
		if (_.some(this.state.pickedWeekDays, item => id === item)) {
			this.setState({
				pickedWeekDays: _.filter(
					this.state.pickedWeekDays,
					item => item !== id,
				),
			});
		} else {
			this.setState({
				pickedWeekDays: [...this.state.pickedWeekDays, id],
			});
		}
	};

	_handleInputChange = e => {
		this.setState({
			goalTitle: e.target.value,
		});
	};

	render() {
		return (
			<Screen styleName="paper">
				<Header
					centerComponent={{
						text: 'No page',
						style: { color: '#fff' },
					}}
					rightComponent={{
						icon: 'home',
						color: '#fff',
						onPress: () =>
							this.props.navigation.navigate('HomeScreen'),
					}}
				/>
				<View classNames="horizontal h-center">
					{' '}
					<Heading style={{ textAlign: 'center' }}>No page</Heading>
				</View>
			</Screen>
		);
	}
}
{
	/*<Container>
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
							title="Категория цели"
							hideChevron={true}
							subtitle={
								<CustomPicker
									selected={this.state.categoryKey}
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
									onChange={this._handleInputChange}
								/>
							}
						/>
						<ListItem
							title="Срок достижения"
							hideChevron={true}
							subtitle={
								<DeadlinePicker
									date={this.state.date}
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
									selected={this.state.reminderInterval}
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
							subtitle={<WeekDaysSegment />}
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
									checked={this.state.notification}
								/>
							}
						/>
						{this.state.notification
							? this.state.time.map(item => (
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
						{this.state.notification ? (
							this.state.time.length < 3 ? (
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

					<GoalsGallery />

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
							onPress={() =>
								this.props.navigation.navigate('NewGoalScreen')
							}
						>
							<Text>Сохранить</Text>
						</Button>
					</View>
				</Content>
						</Container>*/
}
