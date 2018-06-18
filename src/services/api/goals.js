import { db, fb } from '../api';
import _ from 'lodash';

export const subscribeToGoals = async (userId, fetchGoals) => {
	db.ref(`users/${userId}/goals`).on('value', snapshot => {
		const goals = snapshot.val();
		if (fetchGoals) {
			fetchGoals(goals);
		}
		console.log('New goals from firebase: ' + goals);
	});
};

export const saveNewGoal = async goals => {
	var userId = await fb.auth().currentUser.uid;

	db.ref(`users/${userId}/goals`).set({
		...goals,
	});
};
