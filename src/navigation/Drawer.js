import { StackNavigator, DrawerNavigator } from 'react-navigation';
import AboutScreen from '../screens/Drawer/Screens/AboutScreen';
import FAQScreen from '../screens/Drawer/Screens/FAQScreen';
import FeedbackScreen from '../screens/Drawer/Screens/FeedbackScreen';
import SupportScreen from '../screens/Drawer/Screens/SupportScreen';
import TermsOfUseScreen from '../screens/Drawer/Screens/TermsOfUseScreen';

export const Drawer1 = DrawerNavigator({
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
});
