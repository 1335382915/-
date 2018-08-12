/**
 * Created by qinchuan on 2017/10/27.
 */
/**
 * Created by qinchuan on 2017/10/27.
 */
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
    TouchableNativeFeedback,
    FlatList,
    Animated,
    Easing,
    TextInput
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ourServer from '../../../server/ourServer';
import Sound from 'react-native-sound';
import NavigationBar from '../../public/navigationBar';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from '../../../util/deviceInfo';
var lyrObj = []   // 存放歌词
var myAnimate;
//  http://rapapi.org/mockjsdata/16978/rn_songList
//  http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=213508
import {musicData} from '../../../data/musicData';

const copyObject=(obj)=>{
    return JSON.parse(JSON.stringify(obj));
}
const defaultMusicImg='http://ox6gixp8f.bkt.clouddn.com/defaultMusic.jpg'

class Music extends Component {

    constructor(props) {
        super(props);
        this.Sound=null;
        this.currentMusic=null;
        this.state={
            searchTextLayout:'center',
            musicData,
            searchValue:'',
            currentIndex:null
        }
    }
    //上一曲
    prevAction(index){
        // if(this.props.state.pause){
        //     this.timer=setInterval(()=>{
        //         this.onProgress()
        //     },1000)
        // }
        // if(index == -1){
        //     index = this.props.state.songs.length - 1 // 如果是第一首就回到最后一首歌
        // }
        // let _state=copyObject(this.props.state);
        // _state.sliderValue=0;
        // _state.pause=false;
        // _state.isplayBtn=require('./image/bofang.png');
        // _state.currentTime=0.0;
        // _state.currentIndex=index;
        // this.props.actions.changeMusicState(_state,()=>{
        //     this.loadSongInfo(index)  //加载数据
        // })
        // this.setState({
        //     currentIndex:index
        // })
        clearInterval(this.timer);
        this.timer=null;
        if(index == -1){
            index = this.props.state.songs.length - 1 // 如果是第一首就回到最后一首歌
        }
        let _state=copyObject(this.props.state);
        _state.sliderValue=0;
        _state.pause=false;
        _state.isplayBtn=require('./image/bofang.png');
        _state.currentTime=0.0;
        _state.currentIndex=index;
        this.props.actions.changeMusicState(_state,()=>{
            this.loadSongInfo(index)  //加载数据
            this.setState({
                currentIndex:index
            },()=>{
                this.timer=setInterval(()=>{
                    this.onProgress();
                },1000)
            })
        })


    }
    //下一曲
    nextAction(index){
        // if(this.props.state.pause){
        //     this.timer=setInterval(()=>{
        //         this.onProgress()
        //     },1000)
        // }
        // if(index == this.props.state.songs.length){
        //     index = 0 //如果是最后一首就回到第一首
        // }
        // let _state=copyObject(this.props.state);
        // _state.sliderValue=0;
        // _state.pause=false;
        // _state.isplayBtn=require('./image/bofang.png');
        // _state.currentTime=0.0;
        // _state.currentIndex=index;
        // this.props.actions.changeMusicState(_state,()=>{
        //     this.loadSongInfo(index)  //加载数据
        // });
        // this.setState({
        //     currentIndex:index
        // })
        clearInterval(this.timer);
        this.timer=null;
        if(index == this.props.state.songs.length){
            index = 0 //如果是最后一首就回到第一首
        }
        let _state=copyObject(this.props.state);
        _state.sliderValue=0;
        _state.pause=false;
        _state.isplayBtn=require('./image/bofang.png');
        _state.currentTime=0.0;
        _state.currentIndex=index;
        this.props.actions.changeMusicState(_state,()=>{
            this.loadSongInfo(index)  //加载数据
            this.setState({
                currentIndex:index
            },()=>{
                this.timer=setInterval(()=>{
                    this.onProgress();
                },1000)
            })
        });



    }
    //播放模式 接收传过来的当前播放模式 this.state.playModel
    playModel(playModel){
        playModel++;
        playModel = playModel == 4 ? 1 : playModel
        //重新设置
        let _state=copyObject(this.props.state);
        _state.playModel=playModel;
        //根据设置后的模式重新设置背景图片
        if(playModel == 1){
            _state.btnModel=require('./image/liebiaoxunhuan.png');
        }else if(playModel ==  2){
            _state.btnModel=require('./image/suiji.png');
        }else{
            _state.btnModel=require('./image/danquxunhuan.png');
        }
        this.props.actions.changeMusicState(_state);
    }
    //播放/暂停
    playAction(){
        let pause=!this.props.state.pause;
        let _state=copyObject(this.props.state);
        if(pause){
            this.Sound.getCurrentTime((time)=>{
                _state.currentTime=time;


            })
        }
        let playIcon=pause?require('./image/zanting.png'):require('./image/bofang.png');
        if(pause){
            clearInterval(this.timer);
            this.timer=null;
            this.Sound.stop()
        }
        else{
            this.Sound.setCurrentTime(this.props.state.currentTime);
            this.Sound.play(()=>{
                this.playEnd();
            });
            this.timer=setInterval(()=>{
                this.onProgress()
            },1000)
        }
        _state.pause=pause;
        _state.isplayBtn=playIcon;
        this.props.actions.changeMusicState(_state);

    }
    //播放器每隔250ms调用一次
    onProgress(){
        let newTime=this.props.state.currentTime+1;
        let val = parseInt(newTime);
        let _state=copyObject(this.props.state);
        _state.sliderValue=val;
        _state.currentTime=newTime;
        this.props.actions.changeMusicState(_state);
        //console.log(val+'_____'+this.state.file_duration);
        if(val==this.props.state.file_duration){

            //this.playEnd();
        }
    }

