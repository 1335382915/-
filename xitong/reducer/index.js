/**
 * Created by qinchuan on 2017/10/1.
 */
import {combineReducers} from 'redux';
import testReducer from './testReducer';
import homeReducer from './homeReducer';
import rootReducer from './rootReducer';
import ourReducer from './ourReducer';
import emotionReducer from './emotionReducer';
export default combineReducers({
    testReducer,
    homeReducer,
    rootReducer,
    ourReducer,
    emotionReducer
})