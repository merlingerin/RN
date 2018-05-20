import { combineReducers } from 'redux';
import profile from './profile';
import goals from './goals';
import categorys from './categorys';

const rootReducer = combineReducers({
	profile,
	goals,
	categorys
});

export default rootReducer;
