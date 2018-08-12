/**
 * Created by qinchuan on 2017/11/7.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    Modal,
    TouchableOpacity,
    FlatList,
    CameraRoll,
    Image,
    ActivityIndicator,
    ToastAndroid,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ourServer from '../../../server/ourServer';
import Icon from 'react-native-vector-icons/Ionicons';
import * as config from '../../../util/config';
import DeviceInfo from '../../../util/deviceInfo';
import {colorReverse, dateDiff} from '../../../util/publicFunc';
import NavigationBar from '../../public/navigationBar';
import {timeLineData} from '../../../data/timeLineData';
import FastImage from 'react-native-fast-image';
import Timeline from 'react-native-timeline-listview'

let currentDate=new Date();
const formatDate=(date)=>{
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
}

class TimeLine extends Component{
    constructor(props){
        super(props);
        this.renderEvent=this.renderEvent.bind(this);
        this.data=timeLineData;
        this.startDate='2010-10-19';
        this.currentDate=formatDate(new Date());
        this.state={
            days:0
        }
    }

    renderEvent(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>
        var desc = null
        if(rowData.description)
            desc = (
                <View style={styles.descriptionContainer}>
                    {
                        rowData.imageUrl?<Image source={{uri: rowData.imageUrl}} style={styles.image}/>:null
                    }
                    <Text style={[styles.textDescription]} numberOfLines={10}>{rowData.description}</Text>
                </View>
            )

        return (
            <View style={{flex:1,backgroundColor:'#68b1ed',padding:10,borderRadius:10}}>
                {title}
                {desc}
            </View>
        )
    }
    componentWillMount(){
        let days=dateDiff(this.startDate,this.currentDate);
        this.setState({
            days:days
        })
    }
    render(){
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        let timeLineImg=(
            <View style={{marginBottom:20}}>
                <FastImage
                    source={{uri:'http://ox6gixp8f.bkt.clouddn.com/timeLine1.jpg'}}
                    style={{width:DeviceInfo.screenWidth,height:DeviceInfo.screenWidth/638*300}}
                   // resizeMode={FastImage.resizeMode.contain}
                />
                <View style={styles.timeLineImg}>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <Image
                            source={{uri:config.imgBashPath+this.props.qcImg.path}}
                            style={styles.radiusImg}
                        />
                        <Image
                            source={{uri:config.imgBashPath+this.props.laImg.path}}
                            style={[styles.radiusImg,{marginLeft:15}]}
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={styles.timeLineText}>我们在一起</Text>
                        <Text style={styles.timeLineText}>
                            <Text style={{fontSize:20}}>{this.state.days} </Text>
                            <Text>天</Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
        return (
            <View style={{flex:1}}>
                <NavigationBar title='我们的时光' leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>
                    <Timeline
                        circleSize={20}
                        data={this.data}
                        circleColor='rgb(45,156,219)'
                        lineColor='rgb(45,156,219)'
                        innerCircle="dot"
                        timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                        rowContainerStyle={{paddingHorizontal:15}}
                        renderDetail={this.renderEvent}
                        options={{
                            showsVerticalScrollIndicator:false,
                            renderHeader:()=>timeLineImg
                        }}
                    />

            </View>
        )
    }
}

const styles=StyleSheet.create({

    title:{
        fontSize:16,
        fontWeight: 'bold'
    },
    descriptionContainer:{
        marginTop:8,
        flexDirection: 'row',
        paddingRight: 0,
    },
    image:{
        width: 50,
        height: 50,
        borderRadius: 50
    },
    textDescription: {
        marginLeft: 10,
        flex:1,
        color: 'white',
        fontSize:15
    },
    timeLineImg:{
        position:'absolute',
        bottom:0,
        left:0,
        width:DeviceInfo.screenWidth,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:15,
        paddingBottom:10
    },
    radiusImg:{
        width:45,
        height:45,
        borderRadius:45
    },
    timeLineText:{
        textAlign:'right',
        color:'white',
        fontSize:12,
        fontWeight:'bold'
    }
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(ourServer,dispatch)
})
const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig,
    qcImg:state.homeReducer.qcImg,
    laImg:state.homeReducer.laImg
})

export default connect(mapStateToProps,mapDispatchToProps)(TimeLine)