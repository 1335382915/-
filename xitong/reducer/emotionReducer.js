/**
 * Created by qinchuan on 2017/10/1.
 */
import * as types from '../action/actionType';
const initState={
    nowWeather:{},
    nextWeather:{},
    airInfo:{},
    allWeatherInfo:{},
    weatherInfoList:[]
}
export default emotionReducer=(state=initState,action)=>{
    switch(action.type){
        case types.EMOTIONACTION.GET_WEATHER_INFO:{
            let _weatherInfoList=JSON.parse(JSON.stringify(state.weatherInfoList));
            _weatherInfoList.push(action.weatherInfo);
            return Object.assign({},state,{
                weatherInfoList:_weatherInfoList
            })
        }
        case types.EMOTIONACTION.GET_AIR_INFO:{
            return Object.assign({},state,{
                airInfo:action.airInfo
            })
        }
        case types.EMOTIONACTION.GET_ALL_WEATHER_INFO:{
            return Object.assign({},state,{
                allWeatherInfo:action.allWeatherInfo
            })
        }
        default: return state;
    }
}