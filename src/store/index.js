import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../ducks';

const middleware = [thunk];
const enhancer = composeWithDevTools(
	applyMiddleware(...middleware),
	// other store enhancers if any
);

const store = createStore(rootReducer, enhancer);

export default store;
