/**
 * Created by qinchuan on 2017/10/1.
 */
import {StackNavigator} from 'react-navigation';
import IndexPage from './component/index';
import TestPage from './component/test';
import AboutApp from './component/settings/aboutApp/index';
import Author from './component/settings/aboutApp/author';
import ThemeChoice from './component/settings/themeChoice';
import Music from './component/our/music/index';
import Panel from './component/our/music/panel';
import Image from './component/our/image/index';
import TimeLine from './component/our/timeLine/index';
import MemoryDay from './component/our/memoryDay/index';
import MeomryDayDetail from './component/our/memoryDay/memoryDayDetail';
import Map from './component/our/map/index';
import Heart from './component/our/heart/index';
import Daughter from './component/our/daughter/index';
import Help from './component/settings/help';
import Shuaichuan from './component/settings/shuaichuan';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
export default Navigation=StackNavigator({
    Index:{
        screen:IndexPage
    },
    Test:{
        screen:TestPage
    },
    AboutApp:{
        screen:AboutApp
    },
    Author:{
        screen:Author
    },
    ThemeChoice:{
        screen:ThemeChoice
    },
    Panel:{
        screen:Panel
    },
    Music:{
        screen:Music
    },
    Image:{
        screen:Image
    },
    TimeLine:{
        screen:TimeLine
    },
    MemoryDay:{
        screen:MemoryDay
    },
    MemoryDayDetail:{
        screen:MeomryDayDetail
    },
    Map:{
        screen:Map
    },
    Heart:{
        screen:Heart
    },
    Daughter:{
        screen:Daughter
    },
    Help:{
        screen:Help
    },
    Shuaichuan:{
        screen:Shuaichuan
    }
},{
    transitionConfig: (() => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })),
    navigationOptions:{
        header:null
    }
});