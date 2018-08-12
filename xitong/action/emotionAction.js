/**
 * Created by qinchuan on 2017/10/1.
 */
import * as types from './actionType';
export const getWeatherInfo=(weatherInfo)=>({
    type:types.EMOTIONACTION.GET_WEATHER_INFO,
    weatherInfo
});

export const getAirInfo=(airInfo)=>({
    type:types.EMOTIONACTION.GET_AIR_INFO,
    airInfo
})

export const getAllWeatherInfo=(allWeatherInfo)=>({
    type:types.EMOTIONACTION.GET_ALL_WEATHER_INFO,
    allWeatherInfo
})