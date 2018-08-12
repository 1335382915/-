/**
 * Created by qinchuan on 2017/10/1.
 */
import * as action from '../action/rootAction';

export const setGlobalConfig=(globalConfig,callback)=>{
    //正式上线时将其设置为4000或5000，为了方便测试先为0
    return (dispatch,getState)=>{
        return setTimeout(()=>{
            dispatch(action.setGlobalConfig(globalConfig));
            if(callback) callback();
        },1000)
    }
}