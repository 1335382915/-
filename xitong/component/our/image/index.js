/**
 * Created by qinchuan on 2017/11/4.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    FlatList,
    CameraRoll,
    Image,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ourServer from '../../../server/ourServer';
import Swiper from 'react-native-swiper';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {QCImgList,QCSImgList,LAImgList,LASImgList,YQImgList,YQSImgList} from '../../../data/imgData';
import * as config from '../../../util/config';
import DeviceInfo from '../../../util/deviceInfo';
import NavigationBar from '../../public/navigationBar';
import FastImage from 'react-native-fast-image';
import RNFetchBlob from 'react-native-fetch-blob';
import ActionSheet from 'react-native-actionsheet';

const IMG_TYPE={
    QC:1,
    LA:2,
    YQ:3
}
const options = [ '取消', '保存到相册']
const title = '喜欢这张照片吗？'

class OurImage extends Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible:false,
            photoList:[],
            currentIndex:null
        }
    }

    openPhotoModal(index,type){
        let photoList=[];
        switch(type){
            case IMG_TYPE.QC:
                photoList=QCImgList;
                break;
            case IMG_TYPE.LA:
                photoList=LAImgList;
                break;
            case IMG_TYPE.YQ:
                photoList=YQImgList;
                break;
            default:
                break;
        }
        this.setState({
            currentIndex:index,
            photoList,
            modalVisible:true
        })
    }

    closePhotoModal(){
        this.setState({
            modalVisible:false
        })
    }
    _renderImgList(item,index,type){
        let width=DeviceInfo.screenWidth/4;
        return (
            <TouchableOpacity style={{width,height:width}} onPress={()=>this.openPhotoModal(index,type)}>
                <FastImage source={{uri:config.imgBashPath+item.path}} style={{width,height:width}}/>
            </TouchableOpacity>
        )
    }

    renderBigImg(){
        let imgList=[];
        this.state.photoList.map((item,index)=>{
            imgList.push(
                <TouchableOpacity key={index} activeOpacity={1} onPress={()=>this.closePhotoModal()} onLongPress={()=>this.showAction()}>
                    <FastImage source={{uri:item.url}} style={styles.imgStyle} resizeMode={FastImage.resizeMode.center}/>
                </TouchableOpacity>
            )
        })
        return imgList
    }

    showAction(){
        this.ActionSheet.show()
    }

    handlePress(index){
        if(index==1){
            this._onSave();
        }
    }
    _onSave(){
        let img=this.state.photoList[this.state.currentIndex].url;
        let nameList=img.split('/');
        let name=nameList[nameList.length-1];
        let dirs=RNFetchBlob.fs.dirs;
        RNFetchBlob.fs.exists(dirs.DCIMDir+"/汐彤的小家").then((exist)=>{
            if(!exist){
                RNFetchBlob.fs.mkdir(dirs.DCIMDir+'/汐彤的小家').then(()=>{
                    RNFetchBlob.config({
                        fileCache:true,
                        //path : dirs.DCIMDir+"/汐彤的小家/"+name,
                        addAndroidDownloads:{
                            useDownloadManager:true,
                            path : dirs.DCIMDir+"/汐彤的小家/"+name,
                            //mime:'image/jpg',
                            title:name
                        }
                    }).fetch('GET',img).then(res=>{
                        ToastAndroid.show('保存成功',ToastAndroid.SHORT);
                    })
                });
            }
            else{
                RNFetchBlob.config({
                    fileCache:true,
                    //path : dirs.DCIMDir+"/汐彤的小家/"+name,
                    addAndroidDownloads:{
                        useDownloadManager:true,
                        path : dirs.DCIMDir+"/汐彤的小家/"+name,
                        //mime:'image/jpg',
                        title:name
                    }
                }).fetch('GET',img).then(res=>{
                    ToastAndroid.show('保存成功',ToastAndroid.SHORT);
                })
            }

        })
    }

    render() {
        let leftBtn=(
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color='white'/>
            </TouchableOpacity>
        )
        return (
            <View style={{flex:1}}>
                <NavigationBar title='我们的照片' leftBtn={leftBtn} backgroundColor={this.props.globalConfig.themeColor}/>
                <ScrollableTabView
                    initialPage={0}
                    tabBarUnderlineStyle={{height:2,backgroundColor:this.props.globalConfig.themeColor}}
                    //文字垂直居中
                    tabBarTextStyle={{marginTop:10}}
                    tabBarBackgroundColor='white'
                    tabBarActiveTextColor={this.props.globalConfig.themeColor}

                >
                    <FlatList
                        tabLabel="帅川"
                        data={QCSImgList}
                        renderItem={({item,index})=>this._renderImgList(item,index,IMG_TYPE.QC)}
                        keyExtractor={(item,index)=>index}
                        numColumns={4}
                    />
                    <FlatList
                        tabLabel="萌昂"
                        data={LASImgList}
                        renderItem={({item,index})=>this._renderImgList(item,index,IMG_TYPE.LA)}
                        keyExtractor={(item,index)=>index}
                        numColumns={4}
                    />
                    <FlatList
                        tabLabel="我们"
                        data={YQSImgList}
                        renderItem={({item,index})=>this._renderImgList(item,index,IMG_TYPE.YQ)}
                        keyExtractor={(item,index)=>index}
                        numColumns={4}
                    />
                </ScrollableTabView>
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={()=>{}}
                    animationType='fade'
                >
                    {/*<ImageViewer
                        imageUrls={this.state.photoList}
                        index={this.state.currentIndex}
                        loadingRender={()=><ActivityIndicator size={'large'} color={this.props.globalConfig.themeColor}/>}
                        onClick={()=>this.closePhotoModal()}
                        onDoubleClick={()=>this.closePhotoModal()}
                        onSave={()=>this._onSave()}
                        onChange={(index)=>this._onChange(index)}
                    />*/}
                    <TouchableOpacity activeOpacity={1} style={styles.photoContainer} onPress={()=>this.closePhotoModal()}>
                        <View style={styles.textContainer}>
                            <Text style={{color:'white'}}>{this.state.currentIndex+1} / {this.state.photoList.length}</Text>
                        </View>
                        <View style={styles.banner}>
                            <Swiper
                                style={styles.imgStyle}
                                autoplay={false}
                                showsPagination={false}
                                loop={false}
                                index={this.state.currentIndex}
                                onIndexChanged={(index)=>this.setState({currentIndex:index})}
                                loadMinimal={true}
                                loadMinimalLoader={<ActivityIndicator color={this.props.globalConfig.themeColor} size='large'/>}
                            >
                                {this.renderBigImg()}
                            </Swiper>
                            <ActionSheet
                                ref={o => this.ActionSheet = o}
                                title={title}
                                options={options}
                                cancelButtonIndex={0}
                                destructiveButtonIndex={1}
                                onPress={(index)=>this.handlePress(index)}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    banner:{
        width:DeviceInfo.screenWidth,
        minHeight:DeviceInfo.screenWidth,
        backgroundColor:'transparent',
        alignItems:'center'
    },

    photoContainer:{
        flex:1,
        backgroundColor:'black',
        justifyContent:'center'
    },

    imgStyle:{
        width:DeviceInfo.screenWidth,
        height:DeviceInfo.screenWidth,
    },
    textContainer:{
        width:DeviceInfo.screenWidth,
        position:'absolute',
        top:30,
        alignItems:'center'
    }
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(ourServer,dispatch)
})
const mapStateToProps=(state)=>({
    globalConfig:state.rootReducer.globalConfig
})

export default connect(mapStateToProps,mapDispatchToProps)(OurImage)