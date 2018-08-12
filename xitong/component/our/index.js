/**
 * Created by qinchuan on 2017/10/2.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity,
    ScrollView,
    Switch,
    Modal,
    AsyncStorage,
    TextInput,
    ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as rootServer from '../../server/rootServer';
import DeviceInfo from '../../util/deviceInfo';
import * as config from '../../util/config';
import NavigationBar from '../public/navigationBar';
import Carousel, {Pagination } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
const actionList=['music','photo','timeLine','memory','map','heart','daughter'];
class Our extends Component{
    constructor(props){
        super(props);
        this.state={
            activeSlide:0,
            //废弃
            modalVisible:false,
            password:''
        }
        navigate=this.props.navigation.navigate;
    }
    goToMusic(){
        //const {navigate}=this.props.navigation;
        this.navigate('Music');
    }
    goToImage(){
        //const {navigate}=this.props.navigation;
        this.navigate('Image');
    }
    goToTimeLine(){
        //const {navigate}=this.props.navigation;
        this.navigate('TimeLine');
    }
    goToMemoryDay(){
       // const {navigate}=this.props.navigation;
        this.navigate('MemoryDay');
    }
    goToMap(){
        //const {navigate}=this.props.navigation;
        this.navigate('Map')
    }
    goToHeart(){
        //const {navigate}=this.props.navigation;
        this.navigate('Heart');
    }
    goToDaughter(){
        this.navigate('Daughter');
    }
    _renderItem ({item, index}) {
        let text='';
        let event=null;
        let icon=null;
        let title=null;
        let description=null;
        switch(item){
            case 'music':
                text='music';
                event=this.goToMusic;
                icon='ios-musical-note-outline';
                title='我们的音乐';
                description='在这里，记录着我们在一起听过的每一首音乐';
                imgUrl=config.imgBashPath+'music3.jpg';
                break;
            case 'photo':
                text='photo';
                event=this.goToImage;
                icon='md-images';
                title='我们的照片';
                description='和你在一起拍过的每一张照片，在这里定格';
                imgUrl=config.imgBashPath+'photo1.jpg';
                break;
            case 'timeLine':
                text='timeLine';
                event=this.goToTimeLine;
                icon='ios-alarm-outline';
                title='我们的时光';
                description='教室外的拥抱，宿舍门口的告别，满满的回忆涌上心头';
                imgUrl=config.imgBashPath+'time1.jpg';
                break;
            case 'memory':
                text='memory';
                event=this.goToMemoryDay;
                icon='ios-calendar-outline';
                title='我们的纪念日';
                description='在一起的每一天，每一分，每一秒，我们都铭记在心';
                imgUrl=config.imgBashPath+'ourHeart1.jpg';
                break;
            case 'map':
                text='map';
                event=this.goToMap;
                icon='ios-paw-outline';
                title='我们的足迹';
                description='还记得开心小吃吗？还记得公园的秘密花园吗？这里记录着我们留下的每一个足迹';
                imgUrl=config.imgBashPath+'foot1.jpg';
                break;
            case 'heart':
                text='heart';
                event=this.goToHeart;
                icon='md-heart-outline';
                title='我们的内心';
                description='我想对你说的话，都在这里';
                imgUrl=config.imgBashPath+'heart.jpg';
                break;
            case 'daughter':
                text='daughter';
                event=this.goToDaughter;
                icon='ios-female-outline';
                title='我们的女儿';
                description='我们的女儿有话想对我们说呢';
                imgUrl=config.imgBashPath+'ls3.jpg';
                break;
            default:break;
        }
        return(
            <TouchableOpacity activeOpacity={1} style={styles.imageContainer}>
                <FastImage source={{uri:imgUrl}} style={styles.imageContainer}/>
                <View style={styles.bottomContainer}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:'white',fontSize:16}}>{title}</Text>
                        <Icon name={icon} size={30} color="white"/>
                    </View>
                    <Text style={{color:'white',fontSize:14}}>{description}</Text>
                    <TouchableOpacity onPress={()=>event()} style={styles.buttonContainer}>
                        <Text style={{color:'white',fontSize:14,includeFontPadding:false}}>前往</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    get pagination () {
        return (
            <Pagination
                dotsLength={actionList.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ backgroundColor: '#DBBC90' }}
                dotContainerStyle={{marginLeft:0,marginRight:0}}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                activeOpacity={1}
            />
        );
    }

    submit(){
        if(this.state.password != '0813'){
            ToastAndroid.show('密码错误，请重试',ToastAndroid.SHORT);
        }
        else{
            this.setState({
                modalVisible:false
            })
        }
    }
    render(){
        return (
            <View style={{flex:1,backgroundColor:'#eeeeee'}}>
                <NavigationBar title='我们' backgroundColor={'#DBBC90' }/>
                <Carousel
                    data={actionList}
                    renderItem={this._renderItem.bind(this)}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    sliderWidth={DeviceInfo.screenWidth}
                    sliderHeight={DeviceInfo.screenHeight}
                    itemWidth={DeviceInfo.screenWidth*0.7}
                    itemHeight={DeviceInfo.screenWidth*0.7}
                    //loop
                    contentContainerCustomStyle={{justifyContent:'center',alignItems:'center',backgroundColor: '#DBBC90' }}
                />
                { this.pagination }
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>{}}
                    animationType={'fade'}
                >
                    <View style={styles.mask}>
                        <ScrollView contentContainerStyle={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <View style={[styles.modalContainer,{width:DeviceInfo.screenWidth-100}]}>
                                <Text style={styles.textInput}>请输入我们的四位数字密码</Text>
                                <Text style={{fontSize:16,color:'#666666',marginBottom:30}}>（结合我们彼此的生日哦~）</Text>
                                <TextInput
                                    maxLength={4}
                                    keyboardType={'numeric'}
                                    secureTextEntry
                                    style={{width:100,fontSize:18,textAlign:'center'}}
                                    value={this.state.password}
                                    onChangeText={(text)=>this.setState({password:text})}
                                />
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.submitBtn,{backgroundColor:this.props.globalConfig.themeColor}]}
                                    onPress={()=>this.submit()}
                                >
                                    <Text style={{fontSize:17,color:'white'}}>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    aboutApp:{
        width:DeviceInfo.screenWidth,
        paddingVertical:15,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#eeeeee',
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
        marginTop:15
    },
    aboutText:{
        marginLeft:10,
        fontSize:16,
        color:'black'
    },
    items:{
        width:DeviceInfo.screenWidth,
        paddingVertical:8,
        borderTopWidth:1,
        borderColor:'#eeeeee',
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15
    },
    itemContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    itemText:{
        fontSize:14,
        marginLeft:15,
        color:'#333333',
        includeFontPadding:false
    },
    iconContainer:{
        width:22,
        height:22,
        justifyContent:'center',
        alignItems:'center'
    },
    imageContainer:{
        width:DeviceInfo.screenWidth*0.7,
        height:DeviceInfo.screenWidth*0.7
    },
    bottomContainer:{
        width:DeviceInfo.screenWidth*0.7,
        height:DeviceInfo.screenWidth*0.4,
        backgroundColor:'rgba(0,0,0,0.8)',
        position:'absolute',
        bottom:0,
        paddingHorizontal:15,
        justifyContent:'space-around'
    },
    buttonContainer:{
        width:65,
        height:30,
        borderColor:'white',
        borderWidth:2,
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center'
    },
    submitBtn:{
        width:100,
        height:40,
        marginTop:20,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    },
    textInput:{
        fontSize:20,
        color:'black',
        marginTop:20,
        marginBottom:20
    },
    mask:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.7)',
        justifyContent:'center',
        alignItems:'center'
    },
    modalContainer:{
        marginHorizontal:50,
        backgroundColor:'white',
        paddingBottom:20,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    }
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(rootServer,dispatch)
})
const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig
})

export default connect(mapStateToProps,mapDispatchToProps)(Our)

