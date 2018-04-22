import React from 'react';
import { Platform, View, TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
	Header,
	Container,
	Title,
	Content,
	Tabs,
	Tab,
	Left,
	Right,
	Body,
	Text,
	Card,
	Icon,
	Button,
	H1,
} from 'native-base';
import { WebBrowser } from 'expo';

import GoalsCard from 'components/GoalsCard/GoalsCard';

const goalsArr = [
	[
		{
			title: 'Финансы',
			image: require('../../../assets/images/cards/cash.png'),
			btnTitle: 'Поставить цель',
		},
		{
			title: 'Спорт и здоровье',
			image: require('../../../assets/images/cards/sport.png'),
			btnTitle: 'Поставить цель',
		},
	],
	[
		{
			title: 'Карьера',
			image: require('../../../assets/images/cards/finance.png'),
			btnTitle: 'Поставить цель',
		},
		{
			title: 'Семья',
			image: require('../../../assets/images/cards/family.png'),
			btnTitle: 'Поставить цель',
		},
	],
	[
		{
			title: 'Самовыражение',
			image: require('../../../assets/images/cards/world.png'),
			btnTitle: 'Поставить цель',
		},
		{
			title: 'Окружение',
			image: require('../../../assets/images/cards/friends.png'),
			btnTitle: 'Поставить цель',
		},
	],
];

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Карта',
		header: null,
	};

	render() {
		return (
			<Container>
				<Header style={{ paddingTop: Platform.OS === 'ios' ? 0 : 15 }}>
					<Left>
						<Button transparent>
							<Icon name="menu" />
						</Button>
					</Left>
					<Body>
						<Title>Go to Goals</Title>
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
				<View
					style={{
						position: 'absolute',
						top: '42%',
						width: 150,
						height: 150,
						backgroundColor: 'transparent',
						alignItems: 'center',
						justifyContent: 'center',
						alignSelf: 'center',
						zIndex: 10,
					}}
				>
					<TouchableOpacity
						style={{
							borderWidth: 1,
							borderColor: 'rgba(0,0,0,0.2)',
							alignItems: 'center',
							justifyContent: 'center',
							margin: 'auto',
							width: 150,
							height: 150,
							backgroundColor: '#fff',
							borderRadius: 100,
							zIndex: 10,
						}}
					>
						<Icon size={35} name="md-person-add" />
						<Text>Авторизироватся</Text>
					</TouchableOpacity>
				</View>
				<Content>
					<Grid>
						{goalsArr.map((item, idx) => (
							<Row key={idx}>
								{item.map((item, idx) => (
									<Col key={idx} style={{ width: '50%' }}>
										<GoalsCard
											title={item.title}
											image={item.image}
											btnTitle={item.btnTitle}
										/>
									</Col>
								))}
							</Row>
						))}
					</Grid>
				</Content>
			</Container>
		);
	}
}
