import { fb } from '../services/api';
import { Platform } from 'react-native';

export const chainFirebaseProfileStore = async (state, syncProfile, syncGoals) => {
	try {
		// console.log('Firebase => START LOGIC');
		const { uid } = fb.auth().currentUser;

		let { lastLocalUpdate } = state.profile;
		const lastFirebaseUpdate = 10;
		await fb
			.database()
			.ref(`users/${uid}/lastUpdate`)
			.once('value')
			.then(snap => {
				lastFirebaseUpdate = snap.val() || 10;
			});
		if (lastFirebaseUpdate && lastLocalUpdate < lastFirebaseUpdate) {
			// console.log('Firebase => sychron fb with db');
			const fbGoals = await fb
				.database()
				.ref('goals/' + uid)
				.once('value')
				.then(snap => {
					return snap.val();
				});
			// console.log('Firebase ==> fbGoals from database for APp', fbGoals);
			const deepMergedGoals = fbGoals;
			// dispatchGoals(deepMergedGoals);

			await fb
				.database()
				.ref(`users/${uid}`)
				.once('value')
				.then(snap => {
					// console.log('Profile from database for APp');
					return syncProfile(snap.val());
				});
		}
	} catch (error) {
		// console.log('chainFirebaseStore error ==>', error);
		return error;
	}
};

export const chainStoreFirebase = async state => {
	try {
		// console.log('DATABSE => START LOGIC');

		const connectedRef = await fb.database().ref('.info/connected');
		const uid = fb.auth() && fb.auth().currentUser ? fb.auth().currentUser.uid : undefined;

		if (uid) {
			// console.log('DATABSE => uid', uid);

			let { lastLocalUpdate } = state.profile;
			const lastFirebaseUpdate = 1;
			await fb
				.database()
				.ref(`users/${uid}/lastUpdate`)
				.once('value')
				.then(snap => {
					// console.log('snap.val()', snap.val());
					lastFirebaseUpdate = snap.val() || 1;
				});
			// console.log('/========================================/');
			// console.log('Platform.OS', Platform.OS);
			// console.log('lastLocalUpdate > lastFirebaseUpdate', lastLocalUpdate > lastFirebaseUpdate);
			// console.log('lastLocalUpdate', lastLocalUpdate);
			// console.log('lastFirebaseUpdate', lastFirebaseUpdate);
			// console.log('/========================================/');
			if (!lastFirebaseUpdate || lastLocalUpdate > lastFirebaseUpdate) {
				// console.log('DATABSE => sychron db with fb');
				const fbGoals = await fb
					.database()
					.ref('goals/' + uid)
					.once('value')
					.then(snap => {
						return snap.val();
					});
				const deepMergedGoals = state.goalsOffline;
				await fb
					.database()
					.ref('goals/' + uid)
					.set(deepMergedGoals);

				await fb
					.database()
					.ref(`users/${uid}`)
					.set({
						lastUpdate: state.profile.lastLocalUpdate,
						profile: state.profile.profile,
					});
			}

			// if (!lastDatabaseUpdate) {
			// await fb
			// 	.database()
			// 	.ref('goals/' + uid)
			// 	.set(state.goalsOffline);
			// 	await fb
			// 		.database()
			// 		.ref('profile/' + uid)
			// 		.set(state.profile.profile);
			// }
		}
		// 	if ((!state.profile.lastLocalUpdate && asyncStoreWithDb) || (lastDatabaseUpdate > state.profile.lastLocalUpdate && asyncStoreWithDb)) {
		// await fb
		// 	.database()
		// 	.ref('goals/' + uid)
		// 	.once('value')
		// 	.then(snap => {
		// 		return asyncStoreWithDb(snap.val());
		// 	});
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
		// await fb
		// 	.database()
		// 	.ref('goals/' + uid)
		// 	.set(state.goalsOffline);
		// 				console.log('state 2');

		// 				if (state.profile.isAuth) {
		// await fb
		// 	.database()
		// 	.ref('users/' + uid)
		// 	.set({
		// 		profile: state.profile.profile,
		// 		lastUpdate: new Date().getTime(),
		// 	});
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
		return err;
	}
};
