import { fb } from '../services/api';
import { Platform } from 'react-native';
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
import uuidv4 from 'uuid/v4';

const credential = {
	androidClientId: '554183303492-7770qnitnolm6lfb1qsvnhn1nbfutm3a.apps.googleusercontent.com',
	iosClientId: '554183303492-omjg2o28ma84h5o3t1ee2nb07sfp3cab.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
};

const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';
export const LOG_OUT = 'LOG_OUT';
const CREATE_NEW_USER = 'CREATE_NEW_USER';
const RESET_ERROR = 'RESET_ERROR';
const SET_LAST_DATA_UPDATE = 'profile/set_last_data_update';
const CREATE_SESSION = 'CREATE_SESSION';
const REMOVE_SESSION = 'REMOVE_SESSION';
const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';
const SYNC_PROFILE_WITH_FIREBASE = 'SYNC_PROFILE_WITH_FIREBASE';

const initialState = {
	isLoading: false,
	isAuth: false,
	profile: {},
	session: null,
	canceled: false,
	isError: false,
	error: null,
	lastLocalUpdate: 1,
};

const profile = (state = initialState || {}, action) => {
	switch (action.type) {
		case UPDATE_PROFILE_DATA:
			return {
				...state,
				lastLocalUpdate: new Date().getTime(),
				profile: { ...action.payload },
			};
		case FETCH_PROFILE_REQUEST:
			return {
				...state,
				profile: action.payload,
				isLoading: true,
			};
		case CREATE_NEW_USER:
			return {
				...state,
				isLoading: false,
				profile: action.payload,
				lastLocalUpdate: new Date().getTime(),
			};
		case SYNC_PROFILE_WITH_FIREBASE:
			return {
				...state,
				profile: {
					...state.profile,
					...action.payload,
				},
			};
		case FETCH_PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuth: true,
				profile: {
					...state.profile,
					...action.payload.profile,
				},
				session: action.payload.session ? action.payload.session : state.session,
			};

		case FETCH_PROFILE_FAILURE:
			return {
				...state,
				isLoading: false,
				isAuth: false,
				...action.payload,
			};

		case LOG_OUT:
			return initialState;
		case RESET_ERROR:
			return {
				...state,
				isError: false,
				error: null,
			};
		case CREATE_SESSION:
			return {
				...state,
				session: action.payload,
			};

		case REMOVE_SESSION:
			return initialState;
		case 'LOG_IN_LOADING':
			return {
				...state,
				isLoading: true,
			};
		case SAVE_NEW_GOAL:
		case ADD_ACTIVITY:
		case REMOVE_ACTIVITY:
		case UPDATE_ACTIVITY:
		case REMOVE_GOAL:
		case CHANGE_GOAL_ACTIVE:
		case TOGGLE_NOTIFICATION:
		case UPDATE_PROFILE_DATA:
		case CREATE_NEW_USER:
			return {
				...state,
				lastLocalUpdate: new Date().getTime(),
			};
		default:
			return state;
	}
};

// Action creators
// ============================================================
export const createNewUser = profile => ({
	type: CREATE_NEW_USER,
	payload: profile,
});

export const createSession = session => ({
	type: CREATE_SESSION,
	payload: session,
});

export const removeSession = session => ({
	type: REMOVE_SESSION,
});

export const fetchProfileRequest = profile => ({
	type: FETCH_PROFILE_REQUEST,
	payload: profile,
});

export const fetchProfileSuccess = (profile, session) => ({
	type: FETCH_PROFILE_SUCCESS,
	payload: { profile, session },
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

export const syncFirebaseWithProfile = profileData => {
	return {
		type: SYNC_PROFILE_WITH_FIREBASE,
		payload: profileData,
	};
};

export const updateProfileData = profile => ({
	type: UPDATE_PROFILE_DATA,
	payload: profile,
});

export const requestLogOut = () => async dispatch => {
	await fb
		.database()
		.ref(`sessions/${fb.auth().currentUser.uid}`)
		.set(null);

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

export const checkIsAuth = (profile, pushToken = null) => async (dispatch, getState) => {
	// let session = null;
	// if (store().profile.session) {
	// 	return dispatch(fetchProfileSuccess(profile, sessionData));
	// }
	// const sessionId = uuidv4();

	// sessionData = {
	// 	// sessionId: sessionId,
	// 	platform: Platform.OS === 'ios' ? 'ios' : 'android',
	// 	pushToken: pushToken,
	// };
	const sessionId = pushToken && pushToken;

	if (!getState().profile.isAuth || !getState().profile.session) {
		session = {
			sessionId: sessionId && sessionId.slice(sessionId.search(/\[.+\]/) + 1, sessionId.length - 1),
			platform: Platform.OS === 'ios' ? 'ios' : 'android',
			pushToken: pushToken,
		};
		await fb
			.database()
			.ref(`sessions/${profile.uid}/${session.sessionId}`)
			.set(session);

		dispatch(createSession(session));
	}
	dispatch(fetchProfileSuccess(profile));
};

export const signIn = (email, password, name) => async dispatch => {
	let profile = {
		userPhoto: '',
		name: name,
		email: email,
	};

	dispatch(createNewUser(profile));
	try {
		await fb.auth().createUserWithEmailAndPassword(email, password);

		// dispatch(createNewUser(profile));
	} catch (error) {
		console.log('Error', error);
		return dispatch(fetchProfileFailure({ error: error, isError: true }));
	}
};

export const authWithEmail = (email, password) => async dispatch => {
	// dispatch(fetchProfileRequest({}));
	await fb
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(res => {
			// fb.database()
			// 	.ref(`users/${res.user.uid}/profile`)
			// 	.once('value')
			// 	.then(snap => {
			// 		const value = snap.val();
			// 		console.log('value', value);
			// 		let profile = {
			// 			photoURL: value.photoURL || '',
			// 			name: value.name || '',
			// 			email: value.email || '',
			// 			uid: res.user.uid,
			// 		};
			// 		dispatch(fetchProfileSuccess(profile));
			// 		// if (value && value.profile && value.profile.name) {
			// 		// 	// profile.name = value.profile.name;
			// 		// 	// profile.customPhoto = value.profile.customPhoto;
			// 		// }
			// 	});
			// let profile = {
			// 	userPhoto: res.user.photoURL,
			// 	name: res.user.displayName,
			// 	email: res.user.email,
			// };
			// dispatch(fetchProfileSuccess(profile));
		})
		.catch(error => {
			console.log('Error', error);
			return dispatch(fetchProfileFailure({ error: error, isError: true }));
		});
};

export const signInWithGoogle = () => async dispatch => {
	dispatch(fetchProfileRequest);
	try {
		const result = await Expo.Google.logInAsync(credential);

		if (result.type === 'success') {
			const credential = await fb.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);

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
			return dispatch(fetchProfileFailure({ cancelled: true, isError: true }));
		}
	} catch (e) {
		console.log('error 1', e);

		return dispatch(fetchProfileFailure({ error: e, isError: true }));
	}
};

export default profile;
