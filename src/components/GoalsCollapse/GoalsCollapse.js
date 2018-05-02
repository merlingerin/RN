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
} from 'native-base';
import { WebBrowser } from 'expo';
import Collapsible from 'react-native-collapsible';

const goalsArr = [
	{
		title: 'Finance',
		id: 1,
		icon: <Icon active name="ios-cash" />,
		data: [
			{
				title: 'Футбол',
				image: (
					<Icon
						name="ios-american-football"
						style={{ fontSize: 54 }}
					/>
				),
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
		],
	},
	{
		title: 'Sport',
		id: 2,
		icon: <Icon active name="ios-football" />,
		data: [
			{
				title: 'Футбол',
				image: (
					<Icon
						name="ios-american-football"
						style={{ fontSize: 54 }}
					/>
				),
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
		],
	},
	{
		title: 'Sociale',
		id: 3,
		icon: <Icon name="ios-chatbubbles" />,
		data: [
			{
				title: 'Футбол',
				image: (
					<Icon
						name="ios-american-football"
						style={{ fontSize: 54 }}
					/>
				),
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
		],
	},
];

export default class GoalsCollapse extends React.Component {
	state = {
		activeIndex: 0,
	};
	_handleClick = idx => this.setState({ activeIndex: idx });
	render() {
		return (
			<React.Fragment>
				{goalsArr.map(item => (
					<Card key={item.id}>
						<CardItem
							button
							onPress={() => this._handleClick(item.id)}
						>
							{item.icon}
							<Text>{item.title}</Text>
							<Right>
								<Icon
									name="ios-arrow-up"
									style={{
										transform: [
											{
												rotateZ: `${
													this.state.activeIndex ===
													item.id
														? '0deg'
														: '180deg'
												}`,
											},
										],
									}}
								/>
							</Right>
						</CardItem>
						<Collapsible
							collapsed={this.state.activeIndex !== item.id}
						>
							<CardItem>
								<FlatList
									data={item.data}
									keyExtractor={(item, idx) => item.title}
									renderItem={({ item }) => (
										<Card
											style={{
												minWidth: 170,
												minHeight: 170,
											}}
										>
											<CardItem>
												<Left>
													<Body
														style={{
															flex: 1,
															alignItems:
																'center',
															justifyContent:
																'center',
														}}
													>
														<Text>
															{item.title}
														</Text>
													</Body>
												</Left>
											</CardItem>
											<CardItem
												style={{
													flex: 1,
												}}
												cardBody
											>
												<Body
													style={{
														flex: 1,
														alignItems: 'center',
														justifyContent:
															'center',
													}}
												>
													{item.image}
												</Body>
											</CardItem>
										</Card>
									)}
									horizontal
								/>
							</CardItem>
						</Collapsible>
					</Card>
				))}
			</React.Fragment>
		);
	}
}
