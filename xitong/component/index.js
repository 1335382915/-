/**
 * Created by qinchuan on 2017/10/1.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Button,
    AsyncStorage,
    Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './home/index';
import * as rootServer from '../server/rootServer';
import Settings from './settings/index';
import Our from './our/index';
import Emotion from './emotion/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Hello from './hello';

class Index extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedTab:'home',
            initConfigFinished:false,
            helloEnd:false,
            firstOpen:true
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('globalConfig').then(data=>{
            if(data){
                this.props.actions.setGlobalConfig(JSON.parse(data),()=>{
                    setTimeout(()=>{
                        this.setState({
                            initConfigFinished:true,
                            firstOpen:false
                        })
                    },3000)
                })
            }
            //第一次打开应用
            else{
                let globalConfig={
                    themeColor:'#68b1ed',
                    nightMode:false,
                    openPassword:true,
                    autoUpdateImg:true
                };
                AsyncStorage.setItem('globalConfig',JSON.stringify(globalConfig)).then(()=>{
                    this.props.actions.setGlobalConfig(globalConfig,()=>{
                        setTimeout(()=>{
                            this.setState({
                                initConfigFinished:true,
                                firstOpen:true
                            })
                        },3000)
                    })
                })
            }
        })
    }
    renderTabContainer(selectedTab,title,iconName,Component,onPress){
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                selectedTitleStyle={{color:this.props.globalConfig.themeColor}}
                renderIcon={() =>  <Icon name={iconName} size={25} color="#515152"/>}
                renderSelectedIcon={() => <Icon name={iconName} size={25} color={this.props.globalConfig.themeColor}/>}
                onPress={onPress}>
                <Component navigation={this.props.navigation}/>
            </TabNavigator.Item>
        )
    }
    render(){

        // else{
        //     return (
        //         <View style={{flex:1}}>
        //             <Hello handlePress={()=>this.setState({helloEnd:true})}/>
        //         </View>
        //     )
        // }
        if(this.state.initConfigFinished){
            if(!this.state.firstOpen){
                return (
                    <View style={{flex:1}}>
                        <TabNavigator tabBarStyle={{backgroundColor:'white'}} tabBarShadowStyle={{width:0}} hidesTabTouch>
                            {this.renderTabContainer('home','首页','ios-home',Home,()=>this.setState({selectedTab:'home'}))}
                            {this.renderTabContainer('emotion','天气','ios-sunny',Emotion,()=>this.setState({selectedTab:'emotion'}))}
                            {this.renderTabContainer('our','我们','md-heart',Our,()=>this.setState({selectedTab:'our'}))}
                            {this.renderTabContainer('settings','设置','ios-settings',Settings,()=>this.setState({selectedTab:'settings'}))}
                        </TabNavigator>
                    </View>
                )
            }
            else{
                return (
                    <View style={{flex:1}}>
                        <Hello handlePress={()=>this.setState({helloEnd:true,firstOpen:false})}/>
                    </View>
                )
            }
        }
        else{
            return (
                //icon1  150 150
                <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../image/icon_final.png')} style={{width:150,height:150}}/>
                    <Text style={{fontSize:25,marginTop:50,color:'#666666'}}>汐彤爸妈的点点滴滴</Text>
                </View>
            )
        }
    }
}

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(rootServer,dispatch)
})
const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig
})

export default connect(mapStateToProps,mapDispatchToProps)(Index)