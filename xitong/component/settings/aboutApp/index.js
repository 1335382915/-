/**
 * Created by qinchuan on 2017/10/3.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as rootServer from '../../../server/rootServer';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from '../../../util/deviceInfo';
import NavigationBar from '../../public/navigationBar';
//icon1
//icon_1
const icon=require('../../../image/icon_final.png');
class AboutApp extends Component{
    constructor(props){
        super(props);
    }
    goToAuthor(){
        const {navigate}=this.props.navigation;
        navigate('Author',{navigation:this.props.navigation});
    }
    showIntroduce(){
        Alert.alert('简介','记录汐彤爸妈的点点滴滴。',[{
            text:'确定',onPress:()=>{}
        }])
    }
    showThanks(){
        Alert.alert('致谢','感谢老婆的不杀之恩！',[{
            text:'确定',onPress:()=>{}
        }]);
    }
    render(){
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        return (
            <View style={{flex:1,backgroundColor:'#eeeeee'}}>
                <NavigationBar title='关于汐彤的小家' leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>
                <View style={styles.appContainer}>
                    <Image source={icon} style={{width:55,height:55}}/>
                    <Text style={styles.appText}>汐彤的小家</Text>
                    <Text style={styles.versionText}>版本 v1.0</Text>
                </View>

                <TouchableNativeFeedback onPress={()=>this.showIntroduce()}>
                    <View style={styles.items}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>简介</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={22} color='#515152'/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>this.showThanks()}>
                    <View style={styles.items}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>致谢</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={22} color='#515152'/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>this.goToAuthor()}>
                    <View style={[styles.items,{borderBottomWidth:1}]}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>关于作者</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={22} color='#515152'/>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    appContainer:{
        width:DeviceInfo.screenWidth,
        height:200,
        justifyContent:'center',
        alignItems:'center'
    },
    appText:{
        fontSize:18,
        color:'#333333',
        marginTop:10
    },
    versionText:{
        fontSize:13,
        color:'#515152'
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
        color:'#333333',
        includeFontPadding:false
    },
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(rootServer,dispatch)
})
const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig
})

export default connect(mapStateToProps,mapDispatchToProps)(AboutApp)