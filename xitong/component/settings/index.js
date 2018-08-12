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
    ScrollView,
    Switch,
    AsyncStorage,
    Linking,
    Modal
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as rootServer from '../../server/rootServer';
import * as config from '../../util/config';
import DeviceInfo from '../../util/deviceInfo';
import ThemeChoice from './themeChoice';
import NavigationBar from '../public/navigationBar';
import Hello from '../hello';
//icon2
//icon_1
const icon=require('../../image/icon_final.png');
class Settings extends Component{
    constructor(props){
        super(props);
        this.state={
            modalVisible:false
        }
    }
    goToAbout(){
        const {navigate}=this.props.navigation;
        navigate('AboutApp',{navigation:this.props.navigation});
    }
    changeGlobalConfig(type){
        switch(type){
            case 0:
                const {navigate}=this.props.navigation;
                navigate('ThemeChoice',{actions:this.props.actions});
                break;
            case 1:
                AsyncStorage.getItem('globalConfig').then(data=>{
                    data=JSON.parse(data);
                    data.nightMode=!this.props.globalConfig.nightMode;
                    AsyncStorage.setItem('globalConfig',JSON.stringify(data)).then(()=>{
                        this.props.actions.setGlobalConfig(data)
                    })
                })
                break;
            case 2:
                AsyncStorage.getItem('globalConfig').then(data=>{
                    data=JSON.parse(data);
                    data.openPassword=!this.props.globalConfig.openPassword;
                    AsyncStorage.setItem('globalConfig',JSON.stringify(data)).then(()=>{
                        this.props.actions.setGlobalConfig(data)
                    })
                })
                break;
            case 3:
                AsyncStorage.getItem('globalConfig').then(data=>{
                    data=JSON.parse(data);
                    data.autoUpdateImg=!this.props.globalConfig.autoUpdateImg;
                    AsyncStorage.setItem('globalConfig',JSON.stringify(data)).then(()=>{
                        this.props.actions.setGlobalConfig(data)
                    })
                })
                break;
            default:
                break;
        }
    }
    feedback(){
        Linking.canOpenURL('smsto:13439938316').then(support=>{
            if(support){
                Linking.openURL('smsto:13439938316');
            }
            else{

            }
        })
    }
    render(){
        const {navigate}=this.props.navigation;
        return (
            <View style={{flex:1,backgroundColor:'#eeeeee'}}>
                <NavigationBar title='设置' backgroundColor={this.props.globalConfig.themeColor}/>
                <TouchableNativeFeedback style={{width:DeviceInfo.screenWidth}} onPress={()=>this.goToAbout()}>
                    <View style={styles.aboutApp}>
                        <View style={styles.itemContainer}>
                            <Image source={icon} style={{width:45,height:45}}/>
                            <Text style={styles.aboutText}>汐彤的小家</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={30} color='#515152'/>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={()=>this.changeGlobalConfig(0)}>
                    <View style={[styles.items,{marginTop:15}]}>
                        <View style={styles.itemContainer}>
                            <View style={[styles.iconContainer,{backgroundColor:'#ff3737'}]}>
                                <Icon name='ios-color-palette' size={20} color='white'/>
                            </View>
                            <Text style={styles.itemText}>主题颜色</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={22} color='#515152'/>
                    </View>
                </TouchableNativeFeedback>
                {/*<TouchableNativeFeedback>*/}
                    {/*<View style={styles.items}>*/}
                        {/*<View style={styles.itemContainer}>*/}
                            {/*<View style={[styles.iconContainer,{backgroundColor:'#9c00ff'}]}>*/}
                                {/*<Icon name='ios-moon' size={20} color='white'/>*/}
                            {/*</View>*/}
                            {/*<Text style={styles.itemText}>夜间模式</Text>*/}
                        {/*</View>*/}
                        {/*<Switch value={this.props.globalConfig.nightMode} onValueChange={()=>this.changeGlobalConfig(1)}/>*/}
                    {/*</View>*/}
                {/*</TouchableNativeFeedback>*/}
                {/*<TouchableNativeFeedback>*/}
                    {/*<View style={styles.items}>*/}
                        {/*<View style={styles.itemContainer}>*/}
                            {/*<View style={[styles.iconContainer,{backgroundColor:'#ff4f42'}]}>*/}
                                {/*<Icon name='ios-lock' size={20} color='white'/>*/}
                            {/*</View>*/}
                            {/*<Text style={styles.itemText}>开启密码</Text>*/}
                        {/*</View>*/}
                        {/*<Switch value={this.props.globalConfig.openPassword} onValueChange={()=>this.changeGlobalConfig(2)}/>*/}
                    {/*</View>*/}
                {/*</TouchableNativeFeedback>*/}
                <TouchableNativeFeedback>
                    <View style={[styles.items,{borderBottomWidth:1}]}>
                        <View style={styles.itemContainer}>
                            <View style={[styles.iconContainer,{backgroundColor:'#00c791'}]}>
                                <Icon name='ios-images' size={20} color='white'/>
                            </View>
                            <Text style={styles.itemText}>自动更新首页信息</Text>
                        </View>
                       <Switch value={this.props.globalConfig.autoUpdateImg} onValueChange={()=>this.changeGlobalConfig(3)}/>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={()=>navigate('Help')}>
                    <View style={[styles.items,{marginTop:15}]}>
                        <View style={styles.itemContainer}>
                            <View style={[styles.iconContainer,{backgroundColor:'#fa7bfc'}]}>
                                <Icon name='md-bulb' size={20} color='white'/>
                            </View>
                            <Text style={styles.itemText}>使用帮助</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>this.setState({modalVisible:true})}>
                    <View style={styles.items}>
                        <View style={styles.itemContainer}>
                            <View style={[styles.iconContainer,{backgroundColor:'#68b1ed'}]}>
                                <Icon name='ios-alarm' size={20} color='white'/>
                            </View>
                            <Text style={styles.itemText}>欢迎页</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={()=>navigate('Shuaichuan')}>
                    <View style={styles.items}>
                        <View style={styles.itemContainer}>
                            <View style={[styles.iconContainer,{backgroundColor:'#fd7e39'}]}>
                                <Icon name='md-text' size={20} color='white'/>
                            </View>
                            <Text style={styles.itemText}>帅川有话说</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>this.feedback()}>
                    <View style={[styles.items,{borderBottomWidth:1}]}>
                        <View style={styles.itemContainer}>
                            <View style={[styles.iconContainer,{backgroundColor:'#00e857'}]}>
                                <Icon name='md-clipboard' size={20} color='white'/>
                            </View>
                            <Text style={styles.itemText}>反馈</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={()=>{}}
                    animationType={'fade'}
                >
                    <Hello handlePress={()=>this.setState({modalVisible:false})}/>
                </Modal>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    aboutApp:{
        width:DeviceInfo.screenWidth,
        paddingVertical:20,
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
        fontSize:18,
        color:'black'
    },
    items:{
        width:DeviceInfo.screenWidth,
        paddingVertical:10,
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
        fontSize:15,
        marginLeft:15,
        color:'#333333',
        includeFontPadding:false
    },
    iconContainer:{
        width:23,
        height:23,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3
    }
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(rootServer,dispatch)
})
const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig
})

export default connect(mapStateToProps,mapDispatchToProps)(Settings)

