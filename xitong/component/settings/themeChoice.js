/**
 * Created by qinchuan on 2017/10/6.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    ScrollView,
    FlatList,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../public/navigationBar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as rootServer from '../../server/rootServer';
class ThemeChoice extends Component{
    constructor(props){
        super(props);
        this.state={
            colorList:['#68b1ed','#ff3737','#e85200','#ff8500','#ffd500','#00b61d','#32cd32','#9acd32','#52006d','#fe2c76','#ff5a5a','#ea8080','#dbbc90','#029ba9','#6a5acd','#000000','#7d7d7d']
        }
    }
    _renderColor(item,index){
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.colorList,{backgroundColor:item}]}
                onPress={()=>this.choiceColor(index)}
            ></TouchableOpacity>
        )
    }
    choiceColor(index){
        const actions=this.props.navigation.state.params.actions;
        AsyncStorage.getItem('globalConfig').then(data=>{
            data=JSON.parse(data);
            data.themeColor=this.state.colorList[index];
            AsyncStorage.setItem('globalConfig',JSON.stringify(data)).then(()=>{
                actions.setGlobalConfig(data,()=>{
                    ToastAndroid.show('主题颜色设置成功',ToastAndroid.SHORT)
                });
            })
        })
    }
    componentDidMount(){

    }
    render(){
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        return (
            <View style={{flex:1,backgroundColor:'#eeeeee'}}>
                <NavigationBar title='主题颜色' leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={[styles.colorDisplay,{backgroundColor:this.props.globalConfig.themeColor}]}>
                        <Text style={{fontSize:35,color:'white',fontWeight:'bold'}}>X T</Text>
                    </View>
                </ScrollView>
                <View style={{backgroundColor:'white'}}>
                    <FlatList
                        data={this.state.colorList}
                        renderItem={({item,index})=>this._renderColor(item,index)}
                        keyExtractor={(item,index)=>index}
                        horizontal
                    />
                </View>
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
    colorList:{
        width:50,
        height:50,
        borderRadius:7,
        marginHorizontal:10,
        marginVertical:10
    },
    colorDisplay:{
        width:100,
        height:100,
        borderRadius:100,
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

export default connect(mapStateToProps,mapDispatchToProps)(ThemeChoice)