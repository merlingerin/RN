import React from 'react';
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
} from 'native-base';
import { WebBrowser } from 'expo';

export default class StatisticScreen extends React.Component {
	static navigationOptions = {
		title: 'Статис',
		header: null,
	};

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
						<Title>Statistic</Title>
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
				<Content>
					<Text>Statistic page</Text>
				</Content>
			</Container>
		);
	}
}
