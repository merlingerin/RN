import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Text,
	Body,
	Form,
	Item,
	Input,
	Label,
	H2,
	Button,
	Icon,
} from 'native-base';

export default class AuthModal extends Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'flex-start' }}>
				<Modal
					onBackdropPress={() => this.props.turnOffModal()}
					onSwipe={() => this.props.turnOffModal()}
					isVisible={this.props.isVisible}
				>
					<Card
						style={{ maxHeight: 250, backgroundColor: '#ffffff' }}
					>
						<Body style={{ flex: 1, width: '100%' }}>
							<H2>Авторизация</H2>
							<Form style={{ flex: 1, width: '100%' }}>
								<Item floatingLabel>
									<Label>Email</Label>
									<Input />
								</Item>
								<Item floatingLabel>
									<Label>Password</Label>
									<Input />
								</Item>
								<Button
									iconLeft
									style={{
										alignSelf: 'center',
										marginTop: 30,
									}}
								>
									<Icon name="home" />
									<Text>Sign In</Text>
								</Button>
							</Form>
						</Body>
					</Card>
				</Modal>
			</View>
		);
	}
}
