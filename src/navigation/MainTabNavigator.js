import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ActivityScreen from '../screens/ActivityScreen/ActivityScreen';
import GoalsScreen from '../screens/GoalsScreen/GoalsScreen';
import StatisticScreen from '../screens/StatisticScreen/StatisticScreen';
import AccountScreen from '../screens/AccountScreen/AccountScreen';

export default TabNavigator(
	{
		HomeScreen: {
			screen: HomeScreen,
		},
		GoalsScreen: {
			screen: GoalsScreen,
		},
		ActivityScreen: {
			screen: ActivityScreen,
		},
		StatisticScreen: {
			screen: StatisticScreen,
		},
		AccountScreen: {
			screen: AccountScreen,
		},
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused }) => {
				const { routeName } = navigation.state;
				let iconName;
				switch (routeName) {
					case 'HomeScreen':
						iconName =
							Platform.OS === 'ios'
								? `ios-albums${focused ? '' : '-outline'}`
								: `ios-albums${focused ? '' : '-outline'}`;
						break;
					case 'GoalsScreen':
						iconName =
							Platform.OS === 'ios'
								? `ios-list-box${focused ? '' : '-outline'}`
								: 'ios-list-box';
						break;
					case 'ActivityScreen':
						iconName =
							Platform.OS === 'ios'
								? `ios-calendar${focused ? '' : '-outline'}`
								: 'ios-calendar';
						break;
					case 'AccountScreen':
						iconName =
							Platform.OS === 'ios'
								? `ios-contact${focused ? '' : '-outline'}`
								: 'ios-contact';
						break;
					case 'StatisticScreen':
						iconName =
							Platform.OS === 'ios'
								? `ios-stats${focused ? '' : '-outline'}`
								: 'ios-stats';
				}
				return (
					<Ionicons
						name={iconName}
						size={28}
						style={{ marginBottom: -3, width: 25 }}
						color={
							focused
								? Colors.tabIconSelected
								: Colors.tabIconDefault
						}
					/>
				);
			},
		}),
		tabBarComponent: TabBarBottom,
		tabBarPosition: 'bottom',
		animationEnabled: true,
		swipeEnabled: false,
	},
);
