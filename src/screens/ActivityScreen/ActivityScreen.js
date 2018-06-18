import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { fb } from '../../services/api';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
	signInWithGoogle,
	authWithEmail,
	requestLogOut,
	resetError,
} from '../../ducks/profile';
import { Header, Icon, List, ListItem, Text } from 'react-native-elements';
import {
	Screen,
	View,
	Image,
	Subtitle,
	Title,
	Caption,
	Heading,
} from '@shoutem/ui';
import { Form, Button, Item, Label, Input } from 'native-base';
import DatePicker from 'react-native-datepicker';

class ActivityScreen extends React.Component {
	static navigationOptions = {
		title: 'Активность',
		header: null,
	};

	componentWillMount() {
		this.uid = fb.auth().currentUser.uid;
	}

	state = {
		physicalActivity: {},
	};

	_updatePhisicalActivity = (id, date) => {
		fb.database()
			.ref(
				`users/${
					this.uid ? this.uid : fb.auth().currentUser.uid
				}/goals/${this.props.goal.id}/physicalActivity/${id}`,
			)
			.set({
				id: id,
				date: date,
			});
	};

	_addActivity = activity => {
		fb.database()
			.ref(
				`users/${
					this.uid ? this.uid : fb.auth().currentUser.uid
				}/goals/${this.props.goal.id}`,
			)
			.set({
				...this.props.goal,
				physicalActivity: {
					...this.props.goal.physicalActivity,
					...activity,
				},
			});
	};

	_removeActivity = id => {
		fb.database()
			.ref(
				`users/${
					this.uid ? this.uid : fb.auth().currentUser.uid
				}/goals/${this.props.goal.id}`,
			)
			.set({
				...this.props.goal,
				physicalActivity: _.omit(this.props.goal.physicalActivity, [
					id,
				]),
			});
	};

	render() {
		const { goal } = this.props;
		if (!this.props.isAuth) {
			return (
				<Screen styleName="paper">
					<Header
						// leftComponent={{ icon: 'menu', color: '#fff' }}
						centerComponent={{
							text: 'Активность',
							style: { color: '#fff' },
						}}
						rightComponent={{
							icon: 'home',
							color: '#fff',
							onPress: () =>
								this.props.navigation.navigate('HomeScreen'),
						}}
					/>
					<Heading>Вы не авторизированы</Heading>
				</Screen>
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
					centerComponent={{
						text: 'Активность',
						style: { color: '#fff' },
					}}
					rightComponent={{
						icon: 'create',
						color: '#fff',
						underlayColor: 'transparent',
						onPress: () =>
							this.props.navigation.navigate('GoalForm', {
								goal: goal,
							}),
					}}
				/>
				<ScrollView>
					<View
						styleName="vertical h-center"
						style={{ paddingVertical: 20 }}
					>
						<Image
							style={{ paddingBottom: 15 }}
							styleName="medium-square"
							source={
								goal.image
									? {
											uri: goal.image,
									  }
									: require('../../../assets/images/image-3.png')
							}
						/>
						<Title
							style={{
								textAlign: 'center',
								paddingBottom: 20,
								paddingHorizontal: 15,
							}}
						>
							{goal.goalTitle}
						</Title>
						<Subtitle>
							Категория: {goal.goalCategory.categoryTitle}
						</Subtitle>
						<Subtitle>
							Срок достижения цели:{' '}
							{moment(goal.deadline).format('DD.MM.YY')}
						</Subtitle>
					</View>
					<View
						styleName="vertical h-center"
						// style={{ paddingTop: 20 }}
					>
						<View styleName="horizontal h-center">
							<Title>Физическая активность</Title>
						</View>
						<Title>{'Ежедневно'}</Title>
						<View
							styleName="vertical h-center"
							style={{ paddingVertical: 20 }}
						>
							{_.map(goal.activityRepeat.time, item => (
								<Text key={uuidv4()}>Напоминание {item}</Text>
							))}
						</View>

						<View
							styleName="vertical h-center"
							style={{ paddingTop: 20 }}
						>
							<Title>History log</Title>
						</View>
						<View
							styleName="vertical h-center"
							style={{ paddingVertical: 20 }}
						>
							{_.isEmpty(this.props.goal.physicalActivity) ? (
								<Text>Список пуст</Text>
							) : (
								_.map(
									this.props.goal.physicalActivity,
									item => (
										<View
											key={item.id}
											styleName="horizontal v-center space-between h-start"
										>
											<DatePicker
												style={{
													width: 130,
													borderWidth: 0,
												}}
												date={item.date}
												format="DD.MM.YY"
												mode="date"
												confirmBtnText="Confirm"
												cancelBtnText="Cancel"
												showIcon={false}
												customStyles={{
													dateIcon: {
														position: 'absolute',
														left: 0,
														top: 4,
														marginLeft: 0,
													},
													dateInput: {
														marginLeft: 36,
														borderWidth: 0,
													},
												}}
												onDateChange={date =>
													this._updatePhisicalActivity(
														item.id,
														date,
													)
												}
											/>
											<Text> Физическая активность</Text>
											<View style={{ padding: 10 }}>
												<Icon
													onPress={() =>
														this._removeActivity(
															item.id,
														)
													}
													name="close"
												/>
											</View>
										</View>
									),
								)
							)}
						</View>
						<TouchableOpacity
							onPress={() => {
								const id = uuidv4();
								return this._addActivity({
									[id]: {
										id: id,
										date: moment().format('DD.MM.YY'),
									},
								});
							}}
						>
							<View styleName="horizontal h-center">
								<Title>Добавить активность</Title>
								<Icon name="add" />
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</Screen>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	goals: state.goals,
	goal: ownProps.navigation.getParam('goal')
		? _.find(state.goals, {
				id: ownProps.navigation.getParam('goal').id,
		  })
		: state.goals['d052'],
	isAuth: state.profile.isAuth,
	profile: state.profile.profile,
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ActivityScreen);
