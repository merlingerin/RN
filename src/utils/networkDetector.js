import { fb } from '../services/api';
import { NetInfo } from 'react-native';

const withOffline = async (apiFunction, reduxFunction, isOnline) => {
	const that = this;
	let isOffline = false;

	await NetInfo.getConnectionInfo().then(connectionInfo => {
		const isOffline =
			connectionInfo.type === 'none' || connectionInfo.type === 'unknown';
	});

	if (isOffline) {
		const what = await reduxFunction();
		return what;
	}

	reduxFunction();
	await apiFunction();
};
export default withOffline;
