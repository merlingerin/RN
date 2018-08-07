import { goals as goalsData } from '../services/goals';
import { LOG_OUT } from './profile';

const FETCH_GOALS_REQUEST = 'FETCH_GOALS_REQUEST';
const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS';
const FETCH_GOALS_FAILURE = 'FETCH_GOALS_FAILURE';
const ADD_NEW_GOAL = 'ADD_NEW_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

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
		default:
			break;
	}
	return state;
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

export default goals;
