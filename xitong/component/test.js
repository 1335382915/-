/**
 * Created by qinchuan on 2017/10/1.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Button
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as testServer from '../server/testServer';
import Icon from 'react-native-vector-icons/Ionicons';
class Test extends Component{
    changeName(){
        this.props.actions.testFunc('sunnychuan',()=>{
            alert(this.props.name);
        });
    }
    render(){
        return (
            <View>
                <TouchableOpacity onPress={()=>this.changeName()} style={styles.btn}>
                    <Text>click</Text>
                </TouchableOpacity>
                <Text>{this.props.name}</Text>
                <Icon name="md-add" size={21}/>
                <Button title="back" onPress={()=>this.props.navigation.goBack()}/>
            </View>
        )
    }

}

const styles=StyleSheet.create({
    btn:{
        width:100,
        height:30,
        backgroundColor:'#68b1ed'
    }
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(testServer,dispatch)
})
const mapStateToProps=(state)=>({
    name:state.testReducer.name
})

export default connect(mapStateToProps,mapDispatchToProps)(Test)