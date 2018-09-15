import React from 'react';
import _ from 'lodash';
import { fb } from '../../services/api';
import { LinearGradient, Notifications } from 'expo';
import { Dimensions, ListView } from 'react-native';
import { connect } from 'react-redux';
import { signInWithGoogle, authWithEmail, requestLogOut, resetError } from '../../ducks/profile';
import Header from '../../components/CustomHeader/CustomHeader';
import { Icon, Avatar } from 'react-native-elements';
import { Screen, View, Image, Title, Text, Heading } from '@shoutem/ui';
import { Form, Button, Item, Label, Input, Icon as NativeIcon } from 'native-base';
import Styles from '../../styles/styles';

const styles = {
	button: {
		marginTop: 15,
		width: '80%',
		marginLeft: '10%',
	},
	buttonText: {
		color: '#fff',
	},
	avatarBorder: {
		width: 75,
		height: 75,
	},
	userNameText: {
		fontSize: 24,
		lineHeight: 26,
		color: '#000',
		fontFamily: 'MA-Regular',
	},
	userEmailText: {
		fontSize: 14,
		fontFamily: 'MA-Regular',
		color: '#8700ca',
	},
	listTitleText: {
		fontSize: 18,
		color: '#000',
		fontFamily: 'MA-Regular',
	},
	listDefaultText: {
		fontSize: 14,
		color: '#000',
		fontFamily: 'MA-Regular',
	},
	listDefaultTextDecorator: {
		width: 20,
		height: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#cfd9ed',
		borderRadius: 7,
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
		this.props.authWithEmail(this.state.authorization.email, this.state.authorization.password);
	};

	render() {
		const { goals, isAuth, profile, signInWithGoogle, authWithEmail } = this.props;

		const activeGoals = _.filter(goals, item => {
			return item.defaultGoal !== true && item.active === 1;
		});

		const sport = _.filter(goals, item => {
			return item.goalCategory.categoryId === 5 && item.defaultGoal !== true && item.active === 1;
		});
		const finance = _.filter(goals, item => {
			return item.goalCategory.categoryId === 1 && item.defaultGoal !== true && item.active === 1;
		});
		const careare = _.filter(goals, item => {
			return item.goalCategory.categoryId === 3 && item.defaultGoal !== true && item.active === 1;
		});
		const enviroment = _.filter(goals, item => {
			return item.goalCategory.categoryId === 4 && item.defaultGoal !== true && item.active === 1;
		});
		const selfExpression = _.filter(goals, item => {
			return item.goalCategory.categoryId === 0 && item.defaultGoal !== true && item.active === 1;
		});
		const family = _.filter(goals, item => {
			return item.goalCategory.categoryId === 2 && item.defaultGoal !== true && item.active === 1;
		});

		const RenderListRow = ({ leftText, rightText, customStyles }) => {
			return (
				<View
					style={{
						paddingHorizontal: 15,
						width: '100%',
						paddingVertical: 4,
						...Styles.borderBottom,
						...customStyles,
					}}
					styleName="horizontal v-center space-between"
				>
					<Title style={styles.listDefaultText}>{leftText && leftText.toUpperCase()}</Title>
					<View style={styles.listDefaultTextDecorator}>
						<Title style={styles.listDefaultText}>{rightText}</Title>
					</View>
				</View>
			);
		};

		if (!this.props.isAuth) {
			return (
				<Screen styleName="paper">
					<LinearGradient style={{ flex: 1 }} colors={['#ffffff', '#edf3ff', '#edf3ff']}>
						<Header
							// centerComponent={{
							// 	text: 'Авторизация',
							// 	style: { color: '#8700ca' },
							// }}
							leftComponent={{
								icon: 'home',
								color: '#ffffff',
								onPress: () => this.props.navigation.navigate('HomeScreen'),
							}}
						/>
						{/* <View styleName="horizontal h-start v-center" style={{ paddingHorizontal: 20, height: 70 }}>
							<Icon name="home" color="#8700ca" onPress={() => this.props.navigation.navigate('HomeScreen')} />
						</View> */}
						<View styleName="vertical h-center v-center">
							<Title style={{ fontFamily: 'MA-Regular', fontSize: 42, lineHeight: 46, color: '#8700ca' }}>Вход</Title>
							<Text style={{ fontFamily: 'MA-Regular', fontSize: 17, color: '#000000' }}>Добро пожаловать в Цели!</Text>
						</View>
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
								{this.props.isError && this.props.error ? this.props.error.message : ''}
							</Text>
							<Item floatingLabel error={this.props.isError}>
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
									value={this.state.authorization.password}
								/>
							</Item>
							<View
								style={{
									paddingTop: 10,
									width: '90%',
									// height: 350,
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
									onPress={this._handleAuthorization}
								>
									<Text style={styles.buttonText}> ВОЙТИ </Text>
								</Button>
								<Button
									error
									block
									style={{
										width: '80%',
										alignSelf: 'center',
										marginVertical: 10,
										backgroundColor: 'transparent',
										borderWidth: 1,
										borderColor: '#8700ca',
										shadowColor: '#8700ca',
										shadowRadius: 15,
										elevation: 3,
										borderRadius: 7,
									}}
									onPress={() => this.props.navigation.navigate('SignInScreen')}
								>
									<Text style={{ ...styles.buttonText, color: '#8700ca' }}> РЕГИСТРАЦИЯ </Text>
								</Button>
								<Button
									style={{
										width: '80%',
										alignSelf: 'center',
										marginVertical: 10,
										backgroundColor: '#f34a38',
										shadowColor: '#f34a38',
										shadowRadius: 15,
										elevation: 3,
										borderRadius: 7,
										paddingHorizontal: 25,
									}}
									onPress={signInWithGoogle}
									iconRight
								>
									<Text style={{ ...styles.buttonText, color: '#ffffff' }}> ВОЙТИ С ПОМОЩЬЮ </Text>
									<NativeIcon active name="logo-googleplus" style={{ color: '#ffffff' }} />
								</Button>
								{/* <Button success block style={styles.button} onPress={this._handleAuthorization}>
									<Text style={styles.buttonText}> Log In </Text>
								</Button>
								<Button primary block style={styles.button} onPress={() => this.props.navigation.navigate('SignInScreen')}>
									<Text style={styles.buttonText}> Sign Up </Text>
								</Button>*/}
							</View>
						</Form>

						{/* <View styleName="vertical h-center v-center" style={{ paddingTop: 10, zIndex: 999999 }}>
							<Icon style={{ marginTop: 40 }} raised name="google-plus" type="font-awesome" color="#f50" onPress={signInWithGoogle} />
						</View> */}
					</LinearGradient>
				</Screen>
			);
		}
		return (
			<Screen styleName="paper" style={{ backgroundColor: '#edf3ff' }}>
				<Header
					leftComponent={{
						icon: 'menu',
						color: '#fff',
						underlayColor: 'transparent',
						onPress: () => this.props.navigation.navigate('DrawerOpen'),
					}}
					centerComponent={{
						text: 'Профиль',
						style: { color: '#fff' },
					}}
					rightComponent={{
						icon: 'home',
						color: '#fff',
						onPress: () => this.props.navigation.navigate('HomeScreen'),
					}}
				/>
				<View
					styleName="vertical h-center"
					style={{
						paddingTop: 5,
						backgroundColor: '#8700ca',
						top: -1,
						paddingBottom: 150,
					}}
				/>
				<View
					style={{
						width: 159,
						height: 159,
						top: -190,
						marginHorizontal: 'auto',
						alignSelf: 'center',
						borderColor: 'rgba(255,255,255, 0.15)',
						borderWidth: 10,
						borderRadius: 159 / 2,
						zIndex: 9,
						elevation: 1,
						zIndex: 15,
					}}
					styleName="medium-avatar"
				>
					<Image
						styleName="medium-avatar"
						source={
							this.props.isAuth && profile.userPhoto
								? {
										uri: profile.userPhoto,
								  }
								: require('../../../assets/images/image-3.png')
						}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'column',
						flexWrap: 'wrap',
						width: '90%',
						marginHorizontal: 'auto',
						alignSelf: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						// position: 'absolute',
						top: -270,
						paddingTop: 80,
						paddingBottom: 15,
						backgroundColor: '#fff',
						borderRadius: 7,
						zIndex: 10,
					}}
				>
					<Heading
						style={{
							...styles.userNameText,
						}}
					>
						{profile.name}
					</Heading>
					<Title
						style={{
							...styles.userEmailText,
						}}
					>
						{profile.email}
					</Title>
				</View>
				<View
					styleName="vertical h-center"
					style={{
						paddingTop: 50,
						top: -315,
						backgroundColor: '#edf3ff',
						zIndex: 1,
					}}
				>
					<Heading
						style={{
							paddingBottom: 10,
							color: '#000',
							fontSize: 15,
							fontFamily: 'MA-Regular',
						}}
					>
						Всего активных целей: {_.values(activeGoals).length}
					</Heading>
					<RenderListRow
						leftText="Самореализация / Драйв"
						rightText={_.values(selfExpression).length}
						customStyles={{
							borderTopWidth: 1,
							borderTopColor: '#dde5f5',
						}}
					/>
					<RenderListRow leftText="Карьера / Развитие" rightText={_.values(careare).length} />
					<RenderListRow leftText="Семья" rightText={_.values(family).length} />
					<RenderListRow leftText="Финансы" rightText={_.values(finance).length} />
					<RenderListRow leftText="Окружение / Друзья" rightText={_.values(enviroment).length} />
					<RenderListRow leftText="Энергия / Отдых" rightText={_.values(sport).length} />
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
						onPress={() => this.props.requestLogOut()}
					>
						<Text style={styles.buttonText}> Выйти </Text>
					</Button>
				</View>
			</Screen>
		);
	}
}

const mapStateToProps = state => ({
	goals: state.goalsOffline,
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
