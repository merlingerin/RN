import { db } from '../api';

export const createUser = async (userId, data) => {
	await db.ref('users/' + userId).set({
		profile: data.profile,
		goals: data.goals,
	});
};
