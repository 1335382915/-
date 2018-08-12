/**
 * Created by qinchuan on 2017/10/1.
 */
import * as action from '../action/homeAction';
import * as imgData from '../data/imgData';
export const requestEveryDayImg=(callback)=>{
    return (dispatch,getState)=>{
        return setTimeout(()=>{
            let laIndex=Math.floor(Math.random()*10);
            let qcIndex=Math.floor(Math.random()*10);
            let laImg=imgData.homeSwiperLA[laIndex];
            let qcImg=imgData.homeSwiperQC[qcIndex];
            dispatch(action.receiveEveryDayImg(laImg,qcImg));
            if(callback) callback();
        },0)
    }
};

export const requestLocalEveryDayImg=(imgList,callback)=>{
    return (dispatch,getState)=>{
        return setTimeout(()=>{
            dispatch(action.receiveEveryDayImg(imgList[0],imgList[1]));
            if(callback) callback();
        },0)
    }
}