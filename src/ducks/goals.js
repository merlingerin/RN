import { goals as goalsData } from '../services/goals';
import { LOG_OUT } from './profile';

const FETCH_GOALS_REQUEST = 'FETCH_GOALS_REQUEST';
const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS';
const FETCH_GOALS_FAILURE = 'FETCH_GOALS_FAILURE';
const ADD_NEW_GOAL = 'ADD_NEW_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const RESET_GOALS = 'RESET_GOALS';
const GOAL_TOGGLE_NOTIFICATION = 'GOAL_TOGGLE_NOTIFICATION';

const initialState = {
	...goalsData,
};

const goals = (state = initialState || {}, action) => {
	switch (action.type) {
		case FETCH_GOALS_SUCCESS:
			return {
				...state,
				...action.payload,
			};
		case ADD_NEW_GOAL:
			return {
				...state,
				[action.payload.id]: action.payload,
			};
		case LOG_OUT:
			return {
				...goalsData,
			};
		case REMOVE_GOAL:
			return {
				...action.payload,
			};
		case RESET_GOALS:
			return goalsData;
		case GOAL_TOGGLE_NOTIFICATION:
			const { goalId, activityRepeat } = action.payload;
			console.log('goalId', goalId);
			console.log('activityRepeat', activityRepeat);
			// return {
			// 	...state,
			// 	[goalId]: {
			// 		...state[goalId],
			// 		activityRepeat,
			// 	},
			// };
			return state;
		default:
			return state;
	}
};

export const addNewGoal = goal => {
	return {
		type: ADD_NEW_GOAL,
		payload: goal,
	};
};

export const fetchGoalsSuccess = goals => ({
	type: FETCH_GOALS_SUCCESS,
	payload: goals,
});

export const removeGoal = goals => ({
	type: REMOVE_GOAL,
	payload: goals,
});

export const goalToggleNotification = (goalId, uid, activityRepeat) => ({
	type: GOAL_TOGGLE_NOTIFICATION,
	payload: { goalId, activityRepeat },
});

export default goals;
