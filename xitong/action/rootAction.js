/**
 * Created by qinchuan on 2017/10/1.
 */
import * as types from './actionType';
export const setGlobalConfig=(globalConfig)=>({
    type:types.ROOTACTION.SET_GLOBAL_CONFIG,
    globalConfig
});