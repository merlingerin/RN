import React from 'react';
import { View, Text } from '@shoutem/ui';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AboutScreen from '../screens/Drawer/Screens/AboutScreen';
import FAQScreen from '../screens/Drawer/Screens/FAQScreen';
import FeedbackScreen from '../screens/Drawer/Screens/FeedbackScreen';
import SupportScreen from '../screens/Drawer/Screens/SupportScreen';
import TermsOfUseScreen from '../screens/Drawer/Screens/TermsOfUseScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SideMenu from '../components/Drawer';
let pkg = require('../../app.json');

export const AuthDrawer = DrawerNavigator(
	{
		Main: {
			screen: MainTabNavigator,
		},
		AboutScreen: {
			screen: AboutScreen,
		},
		FAQScreen: {
			screen: FAQScreen,
		},
		FeedbackScreen: {
			screen: FeedbackScreen,
		},
		// SupportScreen: {
		// 	screen: SupportScreen,
		// },
		TermsOfUseScreen: {
			screen: TermsOfUseScreen,
		},
	},
	{
		initialRouteName: 'Main',
		drawerWidth: 300,
		header: null,
		contentComponent: props => (
			<View>
				<View styleName="horizontal h-center" style={{ width: '100%' }}>
					<Text
						style={{
							fontSize: 32,
							color: '#8700ca',
							fontFamily: 'M-Regular',
							paddingVertical: 20,
						}}
					>
						ProfiGoals
					</Text>
				</View>
				<View styleName="horizontal h-end v-center" style={{ paddingHorizontal: 20 }}>
					<Text>ver.{pkg.expo.version}</Text>
				</View>

				<DrawerItems
					{...props}
					getLabel={scene => {
						if(props.getLabel(scene) === 'Карта целей') {
							return null
						}
						return (
							<View styleName="horizontal h-start v-center" style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
							<Text style={{ fontFamily: 'M-Regular', fontSize: 15, color: '#000' }}>{props.getLabel(scene)}</Text>
						</View>
						)
					}}
				/>
			</View>
		),
		contentOptions: {
			activeBackgroundColor: 'transparent',
			itemStyle: {
				borderBottomWidth: 1,
				borderBottomColor: '#dde5f5',
			},
			labelStyle: { fontFamily: 'M-Regular' },
			activeTintColor: '#8700ca',
		},
	},
);

export const GuestDrawer = DrawerNavigator(
	{
		HomeScreen: {
			screen: HomeScreen,
		},
		AboutScreen: {
			screen: AboutScreen,
		},
		FAQScreen: {
			screen: FAQScreen,
		},
		FeedbackScreen: {
			screen: FeedbackScreen,
		},
		// SupportScreen: {
		// 	screen: SupportScreen,
		// },
		TermsOfUseScreen: {
			screen: TermsOfUseScreen,
		},
	},
	{
		initialRouteName: 'HomeScreen',
		drawerWidth: 300,
		header: null,
	},
);
