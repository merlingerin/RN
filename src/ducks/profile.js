import { fb } from '../services/api';
import {
	FETCH_GOALS_REQUEST,
	FETCH_GOALS_SUCCESS,
	FETCH_GOALS_FAILURE,
	SAVE_NEW_GOAL,
	REMOVE_GOAL,
	TOGGLE_NOTIFICATION,
	ADD_ACTIVITY,
	REMOVE_ACTIVITY,
	UPDATE_ACTIVITY,
	CHANGE_GOAL_ACTIVE,
} from './goalsOffline';

const credential = {
	androidClientId:
		'554183303492-7770qnitnolm6lfb1qsvnhn1nbfutm3a.apps.googleusercontent.com',
	iosClientId:
		'554183303492-omjg2o28ma84h5o3t1ee2nb07sfp3cab.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
};

const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';
export const LOG_OUT = 'LOG_OUT';
const SET_PROFILE = 'SET_PROFILE';
const RESET_ERROR = 'RESET_ERROR';
const SET_LAST_DATA_UPDATE = 'profile/set_last_data_update';

const initialState = {
	isLoading: false,
	isAuth: false,
	profile: {},
	canceled: false,
	isError: false,
	error: null,
};

const profile = (state = initialState || {}, action) => {
	switch (action.type) {
		case SAVE_NEW_GOAL ||
			ADD_ACTIVITY ||
			REMOVE_ACTIVITY ||
			UPDATE_ACTIVITY ||
			REMOVE_GOAL ||
			CHANGE_GOAL_ACTIVE ||
			TOGGLE_NOTIFICATION:
			return {
				...state,
				lastLocalUpdate: new Date().getTime(),
			};
		case FETCH_PROFILE_REQUEST:
			return {
				...state,
				profile: {
					name: action.payload,
				},
				isLoading: true,
			};
		case FETCH_PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuth: true,
				profile: {
					...state.profile,
					...action.payload,
				},
			};
		case FETCH_PROFILE_FAILURE:
			return {
				...state,
				isLoading: false,
				isAuth: false,
				...action.payload,
			};
		case LOG_OUT:
			return {
				...state,
				isLoading: false,
				isAuth: false,
				profile: {},
			};
		case RESET_ERROR:
			return {
				...state,
				isError: false,
				error: null,
			};
		default:
			return state;
	}
};

// Action creators
// ============================================================

export const fetchProfileRequest = name => ({
	type: FETCH_PROFILE_REQUEST,
	payload: name,
});

const fetchProfileSuccess = response => ({
	type: FETCH_PROFILE_SUCCESS,
	payload: response,
});

const fetchProfileFailure = error => ({
	type: FETCH_PROFILE_FAILURE,
	payload: error,
});

export const logOut = () => ({
	type: LOG_OUT,
});

export const resetError = () => {
	return {
		type: RESET_ERROR,
	};
};

export const requestLogOut = () => async dispatch => {
	await fb
		.auth()
		.signOut()
		.then(function() {
			dispatch(logOut);
			dispatch({ type: 'RESET_GOALS' });
		})
		.catch(function(error) {
			// An error happened.
		});
};

export const checkIsAuth = profile => dispatch => {
	dispatch(fetchProfileSuccess(profile));
};

export const signIn = (email, password, name) => async dispatch => {
	await fb
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(res => {
			let profile = {
				userPhoto: null,
				name: name,
				email: email,
			};

			dispatch(fetchProfileSuccess(profile));
		})
		.catch(error => {
			console.log('Error', error);
			return dispatch(
				fetchProfileFailure({ error: error, isError: true }),
			);
		});
};

export const authWithEmail = (email, password) => async dispatch => {
	dispatch(fetchProfileRequest);
	fb.auth()
		.signInWithEmailAndPassword(email, password)
		.then(res => {
			let profile = {
				userPhoto: res.user.photoURL,
				name: res.user.displayName,
				email: res.user.email,
			};
			dispatch(fetchProfileSuccess(profile));
		})
		.catch(error => {
			console.log('Error', error);
			return dispatch(
				fetchProfileFailure({ error: error, isError: true }),
			);
		});
};

export const signInWithGoogle = () => async dispatch => {
	dispatch(fetchProfileRequest);
	try {
		const result = await Expo.Google.logInAsync(credential);
		console.log('re', result);
		if (result.type === 'success') {
			const credential = await fb.auth.GoogleAuthProvider.credential(
				result.idToken,
				result.accessToken,
			);

			fb.auth()
				.signInAndRetrieveDataWithCredential(credential)
				.then(res => {
					// user res, create your user, do whatever you want
				})
				.catch(error => {
					console.log('firebase cred err:', error);
				});

			return dispatch(fetchProfileSuccess(result.user));
		} else {
			console.log('error');
			return dispatch(
				fetchProfileFailure({ cancelled: true, isError: true }),
			);
		}
	} catch (e) {
		console.log('error 1', e);

		return dispatch(fetchProfileFailure({ error: e, isError: true }));
	}
};

export default profile;
