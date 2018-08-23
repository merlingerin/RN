import { combineReducers } from 'redux';
import profile from './profile';
import goals from './goals';
import categorys from './categorys';
import loader from './loader';
import filterGoals from './filterGoals';
import goalsOffline from './goalsOffline';

const rootReducer = combineReducers({
	profile,
	// goals,
	categorys,
	loader,
	filterGoals,
	goalsOffline,
});

export default rootReducer;
