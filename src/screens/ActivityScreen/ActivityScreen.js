import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { fb } from '../../services/api';
import {
	addActivity,
	removeActivity,
	updatePhisicalActivity,
	toggleNotification,
} from '../../services/api/goals';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { ScrollView, Alert } from 'react-native';
import { removeGoal } from '../../ducks/goals';
import { saveNewGoal } from '../../services/api/goals';
import { showLoader, hideLoader } from '../../ducks/loader';
import Spinner from 'react-native-loading-spinner-overlay';

// UTILS
// ============================================================
import { activityRepeatDaysParser } from '../../utils/parsers';

import {
	signInWithGoogle,
	authWithEmail,
	requestLogOut,
	resetError,
} from '../../ducks/profile';
import { Header, Icon, Text, CheckBox } from 'react-native-elements';
import { Screen, View, Image, Title, Heading, Switch } from '@shoutem/ui';
import { ActionSheet } from 'native-base';
import DatePicker from 'react-native-datepicker';
import ButtonAddActivity from '../../components/ButtonAddActivity/ButtonAddActivity';

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

	_addActivity = async (id, goal, uid) => {
		this.props.showLoader();
		await addActivity(id, goal, uid);
		this.props.hideLoader();
	};

	_removeActivity = async (id, goal, uid) => {
		this.props.showLoader();
		await removeActivity(id, goal, uid);
		this.props.hideLoader();
	};

	_pausedGoal = async id => {
		this.props.showLoader();
		await fb
			.database()
			.ref(
				`users/${
					this.uid ? this.uid : fb.auth().currentUser.uid
				}/goals/${this.props.goal.id}`,
			)
			.set({
				...this.props.goal,
				active: 0,
			});
		this.props.hideLoader();
	};

	_startGoal = async id => {
		this.props.showLoader();
		await fb
			.database()
			.ref(
				`users/${
					this.uid ? this.uid : fb.auth().currentUser.uid
				}/goals/${this.props.goal.id}`,
			)
			.set({
				...this.props.goal,
				active: 1,
			});
		this.props.hideLoader();
	};

	_deleteGoal = async () => {
		this.props.showLoader();
		let { id } = this.props.goal;
		let goals = _.filter(this.props.goals, goal => goal.id !== id);
		let byId = _.keyBy(goals, 'id');
		this.props.removeGoal(byId);
		await saveNewGoal({ ...byId });
		this.props.hideLoader();

		this.props.navigation.navigate('GoalsScreen', { selectedIndex: 1 });
	};

	_toggleNotifications = async activityRepeat => {
		this.props.showLoader();
		await toggleNotification(this.props.goal.id, this.uid, activityRepeat);
		this.props.hideLoader();
	};

	_finishedGoal = async () => {
		this.props.showLoader();
		await fb
			.database()
			.ref(
				`users/${
					this.uid ? this.uid : fb.auth().currentUser.uid
				}/goals/${this.props.goal.id}`,
			)
			.set({
				...this.props.goal,
				active: 2,
			});
		this.props.hideLoader();
	};

	_renderDays = () => {
		const { id } = this.props.goal.activityRepeat;
		const { weekDays, monthDays } = this.props.goal.activityRepeat;

		if (id === 4) {
			return _.map(weekDays, id => {
				const day = activityRepeatDaysParser(id);
				return <Title key={day.id}>{`${day.title}, `}</Title>;
			});
		}
		if (id === 5) {
			if (_.isEmpty(monthDays)) {
				return false;
			}
			return _.map(monthDays, item => {
				const { dayNumber } = item;
				return <Title key={dayNumber}>{`${dayNumber}, `}</Title>;
			});
		}

		return false;
	};

	render() {
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
		if (!this.props.goal) {
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

					{/* <Heading>Цель удалена</Heading> */}
				</Screen>
			);
		}

		/**
		|--------------------------------------------------
		| IF GOAL EXISTS
		|--------------------------------------------------
		*/
		const { goal } = this.props;
		let physicalActivity = null;

		if (!_.isEmpty(this.props.goal.physicalActivity)) {
			physicalActivity = _.orderBy(
				this.props.goal.physicalActivity,
				item => {
					return new Date(item.date).getTime();
				},
				['desc', 'asc'],
			);
		}

		let BUTTONS = [
			goal.active !== 1 ? 'Возобновить' : 'Приостановить',
			'Достигнуть',
			'Удалить',
			'Отмена',
		];
		let DESTRUCTIVE_INDEX = 2;
		let CANCEL_INDEX = 3;
		if (goal.active === 2) {
			BUTTONS.splice(1, 1);
			DESTRUCTIVE_INDEX = 1;
			CANCEL_INDEX = 2;
		}

		const RightComponent = () => (
			<View style={{ display: 'flex', flexDirection: 'row' }}>
				<Icon
					name="create"
					color="#fff"
					underlayColor="transparent"
					onPress={() =>
						this.props.navigation.navigate('GoalForm', {
							goal: goal,
						})
					}
				/>

				<Icon
					name="more-vert"
					color="#fff"
					underlayColor="transparent"
					onPress={() =>
						ActionSheet.show(
							{
								options: BUTTONS,
								cancelButtonIndex: CANCEL_INDEX,
								destructiveButtonIndex: DESTRUCTIVE_INDEX,
								// title: 'Изменить',
							},
							buttonIndex => {
								if (
									buttonIndex === 0 &&
									(goal.active === 0 || goal.active === 2)
								) {
									this._startGoal(goal.id);
								}
								if (buttonIndex === 0 && goal.active === 1) {
									this._pausedGoal(goal.id);
								}
								if (buttonIndex === 1 && goal.active !== 2) {
									this._finishedGoal();
								}

								if (buttonIndex === 2 && goal.active !== 2) {
									Alert.alert(
										'Удалить',
										'Вы действительно хотите удалить цель?',
										[
											{
												text: 'Отмена',
												style: 'cancel',
											},
											{
												text: 'Да',
												onPress: () =>
													this._deleteGoal(goal.id),
											},
										],
										{ cancelable: false },
									);
								}
								if (buttonIndex === 1 && goal.active === 2) {
									Alert.alert(
										'Удалить',
										'Вы действительно хотите удалить цель?',
										[
											{
												text: 'Отмена',
												style: 'cancel',
											},
											{
												text: 'Да',
												onPress: () =>
													this._deleteGoal(goal.id),
											},
										],
										{ cancelable: false },
									);
								}
							},
						)
					}
				/>
			</View>
		);
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
						text:
							goal.goalTitle.length > 20
								? `${goal.goalTitle.slice(0, 20)}...`
								: goal.goalTitle,
						style: { color: '#fff' },
					}}
					rightComponent={<RightComponent />}
				/>
				<ScrollView>
					<View
						styleName="vertical h-center"
						style={{ paddingBottom: 20 }}
					>
						<Image
							style={{ paddingBottom: 15 }}
							styleName="large-banner"
							source={
								goal.image
									? {
											uri:
												goal.image.indexOf('http') > -1
													? goal.image
													: `data:image/jpeg;base64,${
															goal.image
													  }`,
									  }
									: require('../../../assets/images/image-3.png')
							}
						/>
						<View
							style={{ paddingHorizontal: 15 }}
							styleName="horizontal v-start space-around"
						>
							<CheckBox
								checked={goal.active !== 2 ? false : true}
								onPress={() => {
									if (goal.active !== 2) {
										return Alert.alert(
											'Ура!',
											'Вы действительно достигли цели! Поздравляем!',
											[
												{
													text: 'Отмена',
													style: 'cancel',
												},
												{
													text: ' Подтверждаю',
													onPress: () =>
														this._finishedGoal(),
												},
											],
											{ cancelable: false },
										);
									}
									return Alert.alert(
										'Продолжить достижение',
										'Решили улучшить результат?',
										[
											{
												text: 'Отмена',
												style: 'cancel',
											},
											{
												text: 'Да',
												onPress: () =>
													this._startGoal(goal.id),
											},
										],
										{ cancelable: false },
									);
								}}
								containerStyle={{
									backgroundColor: 'transparent',
									borderWidth: 0,
									margin: 0,
									marginLeft: 0,
									marginRight: 0,
									padding: 0,
									paddingTop: 10,
								}}
							/>
							<Title
								style={{
									textAlign: 'center',
									paddingBottom: 20,
									paddingTop: 10,
									paddingHorizontal: 15,
									fontSize: 24,
								}}
							>
								{goal.goalTitle}
							</Title>
						</View>

						{goal.active === 0 && (
							<Title
								style={{
									textAlign: 'center',
									paddingBottom: 20,
									paddingHorizontal: 15,
									color: 'red',
								}}
							>
								Приостановлена
							</Title>
						)}
						{goal.active === 2 && (
							<Title
								style={{
									textAlign: 'center',
									paddingBottom: 20,
									paddingHorizontal: 15,
									color: 'lightgreen',
								}}
							>
								Достигнута
							</Title>
						)}
						<View
							style={{ paddingHorizontal: 15, width: '100%' }}
							styleName="horizontal v-center space-between"
						>
							<Title>Категория:</Title>
							<Title>{goal.goalCategory.categoryTitle}</Title>
						</View>
						<View
							style={{ paddingHorizontal: 15, width: '100%' }}
							styleName="horizontal v-center space-between"
						>
							<Title>Дата создания цели: </Title>
							<Title>
								{moment(goal.timestamp).format('DD.MM.YYYY')}
							</Title>
						</View>
						<View
							style={{ paddingHorizontal: 15, width: '100%' }}
							styleName="horizontal v-center space-between"
						>
							<Title>Срок достижения цели: </Title>
							<Title>
								{moment(goal.deadline).format('DD.MM.YYYY')}
							</Title>
						</View>
					</View>
					<View
						styleName="vertical h-center"
						style={{
							paddingBottom: 20,
							width: '100%',
							paddingHorizontal: 15,
						}}
					>
						<View
							style={{ width: '100%' }}
							styleName="horizontal h-start"
						>
							<Title style={{ fontSize: 20 }}>
								Запланированы активности
							</Title>
						</View>
						<View
							style={{ paddingVertical: 10, width: '100%' }}
							styleName="horizontal h-start"
						>
							<Title>{goal.activityRepeat.title}</Title>
						</View>
						{(goal.activityRepeat.id === 4 ||
							goal.activityRepeat.id === 5) &&
							(!_.isEmpty(goal.activityRepeat.weekDays) ||
								!_.isEmpty(goal.activityRepeat.monthDays)) && (
								<View
									styleName="horizontal h-start"
									style={{ width: '100%', flexWrap: 'wrap' }}
								>
									<Title>Дни: </Title>
									{this._renderDays()}
								</View>
							)}
						<View
							styleName="horizontal h-start"
							style={{ width: '100%', flexWrap: 'wrap' }}
						>
							<Title>Напоминание: </Title>
							{_.map(goal.activityRepeat.time, item => (
								<Title key={uuidv4()}>{`${item}, `}</Title>
							))}
						</View>
						<View
							style={{ width: '100%', flexWrap: 'wrap' }}
							styleName="horizontal v-center space-between"
						>
							<Title>Напоминание: </Title>
							<Switch
								onValueChange={value =>
									this._toggleNotifications({
										...goal.activityRepeat,
										reminder: value,
									})
								}
								value={goal.activityRepeat.reminder}
							/>
						</View>
						{goal.active !== 2 && (
							<ButtonAddActivity
								warning
								withIcons
								handleClick={() => {
									const id = uuidv4();
									return this._addActivity(
										id,
										goal,
										this.uid,
									);
								}}
								buttonText="Добавить активность"
							/>
						)}
						<View
							styleName="vertical h-start"
							style={{ width: '100%', paddingTop: 20 }}
						>
							<Title style={{ fontSize: 20 }}>
								Журнал активностей
							</Title>
						</View>
						<View
							styleName="vertical h-center"
							style={{
								paddingVertical: 10,
								// paddingHorizontal: 15,
								width: '100%',
								alignItems: 'stretch',
							}}
						>
							{_.isEmpty(physicalActivity) ? (
								<Text>Список пуст</Text>
							) : (
								_.map(physicalActivity, item => (
									<View
										key={item.id}
										style={{
											width: '100%',
										}}
										styleName="horizontal v-center space-between"
									>
										<DatePicker
											style={{
												width: '50%',
												borderWidth: 0,
											}}
											date={moment(item.date)}
											format="DD-MM-YYYY HH:mm"
											maxDate={new Date()}
											mode="datetime"
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
													// marginLeft: 36,
													borderWidth: 0,
												},
											}}
											onDateChange={date =>
												updatePhisicalActivity(
													item.id,
													goal,
													this.uid,
													date,
												)
											}
										/>
										<Text> Активность</Text>
										<View style={{ padding: 10 }}>
											<Icon
												onPress={() =>
													this._removeActivity(
														item.id,
														goal,
														this.uid,
													)
												}
												name="close"
											/>
										</View>
									</View>
								))
							)}
						</View>

						{/*goal.active !== 2 && (
							<ButtonAddActivity
								success
								handleClick={() => {
									return this._finishedGoal();
								}}
								buttonText="Достигнуть"
							/>
						)*/}
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
		: null,
	isAuth: state.profile.isAuth,
	profile: state.profile.profile,
	loading: state.loader.isShown,
});

const mapDispatchToProps = {
	removeGoal,
	toggleNotification,
	showLoader,
	hideLoader,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ActivityScreen);
