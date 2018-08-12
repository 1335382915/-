/**
 * Created by qinchuan on 2017/10/1.
 */
import * as types from '../action/actionType';
const initState={
    name:''
}
export default testReducer=(state=initState,action)=>{
    switch(action.type){
        case types.TESTACTION:{
            return Object.assign({},state,{
                name:action.name
            })
        }
        default: return state;
    }
}