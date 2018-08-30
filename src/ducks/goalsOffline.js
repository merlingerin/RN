import _ from 'lodash';
import moment from 'lodash';

export const FETCH_GOALS_REQUEST = 'goals/fetch_request';
export const FETCH_GOALS_SUCCESS = 'goals/fetch_success';
export const FETCH_GOALS_FAILURE = 'goals/fetch_failure';
export const SAVE_NEW_GOAL = 'goals/save_new_goal';
export const REMOVE_GOAL = 'goals/remove_goal';
export const TOGGLE_NOTIFICATION = 'goals/toggle_notification';
export const ADD_ACTIVITY = 'goals/add_activity';
export const REMOVE_ACTIVITY = 'goals/remove_activity';
export const UPDATE_ACTIVITY = 'goals/update_activity';
export const CHANGE_GOAL_ACTIVE = 'goals/change_goal_active';

const initialState = {};

const goalsOffline = (state = initialState, { type, payload }) => {
	switch (type) {
		case FETCH_GOALS_REQUEST:
			return state;
		case FETCH_GOALS_SUCCESS:
			return {
				...state,
				...payload,
			};
		case SAVE_NEW_GOAL:
			return {
				...state,
				[payload.id]: payload,
			};
		case REMOVE_GOAL:
			return _.omit(state, [payload]);
		case TOGGLE_NOTIFICATION:
			const toggledGoal = _.merge({}, state[payload.goalId], {
				activityRepeat: {
					reminder: !state[payload.goalId].activityRepeat.reminder,
				},
			});
			return {
				...state,
				[payload.goalId]: toggledGoal,
			};
		case ADD_ACTIVITY:
			let changedGoal = _.assign({}, state[payload.goalId]);
			changedGoal.physicalActivity = {
				...changedGoal.physicalActivity,
				[payload.activity.id]: payload.activity,
			};

			return {
				...state,
				[payload.goalId]: changedGoal,
			};
		case REMOVE_ACTIVITY:
			let editedGoal = _.assign({}, state[payload.goalId]);
			_.unset(editedGoal, ['physicalActivity', payload.activityId]);
			return {
				...state,
				[payload.goalId]: editedGoal,
			};
		case CHANGE_GOAL_ACTIVE:
			let newGoal = _.assign({}, state[payload.goalId]);
			newGoal.active = payload.activeState;
			return {
				...state,
				[payload.goalId]: newGoal,
			};
		case 'LOG_OUT':
			return {};
		default:
			return state;
	}
};

export const fetchGoalsSuccess = goals => {
	return {
		type: FETCH_GOALS_SUCCESS,
		payload: goals,
	};
};

export const addActivity = (activityData, goalId) => ({
	type: ADD_ACTIVITY,
	payload: {
		activity: activityData,
		goalId: goalId,
	},
});

export const removeActivity = (activityId, goalId) => ({
	type: REMOVE_ACTIVITY,
	payload: {
		activityId,
		goalId,
	},
});

export const toggleNotification = (goalId, activityRepeat) => ({
	type: TOGGLE_NOTIFICATION,
	payload: {
		goalId: goalId,
		activityRepeat: activityRepeat,
	},
});

export const changeGoalActive = (activeState, goalId) => ({
	type: CHANGE_GOAL_ACTIVE,
	payload: {
		activeState,
		goalId,
	},
});

export const saveNewGoal = goal => ({
	type: SAVE_NEW_GOAL,
	payload: goal,
});

export const removeGoal = goalId => ({
	type: REMOVE_GOAL,
	payload: goalId,
});

export default goalsOffline;
