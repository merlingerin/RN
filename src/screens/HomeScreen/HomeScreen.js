import React from 'react';
import { Platform } from 'react-native';
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
				<Content>
					<Text>Home page</Text>
				</Content>
			</Container>
		);
	}
}
