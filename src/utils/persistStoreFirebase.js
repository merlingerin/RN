import { fb } from '../services/api';

const saveState = async (state, asyncStoreWithDb) => {
	try {
		const connectedRef = await fb.database().ref('.info/connected');
		const { uid } = fb.auth().currentUser;
		if (uid) {
			let lastDatabaseUpdate = null;
			await fb
				.database()
				.ref(`users/${fb.auth().currentUser.uid}/lastUpdate`)
				.once('value')
				.then(snap => {
					lastDatabaseUpdate = snap.val();
				});

			if (lastDatabaseUpdate > state.profile.lastLocalUpdate) {
				await fb
					.database()
					.ref('goals/' + uid)
					.once('value')
					.then(snap => {
						return asyncStoreWithDb(snap.val());
					});
				return true;
			}
			connectedRef.on('value', async function(snap) {
				if (snap.val() === true) {
					if (uid) {
						await fb
							.database()
							.ref('goals/' + uid)
							.set(state.goalsOffline);

						if (state.profile.isAuth) {
							await fb
								.database()
								.ref('users/' + uid)
								.set({
									profile: state.profile.profile,
									lastUpdate: new Date().getTime(),
								});
						}
					}
				} else {
					return undefined;
				}
			});
		}
	} catch (err) {
		return undefined;
	}
};

export default saveState;
