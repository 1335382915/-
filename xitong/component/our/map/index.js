/**
 * Created by qinchuan on 2017/11/7.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
    StyleSheet,
    WebView,
    ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ourServer from '../../../server/ourServer';
import Icon from 'react-native-vector-icons/Ionicons';
import * as config from '../../../util/config';
import DeviceInfo from '../../../util/deviceInfo';
import NavigationBar from '../../public/navigationBar';


class Map extends Component{
    constructor(props){
        super(props);

    }
    render(){
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        return (
            <View style={{flex:1,backgroundColor:'#eeeeee'}}>
                <NavigationBar title='我们的足迹' leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>

                    <WebView
                        style={{width:DeviceInfo.screenWidth}}
                        source={{uri:'http://qinchuan.applinzi.com/map.html'}}
                        javaScriptEnabled
                        domStorageEnabled
                        scalesPageToFit
                        renderLoading={()=><View style={{flex: 1, justifyContent:'center', alignItems:'center'}}><ActivityIndicator color={this.props.globalConfig.themeColor} size="large"/></View>}
                        startInLoadingState
                    />

            </View>
        )
    }
}

const styles=StyleSheet.create({

})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(ourServer,dispatch)
})
const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig,
})

export default connect(mapStateToProps,mapDispatchToProps)(Map)