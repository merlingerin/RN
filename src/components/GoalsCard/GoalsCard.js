import React, { Component } from 'react';
import { Image } from 'react-native';
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Thumbnail,
	Text,
	Button,
	Icon,
	Left,
	Body,
	Right,
} from 'native-base';

export default class GoalsCard extends Component {
	render() {
		return (
			<Card>
				<CardItem>
					<Left>
						<Body>
							<Text>{this.props.title}</Text>
						</Body>
					</Left>
				</CardItem>
				<CardItem cardBody>
					<Image
						source={this.props.image}
						resizeMode="contain"
						style={{ flex: 1 }}
					/>
				</CardItem>
				<CardItem>
					<Body>
						<Button transparent>
							<Icon active name="md-add-circle" />
							<Text>{this.props.btnTitle}</Text>
						</Button>
					</Body>
				</CardItem>
			</Card>
		);
	}
}
