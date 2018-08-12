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
    ImageBackground
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ourServer from '../../../server/ourServer';
import Icon from 'react-native-vector-icons/Ionicons';
import * as config from '../../../util/config';
import DeviceInfo from '../../../util/deviceInfo';
import NavigationBar from '../../public/navigationBar';

class Daughter extends Component{
    constructor(props){
        super(props);

    }
    render(){
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        return (
            <View style={{flex:1,backgroundColor:'#eeeeee'}}>
                <NavigationBar title='我们的女儿' leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>
                {/*<ImageBackground source={{uri:config.imgBashPath+'zcytz2.jpg'}} style={{flex:1,backgroundColor:'white',paddingHorizontal:15,paddingTop:20}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={{uri:config.imgBashPath+'yq9.JPG'}} style={{width:100,height:100,borderRadius:100,marginRight:15}}/>
                        <Text style={{color:'white',flex:1,fontSize:18}}>
                            大家好，我叫秦汐彤~我将在三年后出生。有没有小帅哥想要和我成为朋友呢？嘻嘻嘻。我来介绍一下我的爸爸和妈妈吧~
                        </Text>
                    </View>
                    <Text style={{color:'white',fontSize:18}}>
                        我的爸爸是一个大大大大大大帅哥，他很厉害的，能够做出各种各样的软件。我的妈妈是一个大大大大大大美女，又温柔又美丽，而且，她的日语很厉害的！
                    </Text>
                    <Text style={{color:'white',fontSize:18}}>
                        看咱家彤彤，是不是很调皮可爱~~~我们一起见证着她的成长，直到她成家立业。到时候我们就退休去旅行，走遍大江南北，去欣赏所有有你在的风景。等到老了，我拄着拐杖，依旧拉着你的手，回到我们的高中，重新温习一遍我们相遇的场景。我想，我这一生已经幸福足矣。
                    </Text>
                </ImageBackground>*/}
                <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.6)',paddingHorizontal:15,paddingTop:20}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={{uri:config.imgBashPath+'yq9.JPG'}} style={{width:100,height:100,borderRadius:100,marginRight:15}}/>
                        <Text style={{color:'white',flex:1,fontSize:18,lineHeight:28}}>
                            大家好，我叫秦汐彤~我将在三年后出生。有没有小帅哥想要和我成为朋友呢？嘻嘻嘻。我来介绍一下我的爸爸和妈妈吧~
                        </Text>
                    </View>
                    <Text style={{color:'white',fontSize:18,lineHeight:28}}>
                        我的爸爸是一个大大大大大大帅哥，他很厉害的，能够做出各种各样的软件。我的妈妈是一个大大大大大大美女，又温柔又美丽，而且，她的日语很厉害的！
                    </Text>
                    <Text style={{color:'white',fontSize:18,lineHeight:28}}>
                        看咱家彤彤，是不是很调皮可爱~~~我们一起见证着她的成长，直到她成家立业。到时候我们就退休去旅行，走遍大江南北，去欣赏所有有你在的风景。等到老了，我拄着拐杖，依旧拉着你的手，回到我们的高中，重新温习一遍我们相遇的场景。我想，我这一生已经幸福足矣。
                    </Text>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({

})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(ourServer,dispatch)
})
const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig,
})

export default connect(mapStateToProps,mapDispatchToProps)(Daughter)