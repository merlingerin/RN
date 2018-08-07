const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const initialState = {
	isShown: false,
};

const loader = (state = initialState || {}, { type, payload }) => {
	switch (type) {
		case SHOW_LOADER:
			return {
				...state,
				isShown: true,
			};
		case HIDE_LOADER:
			return {
				...state,
				isShown: false,
			};
		default:
			return state;
	}
};

export const showLoader = () => ({
	type: SHOW_LOADER,
});

export const hideLoader = () => ({
	type: HIDE_LOADER,
});

export default loader;
