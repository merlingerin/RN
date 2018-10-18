import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from '../ducks';
const middlewares = [ReduxThunk];

// if (process.env.NODE_ENV === 'development') {
// 	middlewares.push(logger);
// }

const persistConfig = {
	key: 'root2',
	storage,
	whitelist: ['profile', 'goalsOffline'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const withDevTools = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares);
export default () => {
	const store = createStore(
		persistedReducer,
		// rootReducer,
		withDevTools,
	);
	const persistor = persistStore(store);
	// persistor.purge();
	return { store, persistor };
};
