import React from 'react';
import _ from 'lodash';
import moment, { weekdays } from 'moment';
import { fb } from '../../services/api';
import { addActivity, removeActivity, toggleNotification, changeGoalActive, removeGoal } from '../../ducks/goalsOffline';

import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { ScrollView, Alert, Switch } from 'react-native';
import { showLoader, hideLoader } from '../../ducks/loader';
import Styles from '../../styles/styles';
// UTILS
// ============================================================
import { activityRepeatDaysParser } from '../../utils/parsers';

import { signInWithGoogle, authWithEmail, requestLogOut, resetError } from '../../ducks/profile';
import Header from '../../components/CustomHeader/CustomHeader';
import { Icon, Text, CheckBox, Avatar } from 'react-native-elements';
import { Screen, View, Image, Title, Heading } from '@shoutem/ui';
import { ActionSheet } from 'native-base';
import DatePicker from 'react-native-datepicker';
import ButtonAddActivity from '../../components/ButtonAddActivity/ButtonAddActivity';

const sorter = {
	пн: 1,
	вт: 2,
	ср: 3,
	чт: 4,
	пт: 5,
	сб: 6,
	вс: 7,
};

class ActivityScreen extends React.Component {
	static navigationOptions = {
		title: 'Активность',
		header: null,
	};

	componentWillMount() {
		this.uid = this.props.isAuth;
	}

	state = {
		physicalActivity: {},
	};

	_addActivity = id => {
		const activity = {
			id: id,
			date: moment().format(),
			createdDate: moment().format(),
		};

		this.props.addActivity(activity, this.props.goal.id);
		setTimeout(() => {
			this.scrollView.scrollToEnd({ animated: true });
		}, 1);
	};

	_removeActivity = id => {
		this.props.removeActivity(id, this.props.goal.id);
	};

	_updatePhisicalActivity = (id, date) => {
		const activity = {
			...this.props.goal.activityRepeat,
			id: id,
			date: moment(date, 'DD-MM-YYYY HH:mm').format(),
		};
		this.props.addActivity(activity, this.props.goal.id);
	};

	_toggleNotifications = () => {
		this.props.toggleNotification(this.props.goal.id);
	};

	_pausedGoal = async id => {
		this.props.changeGoalActive(0, this.props.goal.id);
	};

	_startGoal = async id => {
		this.props.changeGoalActive(1, this.props.goal.id);
	};

	_deleteGoal = () => {
		this.props.removeGoal(this.props.goal.id);

		this.props.navigation.navigate('GoalsScreen', { selectedIndex: 1 });
	};

	_finishedGoal = async () => {
		this.props.changeGoalActive(2, this.props.goal.id);
	};

