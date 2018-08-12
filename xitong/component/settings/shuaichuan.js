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
class Shuaichuan extends Component{
    render(){
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <NavigationBar title='帅川有话说' leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>

                <ScrollView style={{backgroundColor:'white',paddingHorizontal:15}}>
                    <Text style={styles.content}>咳咳，本来想把这个页面弄得花里胡哨一点，后来一想还是算了吧（马山就要到你生日了，时间很赶很赶啊！！！还有一些bug没改呢！！！）。这个app是我花费了整整两个月做出来的（从国庆开始到你生日前几天）。这一段时间我也是够辛苦的，忙了一天的工作后，晚上9点到家赶紧动起手来，可以说一整天都在和代码打交道。不过，只要是为了你，再累也值得~</Text>
                    <Text style={styles.content}>我们在一起大概有7年了吧，仔细想一想这7年发生了很多事情，我们彼此都有了成长。曾经小屁孩似的对你说的想要和你一生一世，现在变成了让我恪守一生的誓言。随着年龄的增长，经历的磨难，我更加确信：爱，不只是随便说说。</Text>
                    <Text style={styles.content}>不知道你对咱家彤彤这个名字喜不喜欢，我可是很喜欢呢，就连你的微信备注都变成了“彤彤的妈妈”~当然，这都是我自己对我们未来的向往，每天晚上和“彤彤妈”道完晚安后，第二天早上我都有了动力去努力工作。</Text>
                    <Text style={styles.content}>你在日本过得还好吗？虽说还是和大学那样一年回来两回，可我还是很想很想你呢~你在那边也很忙吧，各种考试，一个人在外要好好照顾自己，别乱吃东西，特别是姨妈期的时候。好好学习，将来回国能找一个好工作，毕竟我昂这么厉害！老公一直在等着你回来呢，这三年我也会努力努力再努力。我们都要为了我们的未来奋斗着~</Text>
                    <Text style={[styles.content,{marginBottom:20}]}>哎呀，我发现我也不怎么会说情话了，感觉自己没有以前浪漫了，这是即将要变成大叔的节奏？哎。今天是你的生日，也是一年365天最重要的一天，我家小公举越来越美丽可爱了~生日快乐，别给舍友看噢~我爱你~ლ(′◉❥◉｀ლ)</Text>
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
        lineHeight:25,
        marginTop:15
    }
})

const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig
})

export default connect(mapStateToProps)(Shuaichuan)