/**
 * Created by qinchuan on 2017/10/1.
 */
import * as action from '../action/testAction';
export const testFunc=(name,callback)=>{
    return (dispatch,getState)=>{
        return setTimeout(()=>{
            dispatch(action.testAction(name));
            if(callback) callback();
        })
    }
};