import { db, fb } from '../api';
import _ from 'lodash';
import moment from 'moment';

export const subscribeToGoals = async (userId, fetchGoals) => {
	db.ref(`users/${userId}/goals`).on('value', snapshot => {
		const goals = snapshot.val();
		if (fetchGoals) {
			fetchGoals(goals);
		}
	});
};

export const saveNewGoal = async goals => {
	var userId = await fb.auth().currentUser.uid;

	return db.ref(`users/${userId}/goals/`).set({
		...goals,
	});
};

export const toggleNotification = async (goalId, uid, activityRepeat) => {
	return fb
		.database()
		.ref(
			`users/${
				uid ? uid : fb.auth().currentUser.uid
			}/goals/${goalId}/activityRepeat`,
		)
		.update(activityRepeat);
};

export const addActivity = async (id, goal, uid) => {
	const activity = {
		[id]: {
			id: id,
			date: moment().format(),
			createdDate: moment().format(),
		},
	};

	return fb
		.database()
		.ref(`users/${uid ? uid : fb.auth().currentUser.uid}/goals/${goal.id}`)
		.set({
			...goal,
			physicalActivity: {
				...goal.physicalActivity,
				...activity,
			},
		});
};

export const removeActivity = async (id, goal, uid) => {
	return fb
		.database()
		.ref(`users/${uid ? uid : fb.auth().currentUser.uid}/goals/${goal.id}`)
		.set({
			...goal,
			physicalActivity: _.omit(goal.physicalActivity, [id]),
		});
};

export const updatePhisicalActivity = async (id, goal, uid, date) => {
	return fb
		.database()
		.ref(
			`users/${uid ? uid : fb.auth().currentUser.uid}/goals/${
				goal.id
			}/physicalActivity/${id}`,
		)
		.set({
			...goal.physicalActivity[id],
			id: id,
			date: moment(date, 'DD-MM-YYYY HH:mm').format(),
		});
};
