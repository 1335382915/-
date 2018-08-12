/**
 * Created by qinchuan on 2017/10/1.
 */
import * as types from './actionType';
export const testAction=(name)=>({
    type:types.TESTACTION,
    name
})