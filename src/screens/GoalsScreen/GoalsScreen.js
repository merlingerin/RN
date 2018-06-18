import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FlatList, Image, Dimensions, ScrollView } from 'react-native';
import { Header, ButtonGroup } from 'react-native-elements';
import { Screen, View, Subtitle, Title, Caption, Heading } from '@shoutem/ui';
import {
	Container,
	Footer,
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
	Fab,
} from 'native-base';
import { WebBrowser } from 'expo';
import Collapsible from 'react-native-collapsible';
import GoalsCollapse from '../../components/GoalsCollapse/GoalsCollapse';

const buttons = ['Все', 'Мои', 'Стандартные'];

class GoalsScreen extends React.Component {
	state = {
		isShown: false,
		selectedIndex: 0,
	};
	static navigationOptions = {
		title: 'Цели',
		header: null,
	};

	componentDidMount() {
		if (this.props.isAuth) {
			this._scrollToElement(
				100,
				this.props.navigation.getParam('categoryId'),
			);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isAuth) {
			this._scrollToElement(
				100,
				nextProps.navigation.getParam('categoryId'),
			);
		}
	}

	_scrollToElement = (offset, selectedIndex) => {
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
		this.setState({ selectedIndex });
	};

	renderedGoals = activeIndex => {
		switch (activeIndex) {
			case 0:
				return this.props.goals;
			case 1:
				return _.filter(this.props.goals, { defaultGoal: false });
			case 2:
				return _.filter(this.props.goals, { defaultGoal: true });
			default:
				return this.props.goals;
		}
	};

	toggleShown = () => this.setState({ isShown: !this.state.isShown });
	render() {
		const { selectedIndex } = this.state;
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
	goals: state.goals,
	categorys: state.categorys,
	isAuth: state.profile.isAuth,
});

export default connect(
	mapStateToProps,
	null,
)(GoalsScreen);
