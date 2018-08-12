/**
 * Created by qinchuan on 2017/10/1.
 */
import * as types from '../action/actionType';
const initState={
    globalConfig:{
        themeColor:'#68b1ed',
        nightMode:false,
        openPassword:false,
        autoUpdateImg:true
    }
}
export default rootReducer=(state=initState,action)=>{
    switch(action.type){
        case 'SET_GLOBAL_CONFIG':{
            return Object.assign({},state,{
                globalConfig:action.globalConfig
            })
        }
        default: return state;
    }
}