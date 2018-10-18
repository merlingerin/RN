import React from 'react';
import { Platform, StatusBar, StyleSheet, NetInfo, View, Text } from 'react-native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import { Root } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
export const { store, persistor } = configureStore();

export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
		isOffline: false,
	};

	componentDidMount() {
		NetInfo.addEventListener('connectionChange', status => this._handleFirstConnectivityChange(status));
	}

	componentWillUnmount() {
		NetInfo.removeEventListener('connectionChange', status => this._handleFirstConnectivityChange(status));
	}

	_handleFirstConnectivityChange = status => {
		if (!status) {
			return this.setState({
				isOffline: true,
			});
		}
		const isOffline = status.type === 'none' || status.type === 'unknown';
		if (!isOffline && this.state.isOffline) {
			setTimeout(() => {
				this.setState({
					isOffline: isOffline,
				});
			}, 3000);
		}
		this.setState({
			isOffline: isOffline,
		});
	};

	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return <AppLoading startAsync={this._loadResourcesAsync} onError={this._handleLoadingError} onFinish={this._handleFinishLoading} />;
		} else {
			return (
				<Provider store={store}>
					<PersistGate loading={<Spinner visible={true} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />} persistor={persistor}>
						<View style={styles.container}>
							{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
							<Root>
								<RootNavigation />
								{/* {this.state.isOffline && <NoConnection />} */}
							</Root>
						</View>
					</PersistGate>
				</Provider>
			);
		}
	}

	_loadResourcesAsync = async () => {
		return Promise.all([
			Asset.loadAsync([
				require('./assets/images/robot-dev.png'),
				require('./assets/images/robot-prod.png'),
				require('./assets/images/categorys/00-min.jpg'),
				require('./assets/images/categorys/01-min.jpg'),
				require('./assets/images/categorys/02-min.jpg'),
				require('./assets/images/categorys/03-min.jpg'),
				require('./assets/images/categorys/04-min.jpg'),
				require('./assets/images/anonimProfile.png'),
				require('./assets/images/image-3.png'),
				/** TEMPLATE IMAGES*/
				require('./assets/images/template/categorys/category-0.png'),
				require('./assets/images/template/categorys/category-1.png'),
				require('./assets/images/template/categorys/category-2.png'),
				require('./assets/images/template/categorys/category-3.png'),
				require('./assets/images/template/categorys/category-4.png'),
				require('./assets/images/template/categorys/category-5.png'),

				require('./assets/images/template/profileCategorys/category-0.png'),
				require('./assets/images/template/profileCategorys/category-1.png'),
				require('./assets/images/template/profileCategorys/category-2.png'),
				require('./assets/images/template/profileCategorys/category-3.png'),
				require('./assets/images/template/profileCategorys/category-4.png'),
				require('./assets/images/template/profileCategorys/category-5.png'),

				require('./assets/images/template/categorys/backgrounds/1.png'),
				require('./assets/images/template/categorys/backgrounds/2.png'),
				require('./assets/images/template/categorys/backgrounds/3.png'),
				require('./assets/images/template/categorys/backgrounds/4.png'),
				require('./assets/images/template/categorys/backgrounds/5.png'),
				require('./assets/images/template/categorys/backgrounds/6.png'),

				/**
				 * CATEGORY RELAX AND SPORT
				 */
				require('./assets/images/categorys/relax/relax1.jpg'),
				require('./assets/images/categorys/relax/relax2.jpg'),
				require('./assets/images/categorys/relax/relax3.jpg'),
				require('./assets/images/categorys/relax/relax4.jpg'),
				require('./assets/images/categorys/relax/relax1.1.jpg'),
				require('./assets/images/categorys/relax/relax1.2.jpg'),
				require('./assets/images/categorys/relax/relax1.3.jpg'),
				require('./assets/images/categorys/relax/relax1.4.jpg'),
				require('./assets/images/categorys/relax/relax1.5.jpg'),
				require('./assets/images/categorys/relax/relax1.6.jpg'),
				require('./assets/images/categorys/relax/relax1.7.jpg'),
				require('./assets/images/categorys/relax/relax1.9.jpg'),
				require('./assets/images/categorys/relax/relax1.10.jpg'),
				require('./assets/images/categorys/relax/relax1.11.jpg'),

				/**
				 * CATEGORY SELFExpression
				 */
				require('./assets/images/categorys/selfExpression/selfExpression1.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression2.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression3.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression4.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression1.1.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression1.2.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression1.3.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression1.4.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression1.5.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression1.6.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression1.7.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression1.9.jpg'),
				require('./assets/images/categorys/selfExpression/selfExpression1.10.jpg'),

				/**
				 * CATEGORY FAMILY
				 */
				require('./assets/images/categorys/family/family1.png'),
				require('./assets/images/categorys/family/family2.jpg'),
				require('./assets/images/categorys/family/family3.jpg'),
				require('./assets/images/categorys/family/family1.1.jpg'),
				require('./assets/images/categorys/family/family1.2.jpg'),
				require('./assets/images/categorys/family/family1.3.jpg'),
				require('./assets/images/categorys/family/family1.4.jpg'),
				require('./assets/images/categorys/family/family1.5.jpg'),
				require('./assets/images/categorys/family/family1.6.jpg'),
				require('./assets/images/categorys/family/family1.7.jpg'),
				require('./assets/images/categorys/family/family1.9.jpg'),
				require('./assets/images/categorys/family/family1.10.jpg'),
				require('./assets/images/categorys/family/family1.11.jpg'),
				require('./assets/images/categorys/family/family1.12.jpg'),

				/**
				 * CATEGORY FINANCE
				 */
				require('./assets/images/categorys/finance/finance1.1.jpg'),
				require('./assets/images/categorys/finance/finance1.2.jpg'),
				require('./assets/images/categorys/finance/finance1.3.jpg'),
				require('./assets/images/categorys/finance/finance1.4.jpg'),
				require('./assets/images/categorys/finance/finance1.5.jpg'),
				require('./assets/images/categorys/finance/finance1.6.jpg'),
				require('./assets/images/categorys/finance/finance1.7.jpg'),
				require('./assets/images/categorys/finance/finance1.jpg'),
				require('./assets/images/categorys/finance/finance2.jpg'),
				require('./assets/images/categorys/finance/finance3.jpg'),

				/**
				 * CATEGORY FRIEND
				 */
				require('./assets/images/categorys/friend/friend1.1.jpg'),
				require('./assets/images/categorys/friend/friend1.2.jpg'),
				require('./assets/images/categorys/friend/friend1.3.jpg'),
				require('./assets/images/categorys/friend/friend1.4.jpg'),
				require('./assets/images/categorys/friend/friend1.5.jpg'),
				require('./assets/images/categorys/friend/friend1.6.jpg'),
				require('./assets/images/categorys/friend/friend1.7.jpg'),
				require('./assets/images/categorys/friend/friend1.8.jpg'),
				require('./assets/images/categorys/friend/friend1.9.jpg'),
				require('./assets/images/categorys/friend/friend1.jpg'),
				require('./assets/images/categorys/friend/friend2.jpg'),
				require('./assets/images/categorys/friend/friend3.jpg'),

				/**
				 * CATEGORY CAREAR
				 */
				require('./assets/images/categorys/carear/carear1.jpg'),
				require('./assets/images/categorys/carear/carear2.jpg'),
				require('./assets/images/categorys/carear/carear3.jpg'),
				require('./assets/images/categorys/carear/carear4.jpg'),
				require('./assets/images/categorys/carear/carear1.1.jpg'),
				require('./assets/images/categorys/carear/carear1.2.jpg'),
				require('./assets/images/categorys/carear/carear1.3.jpg'),
				require('./assets/images/categorys/carear/carear1.4.jpg'),
				// ============================================================
			]),
			Font.loadAsync({
				// This is the font that we are using for our tab bar
				...Ionicons.font,
				// We include SpaceMono because we use it in HomeScreen.js. Feel free
				// to remove this if you are not using it in your app
				Roboto: require('./assets/fonts/Roboto.ttf'),
				Roboto_medium: require('./assets/fonts/Roboto_medium.ttf'),
				Ionicons: require('./assets/fonts/Ionicons.ttf'),

				/**TEMPLATE FONTS*/
				'M-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
				'M-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
				'MA-Bold': require('./assets/fonts/MontserratAlternates-Bold.ttf'),
				'MA-Regular': require('./assets/fonts/MontserratAlternates-Regular.ttf'),
				// ============================================================

				'Rubik-Regular': require('./assets/fonts/Rubik/Rubik-Regular.ttf'),
				'rubicon-icon-font': require('./assets/fonts/Rubik/rubicon-icon-font.ttf'),
			}),
		]);
	};

	_handleLoadingError = error => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error);
	};

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
