/**
 * Created by qinchuan on 2017/11/23.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../public/navigationBar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class Help extends Component{
    render(){
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <NavigationBar title='使用帮助' leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>

                <ScrollView style={{backgroundColor:'white',paddingHorizontal:15}}>
                    <Text style={styles.title}>首页</Text>
                    <Text style={styles.content}>我挑选了帅川最最最最帅以及萌昂最最最最美的几张照片展示在首页上。除此之外，你每天都可以看到不一样的问候语和生活小贴士。这些信息每天都会自动更新，你可以在设置里取消自动更新。所有的图片都存放在了网络服务器上，如果你发现图片加载特别慢，请耐心等待~</Text>
                    <Text style={styles.title}>天气</Text>
                    <Text style={styles.content}>你可以在这里查看北京和日本各个地区的天气，包括：今日的温度、天气、降水量、风力；未来六天的天气预报；生活指数（仅限北京）；近七天最高（低）气温变化折线图。你可以通过左侧菜单切换城市。</Text>
                    <Text style={styles.title}>我们</Text>
                    <Text style={styles.content}>哎呀，这个地方可是花费了我大量精力呢。“我们”记录了我们在一起之后的点点滴滴；你可以在“音乐”中聆听我们一起听过的歌曲；在“照片”中查看各个阶段的帅川和萌昂的照片（在大图中长按可以保存呦~）；在“时光中”回忆我们经历的种种；在“纪念日”中回味着那些刻骨铭心的日子；在“足迹”中查看我们曾经到过的地方，做过的事；“内心”表达了帅川想要和你说的话。最后，我们的“女儿”也有话要和你说呢~</Text>
                    <Text style={styles.title}>设置</Text>
                    <Text style={[styles.content,{marginBottom:20}]}>“主题颜色”可以设置应用的主体颜色，默认是天蓝色，你最喜欢的颜色~。如果你不希望首页的信息每天都自动更新，可以把“自动更新首页信息”关掉。“使用帮助”说明了整个应用每个功能的使用方法。想要再来访问一下欢迎页？点击“欢迎页”即可。别忘了查看“帅川有话说”，别忘了查看“帅川有话说”，别忘了查看“帅川有话说”，嗯~。最后，你有什么问题想要反馈的（或者有想买的东西），欢迎点击“反馈”来短信骚扰我~</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:18,
        color:'#333333',
        marginTop:20
    },
    content:{
        //flex:1,
        fontSize:16,
        color:'#666666',
        lineHeight:25
    }
})

const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig
})

export default connect(mapStateToProps)(Help)