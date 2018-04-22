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

export default class ActivityScreen extends React.Component {
	static navigationOptions = {
		title: 'Активность',
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
						<Title>Activity</Title>
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
					<Text>Activity page</Text>
				</Content>
			</Container>
		);
	}
}
