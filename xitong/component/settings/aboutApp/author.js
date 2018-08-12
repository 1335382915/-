/**
 * Created by qinchuan on 2017/10/3.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    WebView,
    Image,
    TouchableNativeFeedback,
    TouchableOpacity,
    StyleSheet,
    Linking
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as rootServer from '../../../server/rootServer';
import DeviceInfo from '../../../util/deviceInfo';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../../public/navigationBar';
const authorImg=require('../../../image/authorImg.jpg');
class Author extends Component{
    openUrl(type){
        let url='';
        switch(type){
            case 0:
                url='http://qinchuan.applinzi.com';
                break;
            case 1:
                url='https://github.com/1335382915';
                break;
            case 2:
                url='http://www.jianshu.com/u/bd6422604c60';
                break;
            default:
                break;
        }
        Linking.canOpenURL(url).then(supported=>{
            if(supported){
                Linking.openURL(url);
            }
        })
    }
    render(){
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        return (
            <View style={{flex:1,backgroundColor:'#eeeeee'}}>
                <NavigationBar title='关于作者' leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>
                <View style={styles.authorContainer}>
                    <View style={styles.authorImgContainer}>
                        <Image source={authorImg} style={{width:100,height:100,borderRadius:100}}/>
                    </View>
                    <Text style={[styles.introduce,{marginTop:10}]}>Hi，我叫Sunnychuan，一个小小的前端爱好者，</Text>
                    <Text style={styles.introduce}>在北京信威担任Web前端研发工程师，</Text>
                    <Text style={styles.introduce}>目前专注于移动端手机App的开发。</Text>
                </View>

                <TouchableNativeFeedback onPress={()=>this.openUrl(0)}>
                    <View style={[styles.items,{marginTop:30}]}>
                        <View style={styles.itemContainer}>
                            <View style={[styles.iconContainer,{backgroundColor:'#009bce'}]}>
                                <Icon name='md-globe' size={20} color='white'/>
                            </View>
                            <Text style={styles.itemText}>我的网站</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={22} color='#515152'/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>this.openUrl(1)}>
                    <View style={styles.items}>
                        <View style={styles.itemContainer}>
                            <View style={[styles.iconContainer,{backgroundColor:'#525252'}]}>
                                <Icon name='logo-github' size={20} color='white'/>
                            </View>
                            <Text style={styles.itemText}>Github</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={22} color='#515152'/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>this.openUrl(2)}>
                    <View style={[styles.items,{borderBottomWidth:1}]}>
                        <View style={styles.itemContainer}>
                            <View style={[styles.iconContainer,{backgroundColor:'#ff4747'}]}>
                                <Icon name='logo-javascript' size={20} color='white'/>
                            </View>
                            <Text style={styles.itemText}>技术博客</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={22} color='#515152'/>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    authorContainer:{
        width:DeviceInfo.screenWidth,
        height:250,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        elevation:2
    },
    authorImgContainer:{
        width:106,
        height:106,
        borderRadius:106,
        backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center'
    },
    introduce:{
        fontSize:14,
        color:'#333333',
        marginTop:4
    },items:{
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
    itemText: {
        fontSize: 15,
        marginLeft: 15,
        color: '#333333',
        includeFontPadding: false
    },
    iconContainer:{
        width:22,
        height:22,
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

export default connect(mapStateToProps,mapDispatchToProps)(Author)