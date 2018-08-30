import React from 'react';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Header from '../../components/CustomHeader/CustomHeader';
import { Screen, Heading, Button, Text } from '@shoutem/ui';
import { Container, Fab, Icon } from 'native-base';
import GoalsCollapse from '../../components/GoalsCollapse/GoalsCollapse';
import { setSelectedFilter, setOpenedCategory } from '../../ducks/filterGoals';
import { goals } from '../../services/goals';
import Styles from '../../styles/styles';

const buttons = ['ШАБЛОНЫ', 'МОИ ЦЕЛИ', 'АРХИВ'];

class GoalsScreen extends React.Component {
	state = {
		isShown: false,
		selectedIndex: this.props.selectedFilter || 0,
	};
	static navigationOptions = {
		title: 'Цели',
		header: null,
	};

	componentDidMount() {
		if (this.props.isAuth) {
			this._scrollToElement(100, this.props.openedCategory);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.isAuth) {
			this._scrollToElement(100, this.props.openedCategory);
		}
	}

	_scrollToElement = (offset, selectedIndex) => {
		if (selectedIndex !== 1) {
			this.scroller.scrollTo({
				x: 0,
				y: 0,
				animation: false,
			});
		}

		if (selectedIndex === 1) {
			return this.scroller.scrollTo({
				x: 0,
				y: 0,
				animation: true,
			});
		} else if (selectedIndex > 1 && selectedIndex < 5) {
			return this.scroller.scrollTo({
				x: 0,
				y: offset * selectedIndex + 1,
				animation: true,
			});
		} else {
			return this.scroller.scrollToEnd();
		}
	};

	updateIndex = selectedIndex => {
		this.props.setOpenedCategory(1);
		this.props.setSelectedFilter(selectedIndex);
	};

	renderedGoals = activeIndex => {
		switch (activeIndex) {
			case 0:
				return _.filter(this.props.goals, { defaultGoal: true });
			case 1:
				return _.filter(this.props.goals, item => {
					return item.defaultGoal !== true && item.active !== 2;
				});
			case 2:
				return _.filter(this.props.goals, { active: 2 });
			default:
				return this.props.goals;
		}
	};

	toggleShown = () => this.setState({ isShown: !this.state.isShown });
	render() {
		const { selectedFilter, isAuth, profile } = this.props;

		if (!this.props.isAuth) {
			return (
				<Screen styleName="paper">
					<Header
						leftComponent={{
							icon: 'menu',
							color: '#fff',
							underlayColor: 'transparent',
							onPress: () =>
								this.props.navigation.navigate('DrawerOpen'),
						}}
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
			<Container>
				<LinearGradient
					style={{ flex: 1 }}
					colors={['#ffffff', '#edf3ff', '#edf3ff']}
				>
					<Header
						leftComponent={{
							icon: 'menu',
							color: '#fff',
							underlayColor: 'transparent',
							onPress: () =>
								this.props.navigation.navigate('DrawerOpen'),
						}}
						label={'Цели'}
						rightComponent={
							isAuth && profile.userPhoto ? (
								<Animatable.View
									animation="zoomIn"
									easing="ease-out"
								>
									<Avatar
										small
										rounded
										source={{ uri: profile.userPhoto }}
										onPress={() =>
											this.props.navigation.navigate(
												'ProfileScreen',
											)
										}
										activeOpacity={0.7}
									/>
								</Animatable.View>
							) : (
								{
									icon: 'user-circle-o',
									type: 'font-awesome',
									color: '#fff',
									underlayColor: '#fff',
									reverseColor: '#8700ca',
									onPress: () =>
										this.props.navigation.navigate(
											'ProfileScreen',
										),
								}
							)
						}
					/>
					<Button
						styleName=" horizontal space-between "
						style={{
							shadowColor: '#8700ca',
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: 0.3,
							shadowRadius: 10,
						}}
						onPress={() =>
							this.props.isAuth
								? this.props.navigation.navigate('GoalForm')
								: false
						}
					>
						<Text
							style={{
								color: '#000',
								fontSize: 14,
								fontFamily: 'M-Regular',
							}}
						>
							Добавить цель
						</Text>
						<Icon
							style={{
								backgroundColor: 'transparent',
								color: '#8700ca',
								shadowColor: '#8700ca',
								shadowOffset: { width: 0, height: 0 },
								shadowOpacity: 0.2,
								shadowRadius: 30,
							}}
							name="md-add-circle"
						/>
					</Button>
					<ScrollView
						style={{
							paddingHorizontal: 10,
							paddingVertical: 20,
							backgroundColor: 'transparent',
						}}
						ref={scroller => (this.scroller = scroller)}
					>
						<ButtonGroup
							onPress={this.updateIndex}
							selectedIndex={selectedFilter}
							buttons={buttons}
							containerStyle={{
								marginTop: 15,
								shadowColor: '#8700ca',
								shadowOffset: { width: 10, height: 10 },
								shadowOpacity: 0.7,
								shadowRadius: 10,
								borderColor: 'transparent',
							}}
							buttonStyle={{
								backgroundColor: 'rgba(207, 217, 237, .3)',
								borderColor: 'rgba(207, 217, 237, .2)',
							}}
							textStyle={{
								color: '#000',
								fontFamily: 'M-Regular',
								fontSize: 12,
							}}
							selectedTextStyle={{
								color: '#8700ca',
							}}
							selectedButtonStyle={{
								backgroundColor: '#fff',
							}}
						/>

						<GoalsCollapse
							navigation={this.props.navigation}
							goals={this.renderedGoals(selectedFilter)}
							categorys={this.props.categorys}
							isAuth={this.props.isAuth}
							activeCategoryID={this.props.navigation.getParam(
								'categoryId',
							)}
						/>
					</ScrollView>
					{/* <Fab
					active={this.state.active}
					direction="up"
					containerStyle={{}}
					style={{
						backgroundColor: '#DD5144',
						alignContent: 'center',
						justifyContent: 'center',
					}}
					position="bottomRight"
					onPress={() =>
						this.props.isAuth
							? this.props.navigation.navigate('GoalForm')
							: false
					}
				>
					<Icon name="ios-add" />
				</Fab> */}
				</LinearGradient>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	goals: { ...goals, ...state.goalsOffline },
	categorys: state.categorys,
	isAuth: state.profile.isAuth,
	profile: state.profile.profile,
	selectedFilter: state.filterGoals.selectedFilter,
	openedCategory: state.filterGoals.openedCategory,
});

export default connect(
	mapStateToProps,
	{ setSelectedFilter, setOpenedCategory },
)(GoalsScreen);
