/**
 * Created by qinchuan on 2017/10/1.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage
} from 'react-native';
import thunkMiddleware from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import reducers from './reducer/index';
import {Provider} from 'react-redux';
import NavigationStack from './navigationConfig';
import Orientation from 'react-native-orientation';
const store=createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
)
export default class Index extends Component{
    componentWillMount() {
        const initial = Orientation.getInitialOrientation();
        Orientation.lockToPortrait();
    }
    render(){
        return (
            <Provider store={store}>
               <View style={{flex:1}}>
                   <NavigationStack/>
               </View>
            </Provider>
        )
    }
}