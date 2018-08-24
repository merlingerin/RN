import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import { GuestDrawer, AuthDrawer } from './Drawer';
import GoalForm from '../screens/GoalForm/GoalForm';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ActivityScreen from '../screens/ActivityScreen/ActivityScreen';

import registerForPushNotificationsAsync from '../../api/registerForPushNotificationsAsync';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

export const AuthRootStackNavigator = StackNavigator(
	{
		AuthDrawer: {
			screen: AuthDrawer,
		},
		HomeScreen: {
			screen: HomeScreen,
		},
		GoalForm: {
			screen: GoalForm,
		},
		SignInScreen: {
			screen: SignInScreen,
		},
		ProfileScreen: {
			screen: ProfileScreen,
		},
		ActivityScreen: {
			screen: ActivityScreen,
		},
	},
	{
		navigationOptions: () => ({
			title: 'Главная страница',
			header: null,
			headerTitleStyle: {
				fontWeight: 'normal',
			},
		}),
	},
);

const RootStackNavigator = StackNavigator(
	{
		GuestDrawer: {
			screen: GuestDrawer,
		},
		SignInScreen: {
			screen: SignInScreen,
		},
		ProfileScreen: {
			screen: ProfileScreen,
		},
	},
	{
		navigationOptions: () => ({
			title: 'Не авторизирован',
			header: null,
			headerTitleStyle: {
				fontWeight: 'normal',
			},
		}),
	},
);

class RootNavigator extends React.Component {
	componentDidMount() {
		this._notificationSubscription = this._registerForPushNotifications();
	}

	componentWillUnmount() {
		this._notificationSubscription &&
			this._notificationSubscription.remove();
	}

	render() {
		if (this.props.isAuth) {
			return (
				<React.Fragment>
					<Spinner
						visible={this.props.loading}
						textContent={'Loading...'}
						textStyle={{ color: '#FFF' }}
					/>
					<AuthRootStackNavigator />
				</React.Fragment>
			);
		}
		return <RootStackNavigator />;
	}

	_registerForPushNotifications() {
		// Send our push token over to our backend so we can receive notifications
		// You can comment the following line out if you want to stop receiving
		// a notification every time you open the app. Check out the source
		// for this function in api/registerForPushNotificationsAsync.js
		registerForPushNotificationsAsync();

		// Watch for incoming notifications
		this._notificationSubscription = Notifications.addListener(
			this._handleNotification,
		);
	}

	_handleNotification = ({ origin, data }) => {
		console.log(
			`Push notification ${origin} with data: ${JSON.stringify(data)}`,
		);
	};
}

const mapStateToProps = state => ({
	isAuth: state.profile.isAuth,
	loading: state.loader.isShown,
});

export default connect(mapStateToProps)(RootNavigator);
