/**
 * Created by qinchuan on 2017/10/1.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import DeviceInfo from '../../util/deviceInfo';
export default class NavigationBar extends Component{
    static propTypes={
        backgroundColor:React.PropTypes.string.isRequired,
        title:React.PropTypes.string.isRequired,
        titleColor:React.PropTypes.string.isRequired,
        leftBtn:React.PropTypes.element,
        rightBtn:React.PropTypes.element
    }
    static defaultProps={
        backgroundColor:'#68b1ed',
        title:'',
        titleColor:'white',
        leftBtn:null,
        rightBtn:null
    }
    render(){
        let LeftBtn=this.props.leftBtn?this.props.leftBtn:null;
        let RightBtn=this.props.rightBtn?this.props.rightBtn:null;
        return (
            <View style={[styles.container,{backgroundColor:this.props.backgroundColor},this.props.customStyle]}>
                <View style={styles.tempBtn}>
                    {LeftBtn}
                </View>
                <Text style={[styles.title,{color:this.props.titleColor}]}>{this.props.title}</Text>
                <View style={styles.tempBtn}>
                    {RightBtn}
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        width:DeviceInfo.screenWidth,
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {height: 2, width: 1},
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation:3
    },
    tempBtn:{
        width:50,
        height:50,
        justifyContent:'center',
        paddingHorizontal:15
    },
    title:{
        fontSize:17
    }
})