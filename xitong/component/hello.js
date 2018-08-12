/**
 * Created by qinchuan on 2017/11/26.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
Button,
    StyleSheet
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Hello extends Component{
    handlePress(){
        this.props.handlePress && this.props.handlePress();
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <Swiper style={{flex:1}} loop={false} activeDotColor='#68b1ed'>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.btnTop}></TouchableOpacity>
                        <Image source={require('../image/gif/1.jpeg')} style={{width:150,height:150}}/>
                        <Text style={styles.textTop}>诗句</Text>
                        <Text style={styles.textBottom}>候鸟过境时的雨，四季断流时的绿</Text>
                        <Text style={styles.textBottom}>当未知的变成规律，让我做你的诗句</Text>
                        <TouchableOpacity style={[styles.btnBottom,{borderColor:'white'}]}></TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.btnTop}></TouchableOpacity>
                        <Image source={require('../image/gif/11.jpeg')} style={{width:150,height:150}}/>
                        <Text style={styles.textTop}>失语</Text>
                        <Text style={styles.textBottom}>世上有万千质疑，往彼此深处逃离</Text>
                        <Text style={styles.textBottom}>在所有误解里，你是最美妙的失语</Text>
                        <TouchableOpacity style={[styles.btnBottom,{borderColor:'white'}]}></TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.btnTop}></TouchableOpacity>
                        <Image source={require('../image/gif/15.jpeg')} style={{width:150,height:150}}/>
                        <Text style={styles.textTop}>意义</Text>
                        <Text style={styles.textBottom}>你是存疑的真理，忽而难测的失去</Text>
                        <Text style={styles.textBottom}>当这一切不明不义，你成为我的意义</Text>
                        <TouchableOpacity style={[styles.btnBottom,{borderColor:'white'}]}></TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.btnTop}></TouchableOpacity>
                        <Image source={require('../image/gif/18.jpeg')} style={{width:150,height:150}}/>
                        <Text style={styles.textTop}>秘密</Text>
                        <Text style={styles.textBottom}>在春天的酒瓶里，在波心的闪现里</Text>
                        <Text style={styles.textBottom}>你我之间的秘密，被时光藏起</Text>
                        <TouchableOpacity style={styles.btnBottom} onPress={()=>this.handlePress()}>
                            <Text style={{fontSize:16,color:'#68b1ed'}}>立即体验</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
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
    textTop:{
        fontSize:20,
        color:'#333333',
        marginTop:15,
        marginBottom:5
    },
    textBottom:{
        fontSize:15,
        color:'#666666',
        marginTop:5
    },
    btnTop:{
        width:100,
        height:30,
        marginBottom:20,
        borderWidth:1,
        borderColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    btnBottom:{
        width:100,
        height:30,
        marginTop:30,
        borderWidth:1,
        borderColor:'#68b1ed',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    }
})