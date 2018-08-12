/**
 * Created by qinchuan on 2017/11/18.
 */
import * as action from '../action/emotionAction';
import $ from 'jquery-ajax';
const exchangeParmaster=(data)=> {

    var newParmaster="";
    var findIndex=0;
    for(var key in data){
        if(findIndex==0)
        {
            newParmaster+=key+"="+data[key];
        }else{
            newParmaster+="&"+key+"="+data[key];
        }
        findIndex++;
    }
    return newParmaster
}
export const requestWeatherInfo=(key,value,callback)=>{
    return (dispatch,getState)=>{

        return fetch(`https://free-api.heweather.com/s6/weather/now?${key}=${value}&key=65ad7b5d9b934958b451f585aa83a505`,{
            'method': 'GET',
        }).then((response) => response.text())
            .then((responseJSON) => {
                dispatch(action.getWeatherInfo(JSON.parse(responseJSON)));
                if(callback) callback();
            })
            .catch((err) => {


            }).done();
    }
};
export const requestAirInfo=(key,value,callback)=>{
    return (dispatch,getState)=>{
        return fetch(`https://free-api.heweather.com/s6/air/now?${key}=${value}&key=65ad7b5d9b934958b451f585aa83a505`,{
            'method': 'GET',
        }).then((response) => response.text())
            .then((responseJSON) => {
                dispatch(action.getAirInfo(JSON.parse(responseJSON)));
                if(callback) callback();
            })
            .catch((err) => {


            }).done();
    }
};

export const requestAllWeatherInfo=(key,value,callback)=>{
    return (dispatch,getState)=>{
        return fetch(`https://free-api.heweather.com/s6/weather?${key}=${value}&key=65ad7b5d9b934958b451f585aa83a505`,{
            'method': 'GET',
        }).then((response) => response.text())
            .then((responseJSON) => {
                dispatch(action.getAllWeatherInfo(JSON.parse(responseJSON)));
                if(callback) callback();
            })
            .catch((err) => {


            }).done();
    }
}