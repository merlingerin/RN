const SET_SELECTED_FILTER = 'SET_SELECTED_FILTER';
const SET_OPENED_CATEGORY = 'SET_OPENED_CATEGORY';

const initialState = {
	selectedFilter: 0,
	openedCategory: 0,
};

const filterGoals = (state = initialState || {}, { type, payload }) => {
	if (type === SET_SELECTED_FILTER) {
		return {
			...state,
			selectedFilter: payload,
		};
	}
	if (type === SET_OPENED_CATEGORY) {
		return {
			...state,
			openedCategory: payload,
		};
	}
	return state;
};

export const setSelectedFilter = index => ({
	type: SET_SELECTED_FILTER,
	payload: index,
});

export const setOpenedCategory = index => ({
	type: SET_OPENED_CATEGORY,
	payload: index,
});

export default filterGoals;
