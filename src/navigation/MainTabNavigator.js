import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ActivityScreen from '../screens/ActivityScreen/ActivityScreen';
import GoalsScreen from '../screens/GoalsScreen/GoalsScreen';
import StatisticScreen from '../screens/StatisticScreen/StatisticScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';

export default TabNavigator(
	{
		HomeScreen: {
			screen: HomeScreen,
		},
		GoalsScreen: {
			screen: GoalsScreen,
		},
		// ActivityScreen: {
		// 	screen: ActivityScreen,
		// },
		// StatisticScreen: {
		// 	screen: StatisticScreen,
		// },
		ProfileScreen: {
			screen: ProfileScreen,
		},
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused }) => {
				const { routeName } = navigation.state;
				let iconName;
				switch (routeName) {
					case 'HomeScreen':
						iconName = Platform.OS === 'ios' ? `ios-map${focused ? '-outline' : '-outline'}` : `ios-map${focused ? '-outline' : '-outline'}`;
						break;
					case 'GoalsScreen':
						iconName = Platform.OS === 'ios' ? `ios-list-box${focused ? '-outline' : '-outline'}` : `ios-list-box${focused ? '-outline' : '-outline'}`;
						break;
					case 'ActivityScreen':
						iconName = Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'ios-calendar';
						break;
					case 'ProfileScreen':
						iconName = Platform.OS === 'ios' ? `ios-contact${focused ? '-outline' : '-outline'}` : `ios-contact${focused ? '-outline' : '-outline'}`;
						break;
					case 'StatisticScreen':
						iconName = Platform.OS === 'ios' ? `ios-stats${focused ? '' : '-outline'}` : 'ios-stats';
				}
				return <Ionicons name={iconName} size={30} style={{ marginBottom: -3, width: 25 }} color={focused ? Colors.tabIconSelected : Colors.tabIconDefault} />;
			},
		}),
		tabBarComponent: TabBarBottom,
		tabBarPosition: 'bottom',
		animationEnabled: true,
		swipeEnabled: false,
		tabBarOptions: {
			upperCaseLabel: true,
			inactiveTintColor: '#000',
			activeTintColor: '#8700ca',
			labelStyle: {
				fontSize: 12,
				fontFamily: 'M-Bold',
			},
			style: {
				borderTopWidth: 0,
				backgroundColor: '#ffffff',
			},
		},
	},
);
