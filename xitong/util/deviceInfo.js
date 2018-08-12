/**
 * Created by qinchuan on 2017/10/1.
 */
import React,{Component} from 'react';
import {Dimensions} from 'react-native';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
export default DeviceInfo={
    screenWidth,
    screenHeight
}