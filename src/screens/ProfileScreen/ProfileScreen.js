import React from 'react';
import _ from 'lodash';
import { fb } from '../../services/api';

import { connect } from 'react-redux';
import { Platform } from 'react-native';
import {
	signInWithGoogle,
	authWithEmail,
	requestLogOut,
	resetError,
} from '../../ducks/profile';
import { Header, Icon } from 'react-native-elements';
import {
	Screen,
	View,
	Image,
	Subtitle,
	Title,
	Caption,
	Text,
	Heading,
} from '@shoutem/ui';
import { Form, Button, Item, Label, Input } from 'native-base';

const styles = {
	button: {
		marginTop: 15,
		width: '80%',
		marginLeft: '10%',
	},
	buttonText: {
		color: '#fff',
	},
};

class ProfileScreen extends React.Component {
	static navigationOptions = {
		title: 'Профиль',
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			isAuth: false,
			profile: {},
			authorization: {
				email: '',
				password: '',
			},
		};
	}

	componentDidMount() {
		if (this.props.isError) {
			this.props.resetError();
		}
	}

	_handleInputEmail = value => {
		this.props.resetError();
		this.setState({
			authorization: {
				...this.state.authorization,
				email: value,
			},
		});
	};

	_handleInputPassword = value => {
		this.props.resetError();
		this.setState({
			authorization: {
				...this.state.authorization,
				password: value,
			},
		});
	};

	_handleAuthorization = () => {
		// if (
		// 	!this.state.authorization.email ||
		// 	!this.state.authorization.password
		// ) {
		// 	alert("Field can't be blank!");
		// } else {
		// 	this.props.authWithEmail(
		// 		this.state.authorization.email,
		// 		this.state.authorization.password,
		// 	);
		// }
		this.props.authWithEmail(
			this.state.authorization.email,
			this.state.authorization.password,
		);
	};

	render() {
		const {
			goals,
			isAuth,
			profile,
			signInWithGoogle,
			authWithEmail,
		} = this.props;
		const sport = _.filter(goals, item => {
			return item.goalCategory.categoryId === 0;
		});
		const finance = _.filter(goals, item => {
			return item.goalCategory.categoryId === 1;
		});
		const careare = _.filter(goals, item => {
			return item.goalCategory.categoryId === 2;
		});
		const enviroment = _.filter(goals, item => {
			return item.goalCategory.categoryId === 3;
		});
		const selfExpression = _.filter(goals, item => {
			return item.goalCategory.categoryId === 4;
		});
		const family = _.filter(goals, item => {
			return item.goalCategory.categoryId === 5;
		});
		console.log('ERROR', this.props.isError ? this.props.error.code : null);
		if (!isAuth) {
			return (
				<Screen styleName="paper">
					<Header
						centerComponent={{
							text: 'Авторизация',
							style: { color: '#fff' },
						}}
						rightComponent={{
							icon: 'home',
							color: '#fff',
							onPress: () =>
								this.props.navigation.navigate('HomeScreen'),
						}}
					/>
					<Form style={{ zIndex: 9999 }}>
						<Item floatingLabel error={this.props.isError}>
							<Label>Email</Label>
							<Input
								autoCapitalize="none"
								autoCorrect={false}
								onChangeText={this._handleInputEmail}
								value={this.state.authorization.email}
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
								value={this.state.authorization.password}
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
								success
								block
								style={styles.button}
								onPress={this._handleAuthorization}
							>
								<Text style={styles.buttonText}> Log In </Text>
							</Button>
							<Button
								primary
								block
								style={styles.button}
								onPress={() =>
									this.props.navigation.navigate(
										'SignInScreen',
									)
								}
							>
								<Text style={styles.buttonText}> Sign Up </Text>
							</Button>
						</View>
					</Form>
					<View
						styleName="vertical h-center v-center"
						style={{ paddingTop: 10, zIndex: 999999 }}
					>
						<Icon
							style={{ marginTop: 40 }}
							raised
							name="google-plus"
							type="font-awesome"
							color="#f50"
							onPress={signInWithGoogle}
						/>
					</View>
				</Screen>
			);
		}
		return (
			<Screen styleName="paper">
				<Header
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{
						text: 'Профиль',
						style: { color: '#fff' },
					}}
					rightComponent={{
						icon: 'home',
						color: '#fff',
						onPress: () => console.log(fb.auth().currentUser),
					}}
				/>
				<View styleName="vertical h-center" style={{ paddingTop: 20 }}>
					<Image
						styleName="medium-avatar"
						source={
							isAuth && profile.userPhoto
								? {
										uri: profile.userPhoto,
								  }
								: require('../../../assets/images/image-3.png')
						}
					/>
					<Heading>{isAuth ? profile.name : ''}</Heading>
					<Title>{isAuth ? profile.email : ''}</Title>
				</View>
				<View styleName="vertical h-center" style={{ paddingTop: 20 }}>
					<Heading style={{ paddingBottom: 10 }}>
						Всего активных целей: {_.values(goals).length}
					</Heading>
					<Title>Спорт, Здоровье: {_.values(sport).length}</Title>
					<Title>Финансы: {_.values(finance).length}</Title>
					<Title>Карьера, развитие: {_.values(careare).length}</Title>
					<Title>Окружение: {_.values(enviroment).length}</Title>
					<Title>
						Самовыражение: {_.values(selfExpression).length}
					</Title>
					<Title>Семья: {_.values(family).length}</Title>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<Button
						error
						block
						style={styles.button}
						onPress={() => this.props.requestLogOut()}
					>
						<Text style={styles.buttonText}> Log Out </Text>
					</Button>
				</View>
			</Screen>
		);
	}
}

const mapStateToProps = state => ({
	goals: state.goals,
	isAuth: state.profile.isAuth,
	profile: state.profile.profile,
	isError: state.profile.isError,
	error: state.profile.error,
});

const mapDispatchToProps = {
	signInWithGoogle,
	authWithEmail,
	requestLogOut,
	resetError,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProfileScreen);
