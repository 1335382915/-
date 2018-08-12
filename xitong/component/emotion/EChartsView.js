/**
 * Created by qinchuan on 2017/11/22.
 */
import React,{Component} from 'react';
import {
    View,Text
} from 'react-native';
import Echarts from 'native-echarts';
import DeviceInfo from '../../util/deviceInfo';
export default class EChartsView extends Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps,nextState){
        if(JSON.stringify(nextProps.option) == JSON.stringify(this.props.option)){
            return false;
        }
        return true;
    }
    render(){
        return (
            <View style={{marginHorizontal:-15,height:250,width:DeviceInfo.screenWidth}}>
                <Echarts option={this.props.option} height={250} style={{backgroundColor:'white'}}/>
            </View>
        )
    }
}