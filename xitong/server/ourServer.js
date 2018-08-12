/**
 * Created by qinchuan on 2017/10/1.
 */
import * as action from '../action/ourAction';

export const changeMusicState=(musicState,callback)=>{
    return (dispatch,getState)=>{
        return setTimeout(()=>{
            dispatch(action.receiveMusicState(musicState));
            if(callback) callback();
        },0)
    }
}

export const changeMusicConfig=(musicConfig,callback)=>{
    return (dispatch,getState)=>{
        return setTimeout(()=>{
            dispatch(action.receiveMusicConfig(musicConfig));
            if(callback) callback();
        },0)
    }
}