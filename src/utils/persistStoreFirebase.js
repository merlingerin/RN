import { fb } from '../services/api';

const saveState = async (state, asyncStoreWithDb, asycProfileStorageWithDb) => {
	try {
		const connectedRef = await fb.database().ref('.info/connected');
		const { uid } = fb.auth().currentUser;
		if (uid) {
			let lastDatabaseUpdate = null;
			let { lastLocalUpdate } = state.profile;
			// console.log('state 0 ');
			await fb
				.database()
				.ref(`users/${uid}/lastUpdate`)
				.once('value')
				.then(snap => {
					lastDatabaseUpdate = snap.val() || 10;
				});
			// console.log('lastDatabaseUpdate', lastDatabaseUpdate);
			// console.log('lastLocalUpdate', lastLocalUpdate);
			if (!lastDatabaseUpdate) {
				await fb
					.database()
					.ref('goals/' + uid)
					.set(state.goalsOffline);
				await fb
					.database()
					.ref('profile/' + uid)
					.set(state.profile.profile);
			}
		}
		// 	if ((!state.profile.lastLocalUpdate && asyncStoreWithDb) || (lastDatabaseUpdate > state.profile.lastLocalUpdate && asyncStoreWithDb)) {
		// 		await fb
		// 			.database()
		// 			.ref('goals/' + uid)
		// 			.once('value')
		// 			.then(snap => {
		// 				return asyncStoreWithDb(snap.val());
		// 			});
		// 		await fb
		// 			.database()
		// 			.ref('profile/' + uid)
		// 			.once('value')
		// 			.then(snap => {
		// 				return asycProfileStorageWithDb(snap.val());
		// 			});
		// 		console.log('state 1 UPDATE GOALS FROM DATABASE ');

		// 		// return true;
		// 	} else {
		// 		console.log('merge db with store');
		// await fb
		// 	.database()
		// 	.ref('goals/' + uid)
		// 	.set(state.goalsOffline);
		// await fb
		// 	.database()
		// 	.ref('profile/' + uid)
		// 	.set(state.profile.profile);
		// 	}
		// 	connectedRef.on('value', async function(snap) {
		// 		if (snap.val() === true) {
		// 			if (uid) {
		// 				await fb
		// 					.database()
		// 					.ref('goals/' + uid)
		// 					.set(state.goalsOffline);
		// 				console.log('state 2');

		// 				if (state.profile.isAuth) {
		// 					await fb
		// 						.database()
		// 						.ref('users/' + uid)
		// 						.set({
		// 							profile: state.profile.profile,
		// 							lastUpdate: new Date().getTime(),
		// 						});
		// 					console.log('state 3');
		// 				}
		// 			}
		// 		} else {
		// 			console.log('state 4');
		// 			return undefined;
		// 		}
		// 	});
		// }
	} catch (err) {
		// console.log('state 5');
		// console.log('state 5', err);
		return undefined;
	}
};

export default saveState;
