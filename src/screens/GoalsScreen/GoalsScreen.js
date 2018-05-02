import React from 'react';
import { FlatList, Image, View } from 'react-native';
import {
	Header,
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

const goalsArr = [
	{
		title: 'Футбол',
		image: <Icon name="ios-american-football" style={{ fontSize: 54 }} />,
		btnTitle: 'Поставить цель',
	},
	{
		title: 'Посмотреть фильм',
		image: <Icon name="ios-film" style={{ fontSize: 54 }} />,
		btnTitle: 'Поставить цель',
	},
	{
		title: 'Купить TV',
		image: <Icon name="ios-desktop" style={{ fontSize: 54 }} />,
		btnTitle: 'Поставить цель',
	},
	{
		title: 'Выйти на яхте',
		image: <Icon name="ios-boat" style={{ fontSize: 54 }} />,
		btnTitle: 'Поставить цель',
	},
	{
		title: 'Выпить пиво',
		image: <Icon name="ios-beer" style={{ fontSize: 54 }} />,
		btnTitle: 'Поставить цель',
	},
	{
		title: 'Купить автомобиль',
		image: <Icon name="ios-car" style={{ fontSize: 54 }} />,
		btnTitle: 'Поставить цель',
	},
];

export default class GoalsScreen extends React.Component {
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
				<Header>
					<Left>
						<Button transparent>
							<Icon name="menu" />
						</Button>
					</Left>
					<Body>
						<Title>Добавить цель</Title>
					</Body>
					<Right>
						<Button transparent>
							<Icon
								name="ios-more"
								style={{ transform: [{ rotateZ: '90deg' }] }}
							/>
						</Button>
					</Right>
				</Header>
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
					<GoalsCollapse />
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
					onPress={() => this.props.navigation.navigate('GoalForm')}
				>
					<Icon name="ios-add" />
				</Fab>
			</Container>
		);
	}
}
