import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, resetError } from '../../ducks/profile';
import Header from '../../components/CustomHeader/CustomHeader';
import { Screen, View, Text } from '@shoutem/ui';

import { Form, Button, Item, Label, Input } from 'native-base';

const styles = {
	button: {
		marginTop: 15,
	},
	buttonText: {
		color: '#fff',
	},
};

class SignInScreen extends Component {
	static navigationOptions = {
		title: 'Профиль',
		header: null,
	};
	state = {
		email: '',
		password: '',
		name: '',
	};

	componentDidMount() {
		if (this.props.isError) {
			this.props.resetError();
		}
	}

	_handleInputEmail = value => {
		this.props.resetError();
		this.setState({
			email: value,
		});
	};

	_handleInputPassword = value => {
		this.props.resetError();
		this.setState({
			password: value,
		});
	};

	_handleInputUsername = value => {
		this.props.resetError();
		this.setState({
			name: value,
		});
	};

	render() {
		if (this.props.isAuth) {
			this.props.navigation.goBack();
		}
		return (
			<Screen styleName="paper">
				<Header
					leftComponent={{
						icon: 'keyboard-backspace',
						color: '#fff',
						onPress: () => this.props.navigation.goBack(),
					}}
					centerComponent={{
						text: 'Регистрация',
						style: { color: '#fff' },
					}}
				/>
				<Form style={{ zIndex: 9999 }}>
					<Item floatingLabel error={this.props.isError}>
						<Label>Email</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={this._handleInputEmail}
							value={this.state.email}
						/>
					</Item>
					<Text
						style={{
							paddingLeft: 15,
							paddingRight: 15,
							color: 'red',
						}}
					>
						{this.props.isError ? this.props.error.message : ''}
					</Text>
					<Item floatingLabel error={this.props.isError}>
						<Label>Password</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={this._handleInputPassword}
							value={this.state.password}
						/>
					</Item>
					<Item floatingLabel error={this.props.isError}>
						<Label>Name</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={this._handleInputUsername}
							value={this.state.name}
						/>
					</Item>
					<View
						style={{
							paddingTop: 30,
							width: '90%',
							height: 150,
						}}
						styleName="vertical h-center center"
					>
						<Button
							primary
							block
							style={styles.button}
							onPress={() =>
								this.props.signIn(
									this.state.email,
									this.state.password,
									this.state.name,
								)
							}
						>
							<Text style={styles.buttonText}> Sign Up </Text>
						</Button>
					</View>
				</Form>
			</Screen>
		);
	}
}

const mapStateToProps = state => ({
	goals: state.goals,
	isAuth: state.profile.isAuth,
	isError: state.profile.isError,
	error: state.profile.error,
	profile: state.profile.profile,
});

const mapDispatchToProps = {
	signIn,
	resetError,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SignInScreen);
