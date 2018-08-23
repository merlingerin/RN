import { applyMiddleware, compose, createStore } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import { firebase as fbConfig, reduxFirebase as reduxConfig } from '../config';
import makeRootReducer from './reducers';

export default (initialState = {}, history) => {
	// ======================================================
	// Middleware Configuration
	// ======================================================
	const middleware = [];

	// ======================================================
	// Store Enhancers
	// ======================================================
	const enhancers = [];
	if (__DEV__) {
		const devToolsExtension = window.devToolsExtension;
		if (typeof devToolsExtension === 'function') {
			enhancers.push(devToolsExtension());
		}
	}

	// ======================================================
	// Store Instantiation
	// ======================================================
	const store = createStore(
		makeRootReducer(),
		initialState,
		compose(
			applyMiddleware(...middleware),
			reactReduxFirebase(fbConfig, reduxConfig),
			autoRehydrate(),
			...enhancers,
		),
	);

	// To unsubscribe, invoke `store.unsubscribeHistory()` anytime

	// begin periodically persisting the store with a transform for the immutable state
	persistStore(store, {
		transforms: [immutableTransform()],
	});

	return store;
};