	_renderDays = () => {
		const { id } = this.props.goal.activityRepeat;
		const { weekDays, monthDays } = this.props.goal.activityRepeat;
		const sortedWeekDays = weekDays ? _.sortBy(weekDays) : [];
		const sortedMonthDays = monthDays && _.sortBy(monthDays, ['id']);

		if (id === 4) {
			return _.map(sortedWeekDays, id => {
				const day = activityRepeatDaysParser(id);
				return <Title style={{ ...Styles.defaultTextTitle }} key={day.id}>{`${day.title}, `}</Title>;
			});
		}
		if (id === 5) {
			if (_.isEmpty(monthDays)) {
				return false;
			}
			return _.map(sortedMonthDays, item => {
				const { dayNumber } = item;
				return <Title style={{ ...Styles.defaultTextTitle }} key={dayNumber}>{`${dayNumber}, `}</Title>;
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
						label="Активность"
						rightComponent={{
							icon: 'home',
							color: '#fff',
							onPress: () => this.props.navigation.navigate('HomeScreen'),
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
						label="Активность"
						rightComponent={{
							icon: 'home',
							color: '#fff',
							onPress: () => this.props.navigation.navigate('HomeScreen'),
						}}
					/>
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
		const _parsedTimes = _.sortBy(this.props.goal.activityRepeat.time);

		if (!_.isEmpty(this.props.goal.physicalActivity)) {
			physicalActivity = _.orderBy(
				this.props.goal.physicalActivity,
				item => {
					return new Date(item.date).getTime();
				},
				['desc', 'asc'],
			);
		}

		let BUTTONS = [goal.active !== 1 ? 'Возобновить' : 'Приостановить', 'Достигнуть', 'Удалить', 'Отмена'];
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
								if (buttonIndex === 0 && (goal.active === 0 || goal.active === 2)) {
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
												onPress: () => this._deleteGoal(goal.id),
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
												onPress: () => this._deleteGoal(goal.id),
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
					label={goal.goalTitle.length > 20 ? `${goal.goalTitle.slice(0, 20)}...` : goal.goalTitle}
					centerComponent={{
						text: goal.goalTitle.length > 20 ? `${goal.goalTitle.slice(0, 20)}...` : goal.goalTitle,
						style: { color: '#fff' },
					}}
					rightComponent={<RightComponent />}
				/>
				<ScrollView ref={scrollView => (this.scrollView = scrollView)} style={{ backgroundColor: '#edf3ff' }}>
					<View styleName="vertical h-center">
						<Image style={{ paddingBottom: 15 }} styleName="large-banner" source={_.isNumber(goal.image) ? goal.image : { uri: `data:image/jpeg;base64,${goal.image}` }} />
						<View
							style={{
								paddingHorizontal: 15,
								width: '100%',
							}}
							styleName="horizontal v-center h-center"
						>
							<Title
								style={{
									...Styles.defaultTextTitle,
									fontFamily: 'MA-Bold',
									color: '#000',
								}}
							>
								{goal.goalCategory.categoryTitle}
							</Title>
						</View>
						<View
							style={{
								paddingHorizontal: 15,
								paddingVertical: 5,
							}}
							styleName="horizontal v-center space-around"
						>
							<CheckBox
								checked={goal.active !== 2 ? false : true}
								iconType="material"
								checkedIcon="check-box"
								uncheckedIcon="check-box-outline-blank"
								checkedColor="#8700ca"
								size={32}
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
													onPress: () => this._finishedGoal(),
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
												onPress: () => this._startGoal(goal.id),
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
								}}
							/>
							<Title
								style={{
									textAlign: 'center',
									// paddingBottom: 20,
									// paddingTop: 10,
									paddingHorizontal: 5,
									...Styles.defaultTextTitle,
									fontSize: 16,
									lineHeight: 20,
									fontFamily: 'MA-Bold',
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
									...Styles.defaultTextTitle,
								}}
							>
								ПРИОСТАНОВЛЕНА
							</Title>
						)}
						{goal.active === 2 && (
							<Title
								style={{
									textAlign: 'center',
									paddingBottom: 20,
									paddingHorizontal: 15,
									...Styles.defaultTextTitle,
								}}
							>
								ДОСТИГНУТА
							</Title>
						)}
						<View
							style={{
								paddingHorizontal: 15,
								width: '100%',
								...Styles.borderBottom,
								paddingVertical: 3,
								borderTopWidth: 1,
								borderTopColor: '#dde5f5',
							}}
							styleName="horizontal v-center space-between"
						>
							<Title style={{ ...Styles.defaultText }}>ДАТА СОЗДАНИЯ ЦЕЛИ:</Title>
							<Title style={{ ...Styles.defaultTextTitle }}>{moment(goal.timestamp).format('DD.MM.YYYY')}</Title>
						</View>
						<View
							style={{
								paddingHorizontal: 15,
								width: '100%',
								paddingVertical: 3,
								...Styles.borderBottom,
							}}
							styleName="horizontal v-center space-between"
						>
							<Title
								style={{
									...Styles.defaultText,
								}}
							>
								СРОК ДОСТЖЕНИЯ ЦЕЛИ:
							</Title>
							<Title style={{ ...Styles.defaultTextTitle }}>{moment(goal.deadline).format('DD.MM.YYYY')}</Title>
						</View>
					</View>
					{/* <View
						styleName="horizontal h-center"
						style={{
							width: '100%',
							// paddingBottom: 20,
							// paddingHorizontal: 15,
						}}
					> */}
					<View
						style={{
							width: '100%',
							...Styles.borderBottom,
							paddingHorizontal: 15,
							paddingVertical: 3,
						}}
						styleName="horizontal v-center space-between"
					>
						<Title
							style={{
								...Styles.defaultText,
							}}
						>
							АКТИВНОСТИ
						</Title>
						<Title style={{ ...Styles.defaultTextTitle }}>{goal.activityRepeat.title}</Title>
					</View>
					{(goal.activityRepeat.id === 4 || goal.activityRepeat.id === 5) &&
						(!_.isEmpty(goal.activityRepeat.weekDays) || !_.isEmpty(goal.activityRepeat.monthDays)) && (
							<View
								styleName="horizontal v-center space-between"
								style={{
									width: '100%',
									flexWrap: 'wrap',
									...Styles.borderBottom,
									paddingVertical: 3,
									paddingHorizontal: 15,
								}}
							>
								<Title style={{ ...Styles.defaultText }}>ДНИ:</Title>
								<View styleName="horizontal v-center h-start">{this._renderDays()}</View>
							</View>
						)}
					{goal.activityRepeat.id !== 0 && (
						<React.Fragment>
							<View
								styleName="horizontal v-center space-between"
								style={{
									width: '100%',
									flexWrap: 'wrap',
									...Styles.borderBottom,
									paddingVertical: 3,
									paddingHorizontal: 15,
								}}
							>
								<Title style={{ ...Styles.defaultText }}>НАПОМИНАНИЕ:</Title>
								<View styleName="horizontal v-center h-start">
									{_.map(_parsedTimes, item => (
										<Title style={{ ...Styles.defaultTextTitle }} key={uuidv4()}>{`${item}, `}</Title>
									))}
								</View>
							</View>

							<View
								style={{
									width: '80%',
									flexWrap: 'wrap',
									margin: 'auto',
									marginVertical: 15,
								}}
								styleName="horizontal v-center space-between"
							>
								<Title style={{ ...Styles.defaultText }}>НАПОМИНАНИЕ:</Title>
								<Switch onTintColor="#eacbf9" thumbTintColor="#8700ca" tintColor="#fff" onValueChange={value => this._toggleNotifications()} value={goal.activityRepeat.reminder} />
							</View>
						</React.Fragment>
					)}
					{goal.active !== 2 && (
						<ButtonAddActivity
							warning
							withIcons
							handleClick={() => {
								const id = uuidv4();
								this._addActivity(id, goal, this.uid);
							}}
							buttonText="ДОБАВИТЬ АКТИВНОСТЬ"
						/>
					)}

					<View
						styleName="vertical h-center"
						style={{
							paddingVertical: 3,
							// paddingHorizontal: 15,
							width: '100%',
							alignItems: 'stretch',
						}}
					>
						{_.isEmpty(physicalActivity) ? (
							<Text
								style={{
									width: '100%',
									textAlign: 'center',
								}}
							>
								Список пуст
							</Text>
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
											placeholderText: {
												textAlign: 'right',
												...Styles.defaultTextTitle,
											},
											dateText: {
												textAlign: 'right',
												...Styles.defaultTextTitle,
											},
										}}
										onDateChange={date => this._updatePhisicalActivity(item.id, date)}
									/>
									<Text
										style={{
											...Styles.defaultText,
											fontSize: 14,
										}}
									>
										Активность
									</Text>
									<View style={{ padding: 10 }}>
										<Icon color="rgba(135, 0, 202, 1)" type="ionicon" onPress={() => this._removeActivity(item.id, goal, this.uid)} name="md-close-circle" />
									</View>
								</View>
							))
						)}
					</View>
					{/* </View> */}
				</ScrollView>
			</Screen>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	goal: ownProps.navigation.getParam('goalId') ? state.goalsOffline[ownProps.navigation.getParam('goalId')] : null,
	isAuth: state.profile.isAuth,
	loading: state.loader.isShown,
});

const mapDispatchToProps = {
	removeGoal,
	toggleNotification,
	addActivity,
	removeActivity,
	changeGoalActive,
	showLoader,
	hideLoader,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ActivityScreen);
