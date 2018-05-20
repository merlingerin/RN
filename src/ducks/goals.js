import { goals as goalsData } from '../services/goals';

const FETCH_GOALS_REQUEST = 'FETCH_GOALS_REQUEST';
const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS';
const FETCH_GOALS_FAILURE = 'FETCH_GOALS_FAILURE';
const ADD_NEW_GOAL = 'ADD_NEW_GOAL';

const initialState = {
	...goalsData,
};

const goals = (state = initialState || {}, action) => {
	switch (action.type) {
		case ADD_NEW_GOAL:
			return {
				...state,
				[action.payload.id]: action.payload,
			};
		default:
			break;
	}
	return state;
};

export const addNewGoal = goal => {
	console.log('ADDED');
	return {
		type: ADD_NEW_GOAL,
		payload: goal,
	};
};

export default goals;
