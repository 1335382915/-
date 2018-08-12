/**
 * Created by qinchuan on 2017/10/2.
 */
export const getDate=()=>{
    let date=new Date();
    let year=date.getFullYear();
    let month=(date.getMonth()+1).toString();
    month=month.length==2?month:'0'+month;
    let day=date.getDate().toString();
    day=day.length==2?day:'0'+day;
    return `${year}-${month}-${day}`;
}

export const colorReverse=(OldColorValue)=>{
    OldColorValue="0x"+OldColorValue.replace(/#/g,"");
    var str="000000"+(0xFFFFFF-OldColorValue).toString(16);
    return '#'+str.substring(str.length-6,str.length);
}

const calculateDif=(year1,month1,days1,year2,month2,days2)=>{
    return (Math.floor((new Date(year2,month2-1,days2).getTime()-new Date(year1,month1-1,days1).getTime())/(1000*60*60*24)))
}



export const birthDayDiff=(sDate1, sDate2)=>{    //sDate1和sDate2是2002-12-18格式
    sDate1=sDate1.split('-');
    sDate2=sDate2.split('-');
    let year1=sDate2[0];
    let year2=sDate2[0];
    let month1=sDate1[1];
    let month2=sDate2[1];
    let days1=sDate1[2];
    let days2=sDate2[2];
    let tempDate=calculateDif(year1,month1,days1,year2,month2,days2);
    if(tempDate<0){
        month2=sDate1[1];
        days2=sDate1[2];
        month1=sDate2[1];
        days1=sDate2[2];
        // console.log(year1+'/'+month1+'/'+days1);
        // console.log(year2+'/'+month2+'/'+days2);
    }
    if(tempDate>0){
        year2=parseInt(year2)+1;
        month2=sDate1[1];
        days2=sDate1[2];
        month1=sDate2[1];
        days1=sDate2[2];
        // console.log(year1+'/'+month1+'/'+days1);
        // console.log(year2+'/'+month2+'/'+days2);
    }
    return {
        goalDay:year2+'-'+month2+'-'+days2,
        daysLeft:calculateDif(year1,month1,days1,year2,month2,days2)
    };
}

export const dateDiff=(sDate1, sDate2)=>{    //sDate1和sDate2是2002-12-18格式
    // let date1=new Date(sDate1);
    // let date2=new Date(sDate2);
    // alert(date1.getTime());
    // let days=date2.getTime()-date1.getTime();
    // return parseInt(days / (1000 * 60 * 60 * 24));
    sDate1=sDate1.split('-');
    sDate2=sDate2.split('-');
    let year1=sDate1[0];
    let year2=sDate2[0];
    let month1=sDate1[1];
    let month2=sDate2[1];
    let days1=sDate1[2];
    let days2=sDate2[2];
    return calculateDif(year1,month1,days1,year2,month2,days2);
}

export const weatherCodeToImg=(code)=>{
    switch(code){
        case 100:
            return 'https://cdn.heweather.com/cond_icon/100.png';
            break;
        case 101:
            return 'https://cdn.heweather.com/cond_icon/101.png';
            break;
        case 102:
            return 'https://cdn.heweather.com/cond_icon/102.png';
            break;
        case 103:
            return 'https://cdn.heweather.com/cond_icon/103.png';
            break;
        case 104:
            return 'https://cdn.heweather.com/cond_icon/104.png';
            break;
        case 200:
            return 'https://cdn.heweather.com/cond_icon/200.png';
            break;
        case 201:
            return 'https://cdn.heweather.com/cond_icon/201.png';
            break;
        case 202:
            return 'https://cdn.heweather.com/cond_icon/202.png';
            break;
        case 203:
            return 'https://cdn.heweather.com/cond_icon/203.png';
            break;
        case 204:
            return 'https://cdn.heweather.com/cond_icon/204.png';
            break;
        case 205:
            return 'https://cdn.heweather.com/cond_icon/205.png';
            break;
        case 206:
            return 'https://cdn.heweather.com/cond_icon/206.png';
            break;
        case 207:
            return 'https://cdn.heweather.com/cond_icon/207.png';
            break;
        case 208:
            return 'https://cdn.heweather.com/cond_icon/208.png';
            break;
        case 209:
            return 'https://cdn.heweather.com/cond_icon/209.png';
            break;
        case 210:
            return 'https://cdn.heweather.com/cond_icon/210.png';
            break;
        case 211:
            return 'https://cdn.heweather.com/cond_icon/211.png';
            break;
        case 212:
            return 'https://cdn.heweather.com/cond_icon/212.png';
            break;
        case 213:
            return 'https://cdn.heweather.com/cond_icon/213.png';
            break;
        case 300:
            return 'https://cdn.heweather.com/cond_icon/300.png';
            break;
        case 301:
            return 'https://cdn.heweather.com/cond_icon/301.png';
            break;
        case 302:
            return 'https://cdn.heweather.com/cond_icon/302.png';
            break;
        case 303:
            return 'https://cdn.heweather.com/cond_icon/303.png';
            break;
        case 304:
            return 'https://cdn.heweather.com/cond_icon/304.png';
            break;
        case 305:
            return 'https://cdn.heweather.com/cond_icon/305.png';
            break;
        case 306:
            return 'https://cdn.heweather.com/cond_icon/306.png';
            break;
        case 307:
            return 'https://cdn.heweather.com/cond_icon/307.png';
            break;
        case 308:
            return 'https://cdn.heweather.com/cond_icon/308.png';
            break;
        case 309:
            return 'https://cdn.heweather.com/cond_icon/309.png';
            break;
        case 310:
            return 'https://cdn.heweather.com/cond_icon/310.png';
            break;
        case 311:
            return 'https://cdn.heweather.com/cond_icon/311.png';
            break;
        case 312:
            return 'https://cdn.heweather.com/cond_icon/312.png';
            break;
        case 313:
            return 'https://cdn.heweather.com/cond_icon/313.png';
            break;
        case 400:
            return 'https://cdn.heweather.com/cond_icon/400.png';
            break;
        case 401:
            return 'https://cdn.heweather.com/cond_icon/401.png';
            break;
        case 402:
            return 'https://cdn.heweather.com/cond_icon/402.png';
            break;
        case 403:
            return 'https://cdn.heweather.com/cond_icon/403.png';
            break;
        case 404:
            return 'https://cdn.heweather.com/cond_icon/404.png';
            break;
        case 405:
            return 'https://cdn.heweather.com/cond_icon/405.png';
            break;
        case 406:
            return 'https://cdn.heweather.com/cond_icon/406.png';
            break;
        case 407:
            return 'https://cdn.heweather.com/cond_icon/407.png';
            break;
        case 500:
            return 'https://cdn.heweather.com/cond_icon/500.png';
            break;
        case 501:
            return 'https://cdn.heweather.com/cond_icon/501.png';
            break;
        case 502:
            return 'https://cdn.heweather.com/cond_icon/502.png';
            break;
        case 503:
            return 'https://cdn.heweather.com/cond_icon/503.png';
            break;
        case 504:
            return 'https://cdn.heweather.com/cond_icon/504.png';
            break;
        case 505:
            return 'https://cdn.heweather.com/cond_icon/505.png';
            break;
        case 506:
            return 'https://cdn.heweather.com/cond_icon/506.png';
            break;
        case 507:
            return 'https://cdn.heweather.com/cond_icon/507.png';
            break;
        case 508:
            return 'https://cdn.heweather.com/cond_icon/508.png';
            break;
        case 900:
            return 'https://cdn.heweather.com/cond_icon/900.png';
            break;
        case 901:
            return 'https://cdn.heweather.com/cond_icon/901.png';
            break;
        case 999:
            return 'https://cdn.heweather.com/cond_icon/999.png';
            break;
        default:
            return '';break;
    }
}

export const aqiFunc=(aqi)=>{
    switch(true){
        case(0<=aqi && 50>=aqi):
            return '优';
            break;
        case(51<=aqi && 100>=aqi):
            return '良';
            break;
        case(101<=aqi && 150>=aqi):
            return '轻度污染';
            break;
        case (151<=aqi && 200>=aqi):
            return '中度污染';
            break;
        case (201<=aqi && 300>=aqi):
            return '重度污染';
            break;
        case (301<=aqi):
            return '严重污染';
            break;
    }
}

export const lifeStyleTitle=(type)=>{
    switch(type){
        case 'comf':
            return '舒适度指数';
            break;
        case 'cw':
            return '洗车指数';
            break;
        case 'drsg':
            return '穿衣指数';
            break;
        case 'flu':
            return '感冒指数';
            break;
        case 'sport':
            return '运动指数';
            break;
        case 'trav':
            return '旅游指数';
            break;
        case 'uv':
            return '紫外线指数';
            break;
        case 'air':
            return '污染指数';
            break;
        default:
            return '';
            break;
    }
}

export const lifeIcon=(type)=>{
    switch(type){
        case 'comf':
            return 'thermometer-empty';
            break;
        case 'cw':
            return 'car';
            break;
        case 'drsg':
            return 'user-secret';
            break;
        case 'flu':
            return 'frown-o';
            break;
        case 'sport':
            return 'child';
            break;
        case 'trav':
            return 'plane';
            break;
        case 'uv':
            return 'sun-o';
            break;
        case 'air':
            return 'refresh';
            break;
        default:
            return '';
            break;
    }
}