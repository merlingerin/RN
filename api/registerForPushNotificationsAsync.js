import { Constants, Permissions, Notifications } from 'expo';
import { fb } from '../src/services/api';

// Example server, implemented in Rails: https://git.io/vKHKv
const PUSH_ENDPOINT = 'https://expo-push-server.herokuapp.com/tokens';

export default (async function registerForPushNotificationsAsync() {
	// Remote notifications do not work in simulators, only on device
	if (!Constants.isDevice) {
		return;
	}

	// Android remote notification permissions are granted during the app
	// install, so this will only ask on iOS
	let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

	// Stop here if the user did not grant permissions
	if (status !== 'granted') {
		return;
	}

	// Get the token that uniquely identifies this device
	let token = await Notifications.getExpoPushTokenAsync();
	return token;
});
