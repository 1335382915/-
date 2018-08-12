/**
 * Created by qinchuan on 2017/11/8.
 */
import {colorReverse, dateDiff, birthDayDiff} from '../util/publicFunc';
import * as config from '../util/config';
let currentDate=new Date();
const formatDate=(date)=>{
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
}
let currentDateStr=formatDate(currentDate);
export const memoryDayData=[
    {
        day:'2010-10-19',
        name:'我们的纪念日',
        type:0,
        daysLeft:dateDiff('2010-10-19',currentDateStr),
        imgPath:config.imgBashPath+'jinianri1.jpg'
    },
    {
        day:'*-12-8',
        name:'萌昂的生日',
        type:1,
        daysLeft:birthDayDiff('*-12-8',currentDateStr).daysLeft,
        goalDay:birthDayDiff('*-12-8',currentDateStr).goalDay,
        imgPath:config.imgBashPath+'yinghua.jpg'
    },
    {
        day:'*-12-13',
        name:'帅川的生日',
        type:2,
        daysLeft:birthDayDiff('*-12-13',currentDateStr).daysLeft,
        goalDay:birthDayDiff('*-12-13',currentDateStr).goalDay,
        imgPath:config.imgBashPath+'fengye.jpg'
    },
    {
        day:'2010-10-19',
        name:'我们第一次接吻',
        type:3,
        daysLeft:dateDiff('2010-10-19',currentDateStr),
        imgPath:config.imgBashPath+'weimei.jpg'
    },
    {
        day:'2010-10-19',
        name:'我们第一次拥抱',
        type:4,
        daysLeft:dateDiff('2010-10-19',currentDateStr),
        imgPath:config.imgBashPath+'xingkong.jpg'
    },
    {
        day:'2015-4-29',
        name:'我们第一次旅行',
        type:5,
        daysLeft:dateDiff('2015-4-29',currentDateStr),
        imgPath:config.imgBashPath+'hai1.jpg'
    },
    {
        day:'2015-4-8',
        name:'决定要给你幸福的未来',
        type:6,
        daysLeft:dateDiff('2015-4-8',currentDateStr),
        imgPath:config.imgBashPath+'samo2.jpg'
    }
]