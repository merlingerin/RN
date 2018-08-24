import { DrawerNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AboutScreen from '../screens/Drawer/Screens/AboutScreen';
import FAQScreen from '../screens/Drawer/Screens/FAQScreen';
import FeedbackScreen from '../screens/Drawer/Screens/FeedbackScreen';
import SupportScreen from '../screens/Drawer/Screens/SupportScreen';
import TermsOfUseScreen from '../screens/Drawer/Screens/TermsOfUseScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

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
		SupportScreen: {
			screen: SupportScreen,
		},
		TermsOfUseScreen: {
			screen: TermsOfUseScreen,
		},
	},
	{
		initialRouteName: 'Main',
		drawerWidth: 300,
		header: null,
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
		SupportScreen: {
			screen: SupportScreen,
		},
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
