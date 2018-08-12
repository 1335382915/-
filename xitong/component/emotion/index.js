/**
 * Created by qinchuan on 2017/10/1.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    Modal,
    RefreshControl,
    DrawerLayoutAndroid,
    ImageBackground
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as emotionServer from '../../server/emotionServer';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import Echarts from 'native-echarts';
import * as publicFunc from '../../util/publicFunc';
import * as config from '../../util/config';
import DeviceInfo from '../../util/deviceInfo';
import {cityData} from '../../data/cityData';
import EChartsView from './EChartsView';
class Emotion extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            modalShow:false,
            currentIndex:0,
            isRefreshing:false,
            drawerLockMode:'unlocked',
            currentListIndex:2,
            currentListKey:0,
            cityModalShow:false
        };
    }
    componentDidMount(){
        this.initData();
    }
    initData(){
        this.props.actions.requestWeatherInfo('location','CN101010400',()=>{
            this.props.actions.requestWeatherInfo('location','CN101010200',()=>{
                this.props.actions.requestWeatherInfo('location','JP1850147',()=>{
                    this.props.actions.requestAllWeatherInfo('location',cityData[this.state.currentListKey].child[this.state.currentListIndex].key,()=>{
                        // this.props.actions.requestAirInfo('location','beijing',()=>{
                        //
                        // })
                        this.setState({
                            isLoading:false,
                            isRefreshing:false
                        })
                    })
                })
            })
        })
    }
    renderDayWeather(params,index){
        let text='';
        switch(index){
            case 0:
                text='今天';
                break;
            case 1:
                text='明天';
                break;
            case 2:
                text='后天';
                break;
            default:
                break;
        }
        let dateText=<Text style={{fontSize:14,color:'white'}}>{params.date.split('-')[2]}日 </Text>;
        if(index<3){
            dateText=<Text style={{fontSize:14,color:'white'}}> {text}</Text>;
        }
        return(
            <View key={index} style={styles.dailyContainer}>
                <View style={styles.dailyLeft}>
                    {dateText}
                </View>
                <View style={styles.dailyCenter}>
                    <Text style={{fontSize:14,color:'white'}}>早</Text>
                    <Image source={{uri:'https://cdn.heweather.com/cond_icon/'+params.cond_code_d+'.png'}} style={styles.commonImg}/>
                    <Text> </Text>
                    <Text style={{fontSize:14,color:'white'}}> 晚</Text>
                    <Image source={{uri:'https://cdn.heweather.com/cond_icon/'+params.cond_code_n+'.png'}} style={styles.commonImg}/>
                </View>
                <View style={styles.dailyRight}>
                    <Text style={{fontSize:14,color:'white'}}>{params.tmp_min}℃~{params.tmp_max}℃</Text>
                </View>
            </View>
        )
    }
    renderActivity(params,index){
        let borderLeft=index==0?1:0;
        let borderTop=index<=3?1:0;
        return (
            <TouchableOpacity onPress={()=>this.openModal(index)} key={index} style={[styles.lifeStyle,{borderLeftWidth:borderLeft,borderTopWidth:borderTop}]}>
                <Text style={{fontSize:13,color:'white'}}>{publicFunc.lifeStyleTitle(params.type)}</Text>
                <IconFont name={publicFunc.lifeIcon(params.type)} size={25} color="white" style={{paddingVertical:5}}/>
                <Text style={{fontSize:13,color:'white'}}>{params.brf}</Text>
            </TouchableOpacity>
        )
    }
    openModal(index){
        this.setState({
            currentIndex:index,
            modalShow:true
        })
    }
    openDrawer(){
        this.setState({
            drawerLockMode:'locked-open'
        },()=>{
            this.setState({
                drawerLockMode:'unlocked'
            })
        })
    }
    _onRefresh(){
        this.setState({
            isRefreshing:true
        },()=>{
            this.initData()
        })
    }
    getNewCity(keyIndex,childIndex){

        this.setState({
            currentListIndex:childIndex,
            currentListKey:keyIndex,
            drawerLockMode:'locked-closed'
        },()=>{
            this.setState({
                isLoading:true,
                drawerLockMode:'unlocked',
            },()=>{
                this.props.actions.requestAllWeatherInfo('location',cityData[keyIndex].child[childIndex].key,()=>{
                    // this.props.actions.requestAirInfo('location',cityData[keyIndex].key,()=>{
                    //
                    // })
                    this.setState({
                        isLoading:false,
                        isRefreshing:false
                    })
                })
            })
        })
    }
    openCityModal(){
        this.setState({
            cityModalShow:true
        })
    }
    closeCityModal(keyIndex,childIndex){
        this.setState({
            cityModalShow:false
        },()=>this.getNewCity(keyIndex,childIndex))
    }
    renderCity(){
        let cityList=[];
        cityData.map((item,index)=>{
            let _cityList=[];
            item.child.map((item1,index1)=>{
                 _cityList.push(
                    <TouchableOpacity
                        key={index1}
                        activeOpacity={1}
                        onPress={()=>this.closeCityModal(index,index1)}
                        style={[styles.city,{marginRight:(index1+1)%4?25:0,borderColor:this.state.currentListKey==index && this.state.currentListIndex==index1?this.props.globalConfig.themeColor:'#666666'}]}
                    >
                        <Text style={{color:this.state.currentListKey==index && this.state.currentListIndex==index1?this.props.globalConfig.themeColor:'#666666'}}>{item1.value}</Text>
                    </TouchableOpacity>
                )
            });
            cityList.push(
                <View key={index}>
                    <Text style={styles.cityTitle}>{item.value}</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        {_cityList}
                    </View>
                </View>
            )
        });
        return cityList
    }
    getTmp(daily){
        let higherTmp=[];
        let lowerTmp=[];
        daily.map(item=>{
            lowerTmp.push(item.tmp_min);
            higherTmp.push(item.tmp_max);
        });
        return {
            lowerTmp,
            higherTmp
        }
    }
    getDate(daily){
        let date=[];
        daily.map((item,index)=>{
            if(index==0){
                date.push('今天');
            }
            else if(index==1){
                date.push('明天');
            }
            else if(index==2){
                date.push('后天');
            }
            else{
                date.push((item.date.split('-'))[2]+'日');
            }
        });
        return date;
    }
    renderDrawer(){
        if(!this.state.isLoading){
            let weatherList=this.props.weatherInfoList;
            return(
                <View style={{flex:1}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.openCityModal()} style={{paddingVertical:5}}>
                        <Text style={{textAlign:'right',marginRight:15,color:'black'}}>更多</Text>
                    </TouchableOpacity>
                    <View style={{flex:1,backgroundColor:'white',alignItems:'center'}}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>this.getNewCity(0,2)} style={[styles.singleItems,{backgroundColor:this.state.currentListIndex==2 && this.state.currentListKey==0?'#eeeeee':'white'}]}>
                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                <Image source={{uri:'https://cdn.heweather.com/cond_icon/'+weatherList[0].HeWeather6[0].now.cond_code+'.png'}} style={{width:35,height:35,tintColor:'black'}}/>
                                <View style={{marginLeft:10}}>
                                    <Text style={{color:'black',fontSize:14}}>北京</Text>
                                    <Text style={{color:'#666666',fontSize:12}}>顺义</Text>
                                </View>
                            </View>
                            <Text style={{color:'black',fontSize:14}}>{weatherList[0].HeWeather6[0].now.tmp}℃</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=>this.getNewCity(0,0)} style={[styles.singleItems,{backgroundColor:this.state.currentListIndex==0 && this.state.currentListKey==0?'#eeeeee':'white'}]}>
                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                <Image source={{uri:'https://cdn.heweather.com/cond_icon/'+weatherList[1].HeWeather6[0].now.cond_code+'.png'}} style={{width:35,height:35,tintColor:'black'}}/>
                                <View style={{marginLeft:10}}>
                                    <Text style={{color:'black',fontSize:14}}>北京</Text>
                                    <Text style={{color:'#666666',fontSize:12}}>海淀</Text>
                                </View>
                            </View>
                            <Text style={{color:'black',fontSize:14}}>{weatherList[1].HeWeather6[0].now.tmp}℃</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=>this.getNewCity(1,0)} style={[styles.singleItems,{backgroundColor:this.state.currentListIndex==0 && this.state.currentListKey==1?'#eeeeee':'white'}]}>
                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                <Image source={{uri:'https://cdn.heweather.com/cond_icon/'+weatherList[2].HeWeather6[0].now.cond_code+'.png'}} style={{width:35,height:35,tintColor:'black'}}/>
                                <View style={{marginLeft:10}}>
                                    <Text style={{color:'black',fontSize:14}}>日本</Text>
                                    <Text style={{color:'#666666',fontSize:12}}>东京</Text>
                                </View>
                            </View>
                            <Text style={{color:'black',fontSize:14}}>{weatherList[2].HeWeather6[0].now.tmp}℃</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else{
            return null;
        }
    }
    render() {
            //alert(JSON.stringify(this.props.nowWeather))
            if(!this.state.isLoading){
                var nowWeather=this.props.allWeatherInfo.HeWeather6[0].now;
                var location=this.props.allWeatherInfo.HeWeather6[0].basic;
                var url='https://cdn.heweather.com/cond_icon/'+nowWeather.cond_code+'.png';
                //let nowState=this.props.airInfo.HeWeather6[0].air_now_city;
                var dailyWeather=this.props.allWeatherInfo.HeWeather6[0].daily_forecast;
                var activity=this.props.allWeatherInfo.HeWeather6[0].lifestyle;
                var lowerTmp=this.getTmp(dailyWeather).lowerTmp;
                var higherTmp=this.getTmp(dailyWeather).higherTmp;
                var date=this.getDate(dailyWeather);
                var option = {
                    timeLine:{
                        show:false
                    },
                    backgroundColor:'white',
                    tooltip: {},
                    color:['#68b1ed','#ff3737'],
                    legend: {
                        data:['最低气温','最高气温']
                    },
                    xAxis: {
                        data:date
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '最低气温',
                            type: 'line',
                            smooth: true,
                            data: lowerTmp
                        },
                        {
                            name: '最高气温',
                            type: 'line',
                            smooth: true,
                            data: higherTmp
                        }
                    ]
                };
            }
            return (
                <DrawerLayoutAndroid
                    drawerWidth={250}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => this.renderDrawer()}
                    drawerLockMode={this.state.drawerLockMode}
                >
                    {
                        this.state.isLoading?(
                            <View style={styles.container}>
                                <FastImage
                                    ref={(img) => { this.backgroundImage = img; }}
                                    source={{uri:config.imgBashPath+(this.state.currentListKey==0?'bj.jpg':'dj2.jpg')}}
                                    style={styles.absolute}
                                />
                                <View style={styles.navigator}>
                                    <View style={{width:30,height:30}}>
                                        <Icon name="ios-menu" size={25} color="white"/>
                                    </View>
                                    <Text style={styles.title}></Text>
                                    <View style={{width:30,height:30}}></View>
                                </View>
                                <View style={[{flex:1},styles.center]}>
                                    <ActivityIndicator color={this.props.globalConfig.themeColor} size="large"/>
                                </View>
                            </View>
                        ):(
                            <View style={styles.container}>
                                <FastImage
                                    ref={(img) => { this.backgroundImage = img; }}
                                    source={{uri:config.imgBashPath+(this.state.currentListKey==0?'bj.jpg':'dj2.jpg')}}
                                    style={styles.absolute}
                                />
                                <View style={styles.navigator}>
                                    <TouchableOpacity activeOpacity={1} onPress={()=>this.openDrawer()} style={{width:30,height:30}}>
                                        <Icon name="ios-menu" size={25} color="white"/>
                                    </TouchableOpacity>
                                    <Text style={styles.title}>{location.parent_city} {location.location}</Text>
                                    <View style={{width:30,height:30}}></View>
                                </View>
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.isRefreshing}
                                            onRefresh={()=>this._onRefresh()}
                                            tintColor={this.props.globalConfig.themeColor}
                                            colors={[this.props.globalConfig.themeColor]}
                                        />
                                    }
                                >
                                    <View style={styles.weatherAll}>
                                        <Text style={styles.nowText}>{nowWeather.tmp}℃</Text>
                                        <Image source={{uri:url}} style={{width:70,height:70,tintColor:'white'}}/>
                                        <Text style={{fontSize:16,color:'white'}}>{nowWeather.cond_txt}</Text>
                                        <View style={styles.aqiContainer}>
                                            {/*<Text style={{fontSize:14,color:'white',marginLeft:40}}>空气质量：{publicFunc.aqiFunc(nowState.aqi)}</Text>*/}
                                            <Text style={{fontSize:14,color:'white',marginLeft:40}}>降水量：{nowWeather.pcpn} mm</Text>
                                            <Text style={{fontSize:14,color:'white',marginRight:40}}>{nowWeather.wind_dir+'，'+nowWeather.wind_sc}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignSelf:'flex-start',marginVertical:20}}>
                                            <View style={{alignItems:'center'}}>
                                                <Text style={{fontSize:14,color:'white'}}>早晨</Text>
                                                <Image source={{uri:'https://cdn.heweather.com/cond_icon/'+dailyWeather[0].cond_code_d+'.png'}} style={styles.commonImg}/>
                                                <Text style={{fontSize:14,color:'white',textAlign:'center'}}>{dailyWeather[0].cond_txt_d}</Text>
                                            </View>
                                            <View style={{marginLeft:15,alignItems:'center'}}>
                                                <Text style={{fontSize:14,color:'white'}}>傍晚</Text>
                                                <Image source={{uri:'https://cdn.heweather.com/cond_icon/'+dailyWeather[0].cond_code_n+'.png'}} style={styles.commonImg}/>
                                                <Text style={{fontSize:14,color:'white',textAlign:'center'}}>{dailyWeather[0].cond_txt_n}</Text>
                                            </View>
                                        </View>
                                        {
                                            dailyWeather.map((item,index)=>{
                                                return this.renderDayWeather(item,index)
                                            })
                                        }
                                        <View style={{width:DeviceInfo.screenWidth-30,marginBottom:20}}></View>
                                        {
                                            this.state.currentListKey==0 && activity && activity.length?(
                                                <View style={{flexDirection:'row',width:DeviceInfo.screenWidth,flexWrap:'wrap',marginHorizontal:-15}}>
                                                    {
                                                        activity.map((item,index)=>{
                                                            return this.renderActivity(item,index)
                                                        })
                                                    }
                                                </View>
                                            ):null
                                        }
                                        {/*<View style={{marginHorizontal:-15,height:250,width:DeviceInfo.screenWidth}}>*/}
                                            {/*<Echarts option={option} height={250} style={{backgroundColor:'white'}}/>*/}
                                        {/*</View>*/}
                                        <EChartsView option={option} />
                                    </View>
                                </ScrollView>
                                {this.state.currentListKey==0 && activity && activity.length?(<Modal
                                    visible={this.state.modalShow}
                                    animationType="fade"
                                    onRequestClose={()=>{}}
                                    transparent={true}
                                    style={{flex:1}}
                                >
                                    <View style={styles.modal}>
                                        <View style={styles.modalInfo}>
                                            <Text style={{fontSize:15,color:'black',textAlign:'center'}}>{publicFunc.lifeStyleTitle(activity[this.state.currentIndex].type)}</Text>
                                            <IconFont name={publicFunc.lifeIcon(activity[this.state.currentIndex].type)} size={25} color="black" style={{paddingVertical:10}}/>
                                            <Text style={{fontSize:13,color:'black'}}>{activity[this.state.currentIndex].txt}</Text>
                                            <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({modalShow:false})} style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                                <Text style={{fontSize:13,color:'black',marginRight:5}}>关闭</Text>
                                                <IconFont name="times" size={18} color="black"/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>):null}
                            </View>
                        )
                    }
                    <Modal
                        visible={this.state.cityModalShow}
                        animationType='slide'
                        onRequestClose={()=>{}}
                        style={{flex:1}}
                    >
                        <ImageBackground source={{uri:config.imgBashPath+'city1.jpg'}} style={{flex:1}}>
                            <ScrollView contentContainerStyle={{paddingHorizontal:15}}>
                                <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({cityModalShow:false})} style={styles.closeButton}>
                                    <IconFont name="times" size={18} color="white"/>
                                </TouchableOpacity>
                                {
                                    this.renderCity()
                                }
                            </ScrollView>
                        </ImageBackground>
                    </Modal>
                </DrawerLayoutAndroid>

            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
        flex:1
    },
    navigator:{
        width:DeviceInfo.screenWidth,
        height:50,
        paddingHorizontal:15,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    title:{
        fontSize:17,
        color:'white'
    },
    weatherAll:{
        flex:1,
        paddingHorizontal:15,
        alignItems:'center'
    },
    nowText:{
        fontSize:40,
        color:'white',
        marginTop:20
    },
    aqiContainer:{
        flexDirection:'row',
        width:DeviceInfo.screenWidth-30,
        justifyContent:'space-between',
        paddingTop:20
    },
    dailyContainer:{
        width:DeviceInfo.screenWidth-30,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:5
    },
    dailyLeft:{
        flexDirection:'row',
        width:(DeviceInfo.screenWidth-30)/3
    },
    dailyCenter:{
        flexDirection:'row',
        width:(DeviceInfo.screenWidth-30)/3,
        alignItems:'center',
        justifyContent:'center'
    },
    dailyRight:{
        flexDirection:'row',
        width:(DeviceInfo.screenWidth-30)/3,
        justifyContent:'flex-end'
    },
    commonImg:{
        width:30,
        height:30,
        tintColor:'white'
    },
    lifeStyle:{
        width:(DeviceInfo.screenWidth)/4,
        height:(DeviceInfo.screenWidth)/4,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'gray',
        borderRightWidth:1,
        borderBottomWidth:1,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    modal:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    modalInfo:{
        backgroundColor:'white',
        width:DeviceInfo.screenWidth/2,
        padding:15,
        borderRadius:8,
        alignItems:'center'
    },
    singleItems:{
        flexDirection:'row',
        width:250,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:15,
        paddingVertical:6,
        borderBottomWidth:1,
        borderColor:'#eeeeee'
    },
    closeButton:{
        width:25,
        height:25,
        backgroundColor:'rgba(0,0,0,0.8)',
        marginLeft:-5,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    city:{
        width:(DeviceInfo.screenWidth-30-75)/4,
        height:(DeviceInfo.screenWidth-30-75)/4/2,
        backgroundColor:'white',
        marginRight:25,
        marginBottom:25,
        borderRadius:10,
        borderColor:'#666666',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    cityTitle:{
        textAlign:'center',
        color:'white',
        fontSize:16,
        fontWeight:'bold',
        marginBottom:15
    }
});

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(emotionServer,dispatch)
})
const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig,
    nowWeather:state.emotionReducer.nowWeather,
    airInfo:state.emotionReducer.airInfo,
    allWeatherInfo:state.emotionReducer.allWeatherInfo,
    weatherInfoList:state.emotionReducer.weatherInfoList
})

export default connect(mapStateToProps,mapDispatchToProps)(Emotion)
