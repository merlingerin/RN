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

export default class GoalsScreen extends React.Component {
	static navigationOptions = {
		title: 'Цели',
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
						<Title>Goals</Title>
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
					<Text>Goals page</Text>
				</Content>
			</Container>
		);
	}
}
