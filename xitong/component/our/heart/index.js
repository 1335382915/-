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
import Swiper from 'react-native-swiper';
import Sound from 'react-native-sound';
import FastImage from 'react-native-fast-image';
const colorList=['#0095fe','#68b1ed','#ff0012','#ad003d','#64a0d4','#ff8e8e','#0d62cc']

class Heart extends Component{
    constructor(props){
        super(props);
        this.Sound=null;
        this.state={
            backgroundColor:colorList[0]
        }

    }
    playEnd(){
        this.Sound.play(()=>{
            this.playEnd();
        })
    }
    chanageIndex(index){
        this.setState({
            backgroundColor:colorList[index]
        })
    }
    componentDidMount(){
        this.Sound=new Sound('beautifulwhite.mp3',Sound.MAIN_BUNDLE,(error)=>{
            if(error){
                alert('播放失败');
            }
            else{
                this.Sound.play(()=>{
                    this.playEnd()
                })
            }
        })
    }
    componentWillUnmount(){
        if(this.Sound) this.Sound.stop();
        this.Sound=null;
    }
    render(){
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        return (
            <View style={{flex:1,backgroundColor:'#eeeeee'}}>
                <NavigationBar title='我们的内心' leftBtn={leftBtn} backgroundColor={this.state.backgroundColor}/>
                <Swiper
                    style={{flex:1}}
                    showButtons={true}
                    showsPagination={false}
                    loop={false}
                    nextButton={<Text>next</Text>}
                    onIndexChanged={(index)=>this.chanageIndex(index)}
                >
                    <View style={[styles.view,{backgroundColor:'#0095fe'}]}>
                        <Text style={{color:'white',fontSize:18,textAlign:'center'}}>座位左，座位右，女孩紧紧握住男孩的手，一握就是七年。</Text>
                    </View>

                    <View style={[styles.view,{backgroundColor:'#68b1ed'}]}>
                        <View style={{alignItems:'center'}}>
                            <View style={{alignItems:'center'}}>
                                <View style={{width:206,height:273,borderStyle:'dotted',borderColor:'white',borderWidth:3}}>
                                    <Image source={{uri:config.imgBashPath+'everydaya6.jpg'}} style={{width:200,height:267}}/>
                                </View>
                                <Text style={{color:'white',fontSize:20}}>我认识这样一个女孩</Text>
                                <Text style={{color:'white',fontSize:16}}>我们相识在高一，那时我们是同桌</Text>
                                <Text style={{color:'white',fontSize:16}}>“原来你叫秦川啊”“原来你就是李昂啊”</Text>
                                <Text style={{color:'white',fontSize:16}}>那是我们的第一次对话</Text>
                                <Text style={{color:'white',fontSize:16}}>她笑容很甜，就像太阳一般</Text>
                                <Text style={{color:'white',fontSize:16}}>她很坚强，能撑起半边天</Text>
                                <Text style={{color:'white',fontSize:16}}>她也有软弱的时候，哭得比谁都惨</Text>
                                <Text style={{color:'white',fontSize:16}}>或许她并不完美</Text>
                                <Text style={{color:'white',fontSize:16}}>但我知道，她是我的一切</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.view,{backgroundColor:'#ff0012'}]}>
                        <View style={{alignItems:'center'}}>
                            <View style={{alignItems:'center'}}>
                                <View style={{width:206,height:273,borderStyle:'dotted',borderColor:'white',borderWidth:3}}>
                                    <Image source={{uri:config.imgBashPath+'everydayc5.jpg'}} style={{width:200,height:267}}/>
                                </View>
                                <Text style={{color:'white',fontSize:20}}>我嘛</Text>
                                <Text style={{color:'white',fontSize:16}}>平凡得不能再平凡的普通人</Text>
                                <Text style={{color:'white',fontSize:16}}>一个不为世人所知却又在努力的屌丝程序员</Text>
                                <Text style={{color:'white',fontSize:16}}>可以说我比较“贱”吧</Text>
                                <Text style={{color:'white',fontSize:16}}>所以大家都叫我“贱人川”</Text>
                                <Text style={{color:'white',fontSize:16}}>川狗，黑狗，红毛狗</Text>
                                <Text style={{color:'white',fontSize:16}}>都说程序员“钱多话少死的早”</Text>
                                <Text style={{color:'white',fontSize:16}}>我可不这么认为，我还要努力变成男神呢</Text>
                                <Text style={{color:'white',fontSize:16}}>虽说我和“男神”这个词根本不沾边</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.view,{backgroundColor:'#ad003d'}]}>
                        <Text style={{color:'white',fontSize:20,marginBottom:10}}>有一段话让我铭记于心:</Text>
                        <Text style={{color:'white',fontSize:16}}>“找一个你了解的，你在乎的，知道她喜欢吃甜的还是辣的，知道她玩手机用哪根手指头，知道她上厕所喜欢玩什么手机应用，知道她吃香蕉会剥成几瓣，知道她肯为你吃醋就算生气也会主动关心你，原谅你的过失，原谅你的不辞而别。记得，多吻她，不要让她的眼泪掉在地上。”</Text>
                    </View>

                    <View style={[styles.view,{backgroundColor:'#64a0d4'}]}>
                        <Text style={{color:'white',fontSize:20,marginBottom:10,textAlign:'center'}}>认识她七年了，她的每一个动作和喜好已经成了我的习惯了吧</Text>
                        <Text style={{color:'white',fontSize:14}}>她讨厌吃蘑菇，就像我讨厌吃饺子</Text>
                        <Text style={{color:'white',fontSize:14}}>她吃鸡翅总啃不干净，都是我把剩下的肉啃干净</Text>
                        <Text style={{color:'white',fontSize:14}}>她喜欢吃翅根，不喜欢翅中，理由同上</Text>
                        <Text style={{color:'white',fontSize:14}}>她喜欢把饺子放到七喜里面</Text>
                        <Text style={{color:'white',fontSize:14}}>每次放假回家必吃呷哺呷哺</Text>
                        <Text style={{color:'white',fontSize:14}}>每次出去都是她吃菜我吃肉</Text>
                        <Text style={{color:'white',fontSize:14}}>她几乎不吃任何海鲜</Text>
                        <Text style={{color:'white',fontSize:14}}>麦当劳比肯德基好吃</Text>
                        <Text style={{color:'white',fontSize:14}}>她不爱吃月饼</Text>
                        <Text style={{color:'white',fontSize:14}}>她喜欢粽子，果冻，面包，巧克力，松饼，意面</Text>
                        <Text style={{color:'white',fontSize:14}}>她喜欢果汁，泡面，爆米花，薯条，DQ，火锅</Text>
                        <Text style={{color:'white',fontSize:14}}>她喜欢吃的东西多到数不清</Text>
                        <Text style={{color:'white',fontSize:14}}>她最喜欢蓝色：#68B1ED</Text>
                        <Text style={{color:'white',fontSize:14}}>她喜欢小樱，喜欢到不得了的地步</Text>
                        <Text style={{color:'white',fontSize:14}}>她喜欢听日语歌，也喜欢唱日语歌，比唱中文歌还溜</Text>
                        <Text style={{color:'white',fontSize:14}}>她很怕黑，真的很怕黑</Text>
                        <Text style={{color:'white',fontSize:14}}>她很厉害，啥都会，简直是全能无敌小天使</Text>
                        <Text style={{color:'white',fontSize:14}}>她很感性，每次看电影都哭得不行</Text>
                        <Text style={{color:'white',fontSize:14}}>她见不得别人受委屈，更见不得别人受苦</Text>
                        <Text style={{color:'white',fontSize:14}}>她珍惜身边的每一个人，甚至超过珍惜自己</Text>
                        <Text style={{color:'white',fontSize:14}}>她虽然坚强，但也会悲伤，也会流泪，也会需要安慰</Text>
                    </View>

                    <View style={[styles.view,{backgroundColor:'#ff8e8e'}]}>
                        <Text style={{color:'white',fontSize:20,marginBottom:20}}>她是我的女神</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                            <FastImage source={{uri:config.imgBashPath+'las2.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las8.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las21.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las24.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las27.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las29.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las35.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las41.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las43.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las46.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las47.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las51.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las52.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las54.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las60.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                            <FastImage source={{uri:config.imgBashPath+'las79.jpg'}} style={{width:DeviceInfo.screenWidth/5,height:DeviceInfo.screenWidth/5}}/>
                        </View>
                    </View>

                    <View style={[styles.view,{backgroundColor:'#0d62cc'}]}>
                        <Text style={{color:'white',fontSize:20,marginBottom:20}}>我今生说什么也要娶到她</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                            <FastImage source={{uri:config.imgBashPath+'01.jpg'}} style={{width:DeviceInfo.screenWidth/4,height:DeviceInfo.screenWidth/4*150/112}}/>
                            <FastImage source={{uri:config.imgBashPath+'02.jpg'}} style={{width:DeviceInfo.screenWidth/4,height:DeviceInfo.screenWidth/4*150/112}}/>
                            <FastImage source={{uri:config.imgBashPath+'03.jpg'}} style={{width:DeviceInfo.screenWidth/4,height:DeviceInfo.screenWidth/4*150/112}}/>
                            <FastImage source={{uri:config.imgBashPath+'04.jpg'}} style={{width:DeviceInfo.screenWidth/4,height:DeviceInfo.screenWidth/4*150/112}}/>
                            <FastImage source={{uri:config.imgBashPath+'page.JPG'}} style={{width:DeviceInfo.screenWidth/4,height:DeviceInfo.screenWidth/4*150/112}}/>
                            <FastImage source={{uri:config.imgBashPath+'05.jpg'}} style={{width:DeviceInfo.screenWidth/4,height:DeviceInfo.screenWidth/4*150/112}}/>
                            <FastImage source={{uri:config.imgBashPath+'06.jpg'}} style={{width:DeviceInfo.screenWidth/4,height:DeviceInfo.screenWidth/4*150/112}}/>
                            <FastImage source={{uri:config.imgBashPath+'07.jpg'}} style={{width:DeviceInfo.screenWidth/4,height:DeviceInfo.screenWidth/4*150/112}}/>
                            <FastImage source={{uri:config.imgBashPath+'08.jpg'}} style={{width:DeviceInfo.screenWidth/4,height:DeviceInfo.screenWidth/4*150/112}}/>
                        </View>
                    </View>
                </Swiper>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    view:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:15
    }
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(ourServer,dispatch)
})
const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig,
})

export default connect(mapStateToProps,mapDispatchToProps)(Heart)