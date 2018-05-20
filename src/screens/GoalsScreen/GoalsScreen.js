import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Image, View } from 'react-native';
import { Header } from 'react-native-elements';
import {
	Container,
	Footer,
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
	Fab,
} from 'native-base';
import { WebBrowser } from 'expo';
import Collapsible from 'react-native-collapsible';
import GoalsCollapse from '../../components/GoalsCollapse/GoalsCollapse';

class GoalsScreen extends React.Component {
	state = {
		isShown: false,
	};
	static navigationOptions = {
		title: 'Цели',
		header: null,
	};

	toggleShown = () => this.setState({ isShown: !this.state.isShown });
	render() {
		return (
			<Container>
				<Header
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{
						text: 'Добавить цель',
						style: { color: '#fff' },
					}}
					rightComponent={{ icon: 'more-vert', color: '#fff' }}
				/>
				<Content padder>
					<Button
						iconLeft
						transparent
						bordered
						dark
						block
						onPress={() =>
							this.props.navigation.navigate('GoalForm')
						}
					>
						<Icon name="ios-add-circle-outline" />
						<Text>Добавить цель</Text>
					</Button>
					<GoalsCollapse
						navigation={this.props.navigation}
						goals={this.props.goals}
						categorys={this.props.categorys}
						activeCategoryID={this.props.navigation.getParam(
							'categoryId',
						)}
					/>
				</Content>
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
						this.props.navigation.navigate('GoalForm')
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
});

export default connect(mapStateToProps, null)(GoalsScreen);
