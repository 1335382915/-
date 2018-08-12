/**
 * Created by qinchuan on 2017/10/1.
 */
import * as types from '../action/actionType';
const initState={
    laImg:null,
    qcImg:null
}
export default homeReducer=(state=initState,action)=>{
    switch(action.type){
        case types.HOMEACTION.GET_EVERYDAY_IMG:{
            return Object.assign({},state,{
                laImg:action.laImg,
                qcImg:action.qcImg
            })
        }
        default: return state;
    }
}