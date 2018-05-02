import React from 'react';
import { FlatList, Image, View } from 'react-native';
import {
	Header,
	Container,
	Title,
	Content,
	Tabs,
	Left,
	Right,
	Body,
	Text,
	Card,
	Icon,
	Button,
	H1,
	CardItem,
	Badge,
	Picker,
	Segment,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
// import LabelSelect from 'react-native-label-select';

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

export default class GoalForm extends React.Component {
	static navigationOptions = {
		title: 'Цели',
		header: null,
	};

	state = {
		isShown: false,
		date: '2018-05-01',
		selected: 'key1',
		activityInterval: 'key4',
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

	onValueChange = value => {
		this.setState({
			selected: value,
		});
	};

	onActivitityIntervalChange = value => {
		this.setState({
			activityInterval: value,
		});
	};

	toggleShown = () => this.setState({ isShown: !this.state.isShown });

	render() {
		return (
			<Container>
				<Header back>
					<Left>
						<Button
							transparent
							dark
							onPress={() => this.props.navigation.goBack()}
						>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Редактировать цель</Title>
					</Body>
					<Right />
				</Header>
				<Content padder>
					<Card>
						<CardItem>
							<View style={styles.container.inline}>
								<Text>Категория цели</Text>
								<Badge info>
									<Picker
										mode="dropdown"
										iosHeader="Категория цели"
										iosIcon={
											<Icon name="ios-arrow-down-outline" />
										}
										style={{ width: undefined }}
										selectedValue={this.state.selected}
										onValueChange={this.onValueChange}
									>
										<Picker.Item
											label="Спорт"
											value="key0"
										/>
										<Picker.Item
											label="Финансы"
											value="key1"
										/>
										<Picker.Item
											label="Семья"
											value="key2"
										/>
										<Picker.Item
											label="Социум"
											value="key3"
										/>
										<Picker.Item
											label="Путишествия"
											value="key4"
										/>
									</Picker>
								</Badge>
							</View>
						</CardItem>
						<CardItem>
							<View>
								<Text>Цель</Text>
								<Badge info>
									<Text>Чиканить мяч 40 минут</Text>
								</Badge>
							</View>
						</CardItem>
						<CardItem>
							<View style={styles.container.inline}>
								<Text>Срок достижения</Text>
								<Badge info>
									<DatePicker
										style={{
											width: 150,
											borderWidth: 0,
											borderColor: 'transparent',
										}}
										showIcon={false}
										date={this.state.date}
										mode="date"
										placeholder="select date"
										format="YYYY-MM-DD"
										minDate="2018-04-01"
										// maxDate="2016-06-01"
										confirmBtnText="Confirm"
										cancelBtnText="Cancel"
										customStyles={{
											dateInput: {
												borderWidth: 0,
												borderColor: 'transparent',
											},
										}}
										onDateChange={date => {
											this.setState({ date: date });
										}}
									/>
								</Badge>
							</View>
						</CardItem>
						<CardItem>
							<View style={styles.container.inline}>
								<Text>Активность</Text>
							</View>
						</CardItem>
						<CardItem>
							<View>
								<Text>Повторять активность</Text>
								<Picker
									mode="dropdown"
									iosHeader="Категория цели"
									iosIcon={
										<Icon name="ios-arrow-down-outline" />
									}
									style={{ width: undefined }}
									selectedValue={this.state.activityInterval}
									onValueChange={
										this.onActivitityIntervalChange
									}
								>
									<Picker.Item
										label="Не повторять"
										value="key0"
									/>
									<Picker.Item
										label="Каждый день"
										value="key1"
									/>
									<Picker.Item
										label="По четным"
										value="key2"
									/>
									<Picker.Item
										label="По нечетным"
										value="key3"
									/>
									<Picker.Item
										label="Каждую неделю"
										value="key4"
									/>
									<Picker.Item
										label="Каждый месяц"
										value="key5"
									/>
								</Picker>
							</View>
						</CardItem>
						<CardItem>
							<View style={styles.container.inline}>
								<Text style={styles.text}>
									Normal LabelSelect
								</Text>
								{/*<LabelSelect
								// 	title="Checkbox"
								// 	ref="select"
								// 	style={styles.labelSelect}
								// 	onConfirm={this.selectConfirm}
								// >
								// 	{this.state.arr
								// 		.filter(item => item.isSelected)
								// 		.map((item, index) => (
								// 			<LabelSelect.Label
								// 				key={'label-' + index}
								// 				data={item}
								// 				onCancel={() => {
								// 					this.deleteItem(item);
								// 				}}
								// 			>
								// 				{item.name}
								// 			</LabelSelect.Label>
								// 		))}
								// 	{this.state.arr
								// 		.filter(item => !item.isSelected)
								// 		.map((item, index) => (
								// 			<LabelSelect.ModalItem
								// 				key={'modal-item-' + index}
								// 				data={item}
								// 			>
								// 				{item.name}
								// 			</LabelSelect.ModalItem>
								// 		))}
                                // </LabelSelect>*/}
							</View>
						</CardItem>
					</Card>

					<Button
						iconLeft
						transparent
						bordered
						dark
						block
						onPress={() =>
							this.props.navigation.navigate('NewGoalScreen')
						}
					>
						<Icon name="ios-add-circle-outline" />
						<Text>Сохранить</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}
