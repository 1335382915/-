/**
 * Created by qinchuan on 2017/10/1.
 */
import * as types from '../action/actionType';
const initState={
    musicState:{
        songs: [],   //数据源
        playModel:1,  // 播放模式  1:列表循环    2:随机    3:单曲循环
        btnModel:require('../component/our/music/image/liebiaoxunhuan.png'), //播放模式按钮背景图
        pic_small:'',    //小图
        pic_big:'',      //大图
        file_duration:0,    //歌曲长度
        title:'',       //歌曲名字
        author:'',      //歌曲作者
        sliderValue: 0,    //Slide的value
        pause:false,       //歌曲播放/暂停
        currentTime: 0.0,   //当前时间
        duration: 0.0,     //歌曲时间
        currentIndex:0,    //当前第几首
        isplayBtn:require('../component/our/music/image/bofang.png')  //播放/暂停按钮背景图
    },
    musicConfig:{
        Sound:null,
        currentMusic:null,
        timer:null,
    }
}
export default ourReducer=(state=initState,action)=>{
    switch(action.type){
        case types.OURACTION.SET_MUSIC_STATE:{
            return Object.assign({},state,{
                musicState:action.musicState
            })
        }

        case types.OURACTION.SET_MUSIC_CONFIG:{
            return Object.assign({},state,{
                musicConfig:action.musicConfig
            })
        }
        default: return state;
    }
}