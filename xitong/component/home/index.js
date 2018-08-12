/**
 * Created by qinchuan on 2017/10/1.
 */
/**
 * Created by qinchuan on 2017/10/1.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Animated,
    AsyncStorage,
    RefreshControl,
    TouchableOpacity,
    TouchableNativeFeedback,
    Modal
} from 'react-native';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeServer from '../../server/homeServer';
import * as config from '../../util/config';
import * as publicFunc from '../../util/publicFunc';
import DeviceInfo from '../../util/deviceInfo';
import NavigationBar from '../public/navigationBar';
import IconFont from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import {loveData,lifeData} from '../../data/loveData';
class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            isRefreshing:false,
            opacity:new Animated.Value(0),
            date:'',
            //每日一句
            num:'',
            //生活小贴士
            num1:'',
            modalVisible:false
        }
    }
    componentDidMount(){
        this.initData();
    }
    initData(){
        let date=publicFunc.getDate();
        let num=Math.floor(Math.random()*loveData.length);
        let num1=Math.floor(Math.random()*lifeData.length);
        //判断缓存中有无日期，如果有，判断当前日期是不是与缓存日期一致（是否在同一天），同一天则不更新图片
        AsyncStorage.getItem('date').then(data=>{
            if(data){
                if(data==date || !this.props.globalConfig.autoUpdateImg){
                    AsyncStorage.getItem('localImg').then(imgList=>{
                        imgList=JSON.parse(imgList);
                        this.props.actions.requestLocalEveryDayImg(imgList,()=>{
                            AsyncStorage.getItem('num').then(num=>{
                                num=parseInt(num);
                                AsyncStorage.getItem('num1').then(num1=>{
                                    num1=parseInt(num1);
                                    this.setState({
                                        isLoading:false,
                                        isRefreshing:false,
                                        date,
                                        num,
                                        num1
                                    })
                                })
                            })
                        })
                    })
                }
                else{
                    this.props.actions.requestEveryDayImg(()=>{
                        this.setState({
                            isLoading:false,
                            isRefreshing:false,
                            date,
                            num,
                            num1
                        })
                        AsyncStorage.setItem('date',date).then(()=>{
                            AsyncStorage.setItem('localImg',JSON.stringify([this.props.laImg,this.props.qcImg])).then(()=>{
                                AsyncStorage.setItem('num',num+'').then(()=>{
                                    AsyncStorage.setItem('num1',num1+'');
                                });
                            });
                        })
                    })
                }
            }
            else{
                this.props.actions.requestEveryDayImg(()=>{
                    this.setState({
                        isLoading:false,
                        isRefreshing:false,
                        date,
                        num,
                        num1
                    })
                    AsyncStorage.setItem('date',date).then(()=>{
                        AsyncStorage.setItem('localImg',JSON.stringify([this.props.laImg,this.props.qcImg])).then(()=>{
                            AsyncStorage.setItem('num',num+'').then(()=>{
                                AsyncStorage.setItem('num1',num1+'');
                            });
                        });
                    })
                })
            }
        })
    }
    renderSwiper(imgList){
        let imgArray=[];
        imgList.map((item,index)=>{
            let ownerName=index==0?'帅川':'萌昂';
            imgArray.push(<View style={styles.swiperView} key={index}>
                <FastImage source={{uri:`${config.imgBashPath}${item.path}`}} style={styles.swiperImg}/>
                <View style={styles.swiperInfo}>
                    <Text style={styles.swiperText}>{`今天的${ownerName}`}</Text>
                </View>
            </View>)
        })
        return imgArray;
    }
    _onScroll(e){
        let offsetY = e.nativeEvent.contentOffset.y;
        //如果当前屏幕内容为除轮播图意外的内容，则显示opacityBox的样式
        if(offsetY <= DeviceInfo.screenWidth*800/600 - 50){
            let opacity = offsetY / (DeviceInfo.screenWidth*800/600 - 50);
            this.setState({
                opacity
            });
        }
        //如果当前屏幕内容为轮播图，则显示opacityFloat的样式
        else{
            this.setState({
                opacity:1
            });
        }
    }
    refreshingData(){
        this.setState({
            isRefreshing:true
        },()=>this.initData())
    }
    render(){
        if(this.state.isLoading){
            return (
                <View style={styles.loadingStyle}>
                    <ActivityIndicator color="#68b1ed" size="large"/>
                </View>
            )
        }
        else{
            let date=publicFunc.getDate();
            return (
                <View style={{backgroundColor:'#eeeeee',flex:1}}>
                    <Animated.View style={[styles.navigationBar,{opacity:this.state.opacity}]}>
                        <NavigationBar title={this.state.date.split('-').join('/')} backgroundColor={this.props.globalConfig.themeColor}/>
                    </Animated.View>
                    <ScrollView
                        onScroll={(e)=>this._onScroll(e)}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={()=>this.refreshingData()}
                                tintColor={this.props.globalConfig.themeColor}
                                colors={[this.props.globalConfig.themeColor]}
                            />
                        }
                    >
                        <Swiper style={styles.swiperContainer} autoplayTimeout={5} autoplay activeDotColor={this.props.globalConfig.themeColor}>
                            {this.renderSwiper([this.props.qcImg,this.props.laImg])}
                        </Swiper>
                        <View style={{width:DeviceInfo.screenWidth}}>
                            <View style={{width:DeviceInfo.screenWidth,height:DeviceInfo.screenWidth,alignItems:'center',justifyContent:'center'}}>
                                <View style={styles.loveContainer}>
                                    <View style={styles.borderContainer}>
                                        <View style={styles.containerA}>
                                            <Text style={{fontSize:40,color:'black'}}>{loveData[this.state.num].title}</Text>
                                            <Text style={{fontSize:20,color:'#666666'}}>{loveData[this.state.num].title_1}</Text>
                                            <View style={{flexDirection:'row',alignItems:'center',marginVertical:5}}>
                                                <View style={{height:1,width:50,backgroundColor:'#666666'}}></View>
                                                <Text style={{fontSize:16,color:'#666666',marginHorizontal:20}}>{date}</Text>
                                                <View style={{height:1,width:50,backgroundColor:'#666666'}}></View>
                                            </View>
                                            {
                                                loveData[this.state.num].textArr.map((item,index)=>{
                                                    return <Text style={{fontSize:16,color:'#666666',marginVertical:3}} key={index}>{item}</Text>
                                                })
                                            }
                                        </View>
                                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                            <View style={[styles.dailyContainer,{backgroundColor:this.props.globalConfig.themeColor}]}>
                                                <Text style={{color:'white',fontSize:12}}>每日一句</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:DeviceInfo.screenWidth,marginVertical:20}}>
                                <View style={{marginHorizontal:20,backgroundColor:'white',borderRadius:8}}>
                                    <View style={{height:160,backgroundColor:'gray',justifyContent:'center',alignItems:'center',flexDirection:'row',borderTopLeftRadius:8,borderTopRightRadius:8}}>
                                        <Text style={{fontSize:25,color:'white',marginRight:10}}>生活小贴士</Text>
                                        <IconFont name="bell-o" color="white" size={30}/>
                                    </View>
                                    <View style={{minHeight:40,marginHorizontal:15,paddingVertical:20,borderBottomLeftRadius:8,borderBottomRightRadius:8,alignItems:'center'}}>
                                        <View style={{flex:1}}>
                                            <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>{lifeData[this.state.num1].title}</Text>
                                            <Text style={{width:DeviceInfo.screenWidth-70,fontSize:15,lineHeight:30,marginTop:5}} numberOfLines={2}>{lifeData[this.state.num1].text_1}</Text>
                                        </View>
                                        <TouchableNativeFeedback activeOpacity={1} onPress={()=>this.setState({modalVisible:true})}>
                                            <View style={{alignSelf:'flex-start',justifyContent:'center',alignItems:'center',width:110,height:35,backgroundColor:this.props.globalConfig.themeColor,marginTop:20,borderRadius:6}}>
                                                <Text style={{color:'white',fontSize:16}}>查看详细</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                    <Modal
                        transparent
                        visible={this.state.modalVisible}
                        onRequestClose={()=>{}}
                        animationType={'fade'}
                    >
                        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:DeviceInfo.screenWidth}}>
                                <View style={{marginHorizontal:20,backgroundColor:'white',borderRadius:8}}>
                                    <View style={{height:80,backgroundColor:this.props.globalConfig.themeColor,justifyContent:'center',alignItems:'center',flexDirection:'row',borderTopLeftRadius:8,borderTopRightRadius:8}}>
                                        <Text style={{fontSize:22,color:'white',marginRight:10}}>生活小贴士</Text>
                                        <IconFont name="bell-o" color="white" size={30}/>
                                    </View>
                                    <View style={{minHeight:40,marginHorizontal:15,paddingVertical:15,borderBottomLeftRadius:8,borderBottomRightRadius:8,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                        <View>
                                            <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>{lifeData[this.state.num1].title}</Text>
                                            <Text style={{fontSize:16,lineHeight:30,marginTop:10}}>{lifeData[this.state.num1].text_1}</Text>
                                        </View>
                                    </View>
                                    <View style={{alignItems:'center'}}>
                                        <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({modalVisible:false})} style={{marginBottom:20}}>
                                            <IconFont name="times" size={32} color={this.props.globalConfig.themeColor}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            )
        }
    }
}

const styles=StyleSheet.create({
    loadingStyle:{
        backgroundColor:'white',
        flex:1,
        justifyContent:'center'
    },
    swiperContainer:{
        width:DeviceInfo.screenWidth,
        height:DeviceInfo.screenWidth*800/600
    },
    swiperView:{
        width:DeviceInfo.screenWidth,
        height:DeviceInfo.screenWidth*800/600
    },
    swiperImg:{
        width:DeviceInfo.screenWidth,
        height:DeviceInfo.screenWidth*800/600
    },
    navigationBar:{
        position:'absolute',
        top:0,
        left:0,
        zIndex:1,
        width:DeviceInfo.screenWidth,
        height:50
    },
    swiperInfo:{
        position:'absolute',
        left:0,
        bottom:0,
        width:DeviceInfo.screenWidth,
        zIndex:2,
        alignItems:'flex-end',
        backgroundColor:'rgba(0,0,0,0.5)',
        paddingVertical:8
    },
    swiperText:{
        color:'white',
        fontSize:22,
        fontWeight:'normal',
        marginRight:10
    },
    loveContainer:{
        width:DeviceInfo.screenWidth-40,
        height:DeviceInfo.screenWidth-40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        marginTop:20
    },
    borderContainer:{
        width:DeviceInfo.screenWidth-80,
        height:DeviceInfo.screenWidth-80,
        borderWidth:4,
        borderColor:'#666666',
        alignItems:'center'
    },
    containerA:{
        width:DeviceInfo.screenWidth-88,
        height:DeviceInfo.screenWidth-130,
        justifyContent:'center',
        alignItems:'center',
    },
    dailyContainer:{
        height:25,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:5
    }
})
const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(homeServer,dispatch)
})
const mapStateToProps=(state)=>({
    laImg:state.homeReducer.laImg,
    qcImg:state.homeReducer.qcImg,
    globalConfig:state.rootReducer.globalConfig
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)