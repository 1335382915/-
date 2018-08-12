/**
 * Created by qinchuan on 2017/10/1.
 */
import * as types from './actionType';
export const receiveEveryDayImg=(laImg,qcImg)=>({
    type:types.HOMEACTION.GET_EVERYDAY_IMG,
    laImg,
    qcImg
});