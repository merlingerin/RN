import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, resetError } from '../../ducks/profile';
import { LinearGradient } from 'expo';
import Header from '../../components/CustomHeader/CustomHeader';
import { Screen, View, Text, Title } from '@shoutem/ui';
import Styles from '../../styles/styles';
import { Icon } from 'react-native-elements';
import { Form, Button, Item, Label, Input, Icon as NativeIcon } from 'native-base';

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
				<LinearGradient style={{ flex: 1 }} colors={['#ffffff', '#edf3ff', '#edf3ff']}>
					<Header
						leftComponent={{
							icon: 'keyboard-backspace',
							color: '#ffffff',
							onPress: () => this.props.navigation.goBack(),
						}}
						centerComponent={{
							text: 'Регистрация',
							style: { color: '#ffffff' },
						}}
					/>
					{/* <View styleName="horizontal v-center h-start" style={{ height: 70, paddingHorizontal: 20 }}>
						<Icon name="keyboard-backspace" color="#8700ca" onPress={() => this.props.navigation.goBack()} />
					</View> */}
					<Form style={{ zIndex: 9999 }}>
						<Item floatingLabel error={this.props.isError}>
							<NativeIcon active name="md-person" style={{ fontSize: 14, color: '#8700ca' }} />
							<Label
								style={{
									fontFamily: 'MA-Regular',
								}}
							>
								Email
							</Label>
							<Input
								style={{
									color: 'rgba(135, 0, 202, 1)',
									fontSize: 16,
									lineHeight: 16,
									fontFamily: 'MA-Regular',
								}}
								returnKeyType={'done'}
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
								fontFamily: 'M-Regular',
							}}
						>
							{this.props.isError ? this.props.error.message : ''}
						</Text>
						<Item floatingLabel>
							<NativeIcon active name="md-lock" style={{ fontSize: 14, color: '#8700ca' }} />
							<Label
								style={{
									fontFamily: 'MA-Regular',
								}}
							>
								Пароль
							</Label>
							<Input
								style={{
									color: 'rgba(135, 0, 202, 1)',
									fontSize: 16,
									lineHeight: 16,
									fontFamily: 'MA-Regular',
								}}
								returnKeyType={'done'}
								autoCapitalize="none"
								autoCorrect={false}
								onChangeText={this._handleInputPassword}
								value={this.state.password}
							/>
						</Item>
						<Item floatingLabel>
							<NativeIcon active name="md-information" style={{ fontSize: 14, color: '#8700ca' }} />
							<Label
								style={{
									fontFamily: 'MA-Regular',
								}}
							>
								Имя
							</Label>
							<Input
								style={{
									color: 'rgba(135, 0, 202, 1)',
									fontSize: 16,
									lineHeight: 16,
									fontFamily: 'MA-Regular',
								}}
								returnKeyType={'done'}
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
								error
								block
								style={{
									width: '80%',
									alignSelf: 'center',
									marginVertical: 10,
									backgroundColor: '#8700ca',
									shadowColor: '#8700ca',
									shadowRadius: 15,
									elevation: 3,
									borderRadius: 7,
								}}
								onPress={() => this.props.signIn(this.state.email, this.state.password, this.state.name)}
							>
								<Text style={styles.buttonText}> РЕГИСТРАЦИЯ </Text>
							</Button>
						</View>
					</Form>
				</LinearGradient>
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
