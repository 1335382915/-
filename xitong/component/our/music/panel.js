/**
 * Created by qinchuan on 2017/10/27.
 */
//用redux去监听吧！！！
import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    Slider,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Animated,
    Easing
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
var {width,height} = Dimensions.get('window');
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import NavigationBar from '../../public/navigationBar';
import Icon from 'react-native-vector-icons/Ionicons';
var lyrObj = []   // 存放歌词
var myAnimate;

class Panel extends Component {

    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
    }
    componentWillMount() {
        let startPlay=this.props.navigation.state.params.startPlay;
        let index=this.props.navigation.state.params.index;
        let timer=this.props.navigation.state.params.timer;
        let currentMusic=this.props.navigation.state.params.currentMusic;
        if(!timer || currentMusic!=index){
            if((this.props.state.pause && currentMusic!=index) || (!this.props.state.pause && currentMusic!=index)){
                startPlay(index);
            }

        }
        this.spin()   //   启动旋转
    }
    //旋转动画
    spin () {
        this.spinValue.setValue(0)
        myAnimate = Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 20000,
                easing: Easing.linear
            }
        ).start(() => this.spin())

    }
    formatTime(time) {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
    render() {

        let _onValueChange=this.props.navigation.state.params.onValueChange;
        let playModel=this.props.navigation.state.params.playModel;
        let _onSlidingComplete=this.props.navigation.state.params.onSlidingComplete;
        let playAction=this.props.navigation.state.params.playAction;
        let prevAction=this.props.navigation.state.params.prevAction;
        let nextAction=this.props.navigation.state.params.nextAction;
        let localSongList=this.props.navigation.state.params.musicData;
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        //如果未加载出来数据 就一直转菊花
        if (localSongList.length <= 0 ) {
            return(
                <ActivityIndicator
                    style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}
                    size="large" />
            )
        }else{
            const spin = this.spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']//0 360
            })
            let minute=Math.floor(this.props.state.file_duration/60).toString();
            let second=Math.floor(this.props.state.file_duration%60).toString();
            //数据加载出来
            return (
                <View style={styles.container} onLayout={(e)=>{
                    this.realyHeight=e.nativeEvent.layout.height;
                }}>
                    <NavigationBar title={`${this.props.state.author} - ${this.props.state.title}`} leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>
                    {/*背景大图*/}
                    <Image source={{uri:this.props.state.pic_big}} style={{flex:1,opacity:0.5}}/>
                    {/*背景白色透明遮罩*/}

                    <View style = {{position:'absolute',width: width,bottom:20,height:height-50}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            {/*胶片光盘*/}
                            <Image source={require('./image/jiaopianpan.png')} style={{width:220,height:220,alignSelf:'center'}}/>
                            {/*旋转小图*/}
                            <Animated.Image
                                ref = 'myAnimate'
                                style={{width:140,height:140,marginTop: -180,alignSelf:'center',borderRadius: 140*0.5,transform: [{rotate: spin}]}}
                                source={{uri:this.props.state.pic_small}}
                            />
                        </View>
                        {/*歌曲信息*/}
                        <View style={styles.playingInfo}>
                            {/*播放模式*/}
                            <View style = {{marginTop: 5,marginBottom:5}}>
                                <TouchableOpacity onPress={()=>playModel(this.props.state.playModel)}>
                                    <Image source={this.props.state.btnModel} style={{width:20,height:20}}/>
                                </TouchableOpacity>
                            </View>
                            {/*时间*/}
                            <Text>{this.formatTime(Math.floor(this.props.state.currentTime))} - {`${minute.length==1?'0'+minute:minute}:${second.length==1?'0'+second:second}`}{/*- {this.formatTime(Math.floor(this.state.duration))}*/}</Text>
                        </View>

                        {/*进度条*/}
                        <Slider
                            ref='slider'
                            style={{ marginLeft: 10, marginRight: 10}}
                            value={this.props.state.sliderValue}
                            maximumValue={this.props.state.file_duration}
                            step={1}
                            minimumTrackTintColor='gray'
                            maximumTrackTintColor={this.props.globalConfig.themeColor}
                            thumbTintColor={this.props.globalConfig.themeColor}
                            onValueChange={(value) => {
                                _onValueChange(value);

                            }
                            }
                            onSlidingComplete={(value) => {
                                _onSlidingComplete(value);

                            }}
                        />
                        {/*歌曲按钮*/}
                        <View style = {{flexDirection:'row',justifyContent:'space-around'}}>
                            <TouchableOpacity onPress={()=>prevAction(this.props.state.currentIndex - 1)}>
                                <Image source={require('./image/shangyishou.png')} style={{width:30,height:30}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>playAction()}>
                                <Image source={this.props.state.isplayBtn} style={{width:30,height:30}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>nextAction(this.props.state.currentIndex + 1)}>
                                <Image source={require('./image/xiayishou.png')} style={{width:30,height:30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1
    },
    playingControl: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    playingInfo: {
        flexDirection: 'row',
        alignItems:'stretch',
        justifyContent: 'space-between',

        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor:'rgba(255,255,255,0.0)'
    },
    text: {
        color: "black",
        fontSize: 22
    },
    modal: {
        height: 300,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingTop: 5,
        paddingBottom: 50
    },
    itemStyle: {
        paddingTop: 20,
        height:25,
        backgroundColor:'rgba(255,255,255,0.0)'
    }
})

const mapStateToProps=(state)=>({
    state:state.ourReducer.musicState,
    globalConfig:state.rootReducer.globalConfig
})

export default connect(mapStateToProps)(Panel)