const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const weatherCodeToImg = (code) => {
  switch (code) {
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
      return ''; break;
  }
}

const aqiFunc = (aqi) => {
  switch (true) {
    case (0 <= aqi && 50 >= aqi):
      return '优';
      break;
    case (51 <= aqi && 100 >= aqi):
      return '良';
      break;
    case (101 <= aqi && 150 >= aqi):
      return '轻度污染';
      break;
    case (151 <= aqi && 200 >= aqi):
      return '中度污染';
      break;
    case (201 <= aqi && 300 >= aqi):
      return '重度污染';
      break;
    case (301 <= aqi):
      return '严重污染';
      break;
  }
}

const lifeStyleTitle = (type) => {
  switch (type) {
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

const lifeIcon = (type) => {
  switch (type) {
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

module.exports = {
  formatTime,
  weatherCodeToImg,
  aqiFunc,
  lifeStyleTitle,
  lifeIcon
}
