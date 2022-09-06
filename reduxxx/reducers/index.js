import{combineReducers } from 'redux';
import info from './infoReducer';
import actionForReducer from './infoReducer';
const reducers = combineReducers({

personalInfo: actionForReducer

});

export default (state,action)=> reducers(state,action);