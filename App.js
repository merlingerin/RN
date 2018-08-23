import React from 'react';
import {
	Platform,
	StatusBar,
	StyleSheet,
	NetInfo,
	View,
	Text,
} from 'react-native';
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
		NetInfo.addEventListener('connectionChange', status =>
			this._handleFirstConnectivityChange(status),
		);
	}

	componentWillUnmount() {
		NetInfo.removeEventListener('connectionChange', status =>
			this._handleFirstConnectivityChange(status),
		);
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
			return (
				<AppLoading
					startAsync={this._loadResourcesAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			);
		} else {
			return (
				<Provider store={store}>
					<PersistGate
						loading={
							<Spinner
								visible={true}
								textContent={'Loading...'}
								textStyle={{ color: '#FFF' }}
							/>
						}
						persistor={persistor}
					>
						<View style={styles.container}>
							{Platform.OS === 'ios' && (
								<StatusBar barStyle="default" />
							)}
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
			]),
			Font.loadAsync({
				// This is the font that we are using for our tab bar
				...Ionicons.font,
				// We include SpaceMono because we use it in HomeScreen.js. Feel free
				// to remove this if you are not using it in your app
				Roboto: require('./assets/fonts/Roboto.ttf'),
				Roboto_medium: require('./assets/fonts/Roboto_medium.ttf'),
				Ionicons: require('./assets/fonts/Ionicons.ttf'),

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