    loadSongInfo(index){
        //加载歌曲
        //console.log(index);
        this.Sound && this.Sound.stop();
        let songList = copyObject(this.state.musicData) //取出json中的歌曲数组
        let _state=copyObject(this.props.state);
        _state.songs=songList;
        _state.pic_small=songList[index].pic_small;
        _state.pic_big=songList[index].pic_big;  //大图
        _state.title=songList[index].title;     //歌曲名
        _state.author=songList[index].author;   //歌手
        _state.file_link=songList[index].file_link;   //播放链接
        _state.file_duration=songList[index].file_duration;//歌曲长度
        this.props.actions.changeMusicState(_state,()=>{
            //console.log(this.state.musicData[index].title)
            if(this.Sound) this.Sound.release();
            this.Sound=new Sound(this.state.musicData[index].song,Sound.MAIN_BUNDLE,(error)=>{
                if(error){
                    alert('播放失败');
                }
                else{
                    this.Sound.play(()=>{
                        this.playEnd()
                    });
                }
            })
        })
    }

    playEnd(){
        clearInterval(this.timer);
        this.timer=null;
        if(this.props.state.playModel == 1){
            //列表 就播放下一首
            if(this.props.state.currentIndex+1==this.state.musicData.length){
                let _state=copyObject(this.props.state);
                _state.currentTime=0;
                _state.sliderValue=0;
                _state.pause=true;
                _state.isplayBtn=require('./image/zanting.png');
                this.props.actions.changeMusicState(_state);
                this.Sound.stop();
            }
            else {
                this.timer=setInterval(()=>{
                    this.onProgress()
                },1000)
                this.nextAction(this.props.state.currentIndex + 1)
            }
        }else if(this.props.state.playModel == 2){
            let  last =  this.props.state.songs.length //json 中共有几首歌
            let random = Math.floor(Math.random() * last)  //取 0~last之间的随机整数
            this.timer=setInterval(()=>{
                this.onProgress()
            },1000)
            this.nextAction(random) //播放
        }else{
            //单曲 就再次播放当前这首歌曲
            let _state=copyObject(this.props.state);
            _state.currentTime=0;
            _state.sliderValue=0;
            this.props.actions.changeMusicState(_state);
            clearInterval(this.timer);
            this.timer=null;
            this.timer=setInterval(()=>{
                this.onProgress()
            },1000)
            this.Sound.setCurrentTime(0);
            this.Sound.play(()=>{
                this.playEnd()
            });
        }
    }
    goToPlayView(index){
        // this.loadSongInfo(index)
        // this.timer=setInterval(()=>{
        //     this.onProgress()
        // },1000)
        this.setState({
            currentIndex:index
        })
        const {navigate}=this.props.navigation;
        let params={
            prevAction:this.prevAction.bind(this),
            playEnd:this.playEnd.bind(this),
            nextAction:this.nextAction.bind(this),
            playModel:this.playModel.bind(this),
            playAction:this.playAction.bind(this),
            onProgress:this.onProgress.bind(this),
            loadSongInfo:this.loadSongInfo.bind(this),
            startPlay:this.startPlay.bind(this),
            onValueChange:this.onValueChange.bind(this),
            onSlidingComplete:this.onSlidingComplete.bind(this),
            Sound:this.Sound,
            timer:this.timer,
            currentMusic:this.currentMusic,
            index:index,
            musicData:this.state.musicData
        }
        let _state=this.props.state;
        _state.currentIndex=index;
        this.props.actions.changeMusicState(_state,()=>{
            navigate('Panel',params);
        });
    }
    onValueChange(value){
        clearInterval(this.timer);
        this.timer=null;
        let _state=copyObject(this.props.state);
        if(value<=this.props.state.file_duration){
            _state.currentTime=value;
        }
        else{
            _state.currentTime=this.props.state.file_duration;

        }
        this.props.actions.changeMusicState(_state);
    }
    onSlidingComplete(value){
        if(value<this.props.state.file_duration){
            this.timer=setInterval(()=>{
                this.onProgress()
            },1000)
            this.Sound.setCurrentTime(value);
        }
        else{
            let _state=copyObject(this.props.state);
            _state.sliderValue=0;
            _state.currentTime=0;
            _state.pause=true;
            _state.isplayBtn=require('./image/zanting.png');
            this.props.actions.changeMusicState(_state);
            this.Sound.stop();
        }
    }
    startPlay(index){
        clearInterval(this.timer);
        this.timer=null;
        let _state=copyObject(this.props.state);
        _state.currentTime=0;
        _state.sliderValue=0;
        _state.pause=false;
        _state.isplayBtn=require('./image/bofang.png');
        this.props.actions.changeMusicState(_state,()=>{
            this.loadSongInfo(index);
            this.timer=setInterval(()=>{
                this.onProgress()
            },1000);
            this.currentMusic=index;
        });

    }
    _renderMusicList(item,index){
        return (
            <TouchableNativeFeedback onPress={()=>this.goToPlayView(index)}>
                <View style={styles.musicList}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.authorContainer}>
                                <Icon name="ios-phone-portrait" size={15} color={this.props.globalConfig.themeColor}/>
                                <Text style={styles.author}>{item.author}</Text>
                            </View>
                        </View>
                        <Icon name="ios-arrow-forward" size={20} color={this.props.globalConfig.themeColor} style={{padding:0,margin:0}}/>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
    componentDidMount(){

    }
    componentWillUnmount(){

        if(this.Sound) this.Sound.stop();
        this.Sound=null;
        clearInterval(this.timer);
        this.timer=null;
        let _state={
            songs: [],   //数据源
            playModel:1,  // 播放模式  1:列表循环    2:随机    3:单曲循环
            btnModel:require('./image/liebiaoxunhuan.png'), //播放模式按钮背景图
            pic_small:'',    //小图
            pic_big:'',      //大图
            file_duration:0,    //歌曲长度
            title:'',       //歌曲名字
            author:'',      //歌曲作者
            sliderValue: 0,    //Slide的value
            pause:false,       //歌曲播放/暂停
            currentTime: 0.0,   //当前时间
            duration: 0.0,     //歌曲时间
            currentIndex:0,    //当前第几首
            isplayBtn:require('./image/bofang.png')  //播放/暂停按钮背景图
        }
        this.props.actions.changeMusicState(_state);
    }

    searchMusic(text){
        let _musicData=[];
        let _currentMusic=null;
        musicData.map((item,index)=>{
            if(item.title.toLowerCase().indexOf(text.toLowerCase())>=0 || !text){
                _musicData.push(item);
                if(index==this.currentMusic){
                    _currentMusic=index;
                }
            }
        });
        this._currentMusic=_currentMusic;
        this.setState({
            musicData:_musicData,
            searchValue:text
        })
    }
    render() {
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        let img=this.state.currentIndex!=null?musicData[this.state.currentIndex].pic_small:defaultMusicImg;
        let title=this.state.currentIndex!=null?musicData[this.state.currentIndex].title:'';
        let author=this.state.currentIndex!=null?musicData[this.state.currentIndex].author:'';
        return (
            <View style={{flex:1,backgroundColor:'#eeeeee'}}>
                <NavigationBar title='我们的音乐' leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={[styles.searchInfo,{textAlign:this.state.searchTextLayout}]}
                        underlineColorAndroid="transparent"
                        placeholder={'搜索本地歌曲'}
                        onFocus={()=>this.setState({searchTextLayout:'left'})}
                        onBlur={()=>this.setState({searchTextLayout:'center'})}
                        onChangeText={(text)=>this.searchMusic(text)}
                        value={this.state.searchValue}
                    />
                </View>
                <FlatList
                    data={this.state.musicData}
                    renderItem={({item,index})=>this._renderMusicList(item,index)}
                    keyExtractor={(item,index)=>index}
                />
                <View style={styles.panelContainer}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.state.currentIndex!=null?this.goToPlayView(this.state.currentIndex):null} style={{flex:1,flexDirection:'row'}}>
                        <Image source={{uri:img}} style={{width:40,height:40,borderRadius:40}}/>
                        <View style={{marginLeft:10,justifyContent:'center'}}>
                            <Text style={{color:'#333333',fontSize:14}}>{title}</Text>
                            <Text style={{color:this.props.globalConfig.themeColor,fontSize:12}}>{author}</Text>
                        </View>
                    </TouchableOpacity>
                    {
                        this.state.currentIndex!=null?
                            <TouchableOpacity activeOpacity={1} onPress={()=>this.playAction()} style={[styles.circulOutside,{backgroundColor:this.props.globalConfig.themeColor}]}>
                                <View style={styles.circulInside}>
                                    {
                                        this.props.state.pause?
                                            <Icon name="md-play" size={17} color={this.props.globalConfig.themeColor} style={{padding:0,margin:0}}/>:
                                            <Icon name="md-pause" size={17} color={this.props.globalConfig.themeColor} style={{padding:0,margin:0}}/>
                                    }
                                </View>
                            </TouchableOpacity>:null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    musicList:{
        paddingVertical:10,
        backgroundColor:'white',
        borderBottomWidth:1,
        borderColor:'#f1f1f1',
        paddingHorizontal:15
    },
    title:{
        fontSize:15,
        color:'#333333'
    },
    author:{
        fontSize:12,
        color:'#666666',
        marginLeft:5
    },
    authorContainer:{
        flexDirection:'row',
        marginTop:5,
        alignItems:'center'
    },
    searchContainer:{
        width:DeviceInfo.screenWidth,
        backgroundColor:'white',
        height:45
    },
    searchInfo:{
        flex:1,
        marginVertical:8,
        marginHorizontal:10,
        backgroundColor:'#f1f1f1',
        paddingVertical:0,
        borderRadius:5
    },
    circulOutside:{
        width:30,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30
    },
    circulInside:{
        width:27,
        height:27,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30
    },
    panelContainer:{
        width:DeviceInfo.screenWidth,
        height:50,
        backgroundColor:'#f1f1f1',
        flexDirection:'row',
        alignItems:'center',
        borderTopWidth:1,
        borderColor:'#e0e0e0',
        paddingHorizontal:10.,
        justifyContent:'space-between'
    }
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(ourServer,dispatch)
})
const mapStateToProps=(state)=>({
    state:state.ourReducer.musicState,
    globalConfig:state.rootReducer.globalConfig
})

export default connect(mapStateToProps,mapDispatchToProps)(Music)