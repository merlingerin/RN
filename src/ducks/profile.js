const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

const initialState = {
	name: '',
	email: '',
	image: '',
};

const profile = (state = initialState || {}, action) => {
	return state;
};

export default profile;
