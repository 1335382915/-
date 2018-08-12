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
    StyleSheet,
    ListView,
    ImageBackground
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ourServer from '../../../server/ourServer';
import Icon from 'react-native-vector-icons/Ionicons';
import * as config from '../../../util/config';
import DeviceInfo from '../../../util/deviceInfo';
import NavigationBar from '../../public/navigationBar';
import { SwipeListView } from 'react-native-swipe-list-view';
import {memoryDayData} from '../../../data/memoryDayData';
let panelUrl=config.imgBashPath+'panelImg.jpg';
class MemoryDay extends Component{
    constructor(props){
        super(props);
        let ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            data:ds,
            panelData:{}
        }
    }
    componentWillMount(){
        let panelData=memoryDayData[1].daysLeft>memoryDayData[2].daysLeft?memoryDayData[2]:memoryDayData[1];
        this.setState({
            data:this.state.data.cloneWithRows(memoryDayData),
            panelData
        })
    }
    goToDetail(index){
        const {navigate} = this.props.navigation;
        let params={
            ...memoryDayData[index]
        }
        navigate('MemoryDayDetail',params);
    }
    render(){
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        return (
            <View style={{flex:1,backgroundColor:'#eeeeee'}}>
                <NavigationBar title='我们的纪念日' leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>
                <ImageBackground source={{uri:panelUrl}} resizeMode={'contain'} style={styles.panel}>
                    <View style={styles.panelLeft}>
                        <Text style={{fontSize:16,color:'#333333'}}>{this.state.panelData.name}</Text>
                        <Text>目标日: {this.state.panelData.goalDay}</Text>
                    </View>
                    <View style={styles.panelRight}>
                        <Text style={{fontSize:45,color:'#333333',fontWeight:'bold'}}>{this.state.panelData.daysLeft}</Text>
                        <Text style={{color:'#333333'}}> 天</Text>
                    </View>
                </ImageBackground>
                <SwipeListView
                    dataSource={this.state.data}
                    renderRow={ (data,secId,rowId) => (
                        <TouchableOpacity activeOpacity={1} onPress={()=>this.goToDetail(rowId)} style={styles.listContainer}>
                            <View style={[styles.title,{backgroundColor:(rowId==1 || rowId==2)?(rowId==1?'#68b1ed':'#ff3737'):this.props.globalConfig.themeColor}]}>
                                <Text style={{fontSize:18,color:'white'}}>{data.day.split('-')[2]}</Text>
                                <Text style={{fontSize:11,color:'white'}}>{data.day.split('-')[0]=='*'?'1994':data.day.split('-')[0]} {data.day.split('-')[1]}</Text>
                            </View>
                            <View style={styles.daysContainer}>
                                <Text style={{fontSize:15,color:'#333333'}}>距离{data.name}{data.type==1 || data.type==2 ?'还有':'已经'}</Text>
                                <Text style={{fontSize:15,color:'#333333'}}>
                                    <Text style={{fontSize:18,fontWeight:'bold'}}>{data.daysLeft} </Text>
                                    <Text>天</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    renderHiddenRow={ data => (
                        <TouchableOpacity style={styles.rowBack} onPress={()=>/*RCTDeviceEventEmitter.emit('refresh')*/this.forceUpdate()}>
                            <View style={styles.opeBtn}>
                                <Text style={{fontSize:16,color:'white'}}>置顶</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    disableRightSwipe
                    disableLeftSwipe
                    friction={10}
                    tension={100}
                    rightOpenValue={-75}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    rowBack: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        height:50
    },
    opeBtn:{
        width:75,
        height:50,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    listContainer:{
        width:DeviceInfo.screenWidth,
        height:50,
        backgroundColor:'white',
        borderColor:'#d6d6d6',
        borderBottomWidth:1,
        flexDirection:'row'
    },
    daysContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
        alignItems:'center',
        paddingHorizontal:15
    },
    title:{
        height:49,
        width:50,
        justifyContent:'center',
        alignItems:'center'
    },
    panel:{
        width:DeviceInfo.screenWidth,
        borderColor:'#d6d6d6',
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
        backgroundColor:'white',
        paddingVertical:25,
        marginBottom:10
    },
    panelLeft:{

    },
    panelRight:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(ourServer,dispatch)
})
const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig,
})

export default connect(mapStateToProps,mapDispatchToProps)(MemoryDay)