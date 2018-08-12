/**
 * Created by qinchuan on 2017/10/1.
 */
import * as types from './actionType';
export const receiveMusicState=(musicState)=>({
    type:types.OURACTION.SET_MUSIC_STATE,
    musicState
});

export const receiveMusicConfig=(musicConfig)=>({
    type:types.OURACTION.SET_MUSIC_CONFIG,
    musicConfig
})