/**
 * Created by qinchuan on 2017/11/9.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import DeviceInfo from '../../../util/deviceInfo';
import * as config from '../../../util/config';
import Icon from 'react-native-vector-icons/Ionicons';
export default class MemoryDayDetail extends Component{
    render(){
        let imgPath=this.props.navigation.state.params.imgPath;
        let day=this.props.navigation.state.params.day;
        let name=this.props.navigation.state.params.name;
        let type=this.props.navigation.state.params.type;
        let daysLeft=this.props.navigation.state.params.daysLeft;
        let goalDay=this.props.navigation.state.params.goalDay;
        return (
            <View style={{flex:1}}>
                <ImageBackground style={{flex:1}} source={{uri:imgPath}}>
                    <View style={styles.navigator}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='ios-arrow-back' size={25} color='white'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:-50}}>
                        <Text style={{fontSize:20,color:'white'}}>{name}{type==1||type==2?'还有':'已经'}</Text>
                        <Text style={{fontSize:60,color:'white',marginBottom:5,marginTop:10}}>
                            <Text style={{fontWeight:'bold'}}>{daysLeft}</Text>
                            <Text style={{fontSize:16}}> 天</Text>
                        </Text>
                        <Text style={{fontSize:16,color:'white'}}>目标日：{type==1||type==2?goalDay:day}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    navigator:{
        width:DeviceInfo.screenWidth,
        height:50,
        paddingHorizontal:15,
        justifyContent:'center'
    }
})