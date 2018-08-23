import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ScrollView } from 'react-native';
import { Header, ButtonGroup } from 'react-native-elements';
import { Screen, Heading } from '@shoutem/ui';
import { Container, Text, Icon, Button, Fab } from 'native-base';
import GoalsCollapse from '../../components/GoalsCollapse/GoalsCollapse';
import { setSelectedFilter, setOpenedCategory } from '../../ducks/filterGoals';
import { goals } from '../../services/goals';

const buttons = ['Шаблоны', 'Мои цели', 'Архив'];

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
		const { selectedFilter } = this.props;

		if (!this.props.isAuth) {
			return (
				<Screen styleName="paper">
					<Header
						leftComponent={{ icon: 'menu', color: '#fff' }}
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
				<Header
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{
						text: 'Добавить цели',
						style: { color: '#fff' },
					}}
					rightComponent={{ icon: 'more-vert', color: '#fff' }}
				/>
				<ScrollView
					style={{ paddingHorizontal: 10, paddingVertical: 20 }}
					ref={scroller => (this.scroller = scroller)}
				>
					<Button
						iconLeft
						bordered
						primary
						block
						onPress={() =>
							this.props.isAuth
								? this.props.navigation.navigate('GoalForm')
								: false
						}
					>
						<Icon name="ios-add-circle-outline" />
						<Text>Добавить цель</Text>
					</Button>
					<ButtonGroup
						onPress={this.updateIndex}
						selectedIndex={selectedFilter}
						buttons={buttons}
						containerStyle={{ marginTop: 15 }}
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
				{/*	<Content padder ref={scroller => (this.scroller = scroller)}>
					<Button
						iconLeft
						bordered
						primary
						block
						onPress={() =>
							this.props.isAuth
								? this.props.navigation.navigate('GoalForm')
								: false
						}
					>
						<Icon name="ios-add-circle-outline" />
						<Text>Добавить цель</Text>
					</Button>
					<ButtonGroup
						onPress={this.updateIndex}
						selectedIndex={selectedIndex}
						buttons={buttons}
						containerStyle={{ marginTop: 15 }}
					/>

					<GoalsCollapse
						navigation={this.props.navigation}
						goals={this.renderedGoals(selectedIndex)}
						categorys={this.props.categorys}
						isAuth={this.props.isAuth}
						activeCategoryID={this.props.navigation.getParam(
							'categoryId',
						)}
					/>
					</Content>*/}
				<Fab
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
				</Fab>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	goals: { ...goals, ...state.goalsOffline },
	categorys: state.categorys,
	isAuth: state.profile.isAuth,
	selectedFilter: state.filterGoals.selectedFilter,
	openedCategory: state.filterGoals.openedCategory,
});

export default connect(
	mapStateToProps,
	{ setSelectedFilter, setOpenedCategory },
)(GoalsScreen);
