import Expo from 'expo';
import { fb } from '../services/api';

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

// Action creators
// ============================================================

const fetchProfileRequest = {
	type: FETCH_PROFILE_REQUEST,
};

const fetchProfileSuccess = response => ({
	type: FETCH_PROFILE_SUCCESS,
	payload: response,
});

const fetchProfileFailure = error => ({
	type: FETCH_PROFILE_FAILURE,
	payload: error,
});

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
		case FETCH_PROFILE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuth: true,
				profile: action.payload,
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

export const logOut = () => ({
	type: LOG_OUT,
});

export const resetError = () => {
	console.log('reset');
	return {
		type: RESET_ERROR,
	};
};

export const requestLogOut = () => async dispatch => {
	fb.auth()
		.signOut()
		.then(function() {
			dispatch(logOut);
		})
		.catch(function(error) {
			// An error happened.
		});
};

export const checkIsAuth = profile => dispatch => {
	dispatch(fetchProfileSuccess(profile));
};

export const signIn = (email, password, name) => async dispatch => {
	dispatch(fetchProfileRequest);

	fb.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(res => {
			let profile = {
				userPhoto: null,
				name: name,
				email: email,
			};
			const user = fb.auth().currentUser;

			user.updateProfile({
				displayName: name,
			});
			console.log('profile ducks', profile);
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
	console.log('Start fetch');
	try {
		const result = await Expo.Google.logInAsync(credential);
		console.log('re', result);
		if (result.type === 'success') {
			const credential = await fb.auth.GoogleAuthProvider.credential(
				result.idToken,
				result.accessToken,
			);
			console.log('credential', credential);
			fb.auth()
				.signInAndRetrieveDataWithCredential(credential)
				.then(res => {
					console.log('res', res);
					// user res, create your user, do whatever you want
				})
				.catch(error => {
					console.log('firebase cred err:', error);
				});
			console.log('result.user', result.user);
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
