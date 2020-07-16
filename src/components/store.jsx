import {createStore,combineReducers} from 'redux';
import Reducer from './Reducer';

const reducers = combineReducers({
	ale: Reducer
})

const store = createStore(reducers);

export default store;
