import { combineReducers } from 'redux';
import profile from './profile';
import goals from './goals';
import categorys from './categorys';
import loader from './loader';
import filterGoals from './filterGoals';

const rootReducer = combineReducers({
	profile,
	goals,
	categorys,
	loader,
	filterGoals,
});

export default rootReducer;
