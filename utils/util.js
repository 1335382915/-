export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join("/") + " " + [hour, minute, second].map(formatNumber).join(":");
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : "0" + n
}

export const weatherCodeToImg = (code) => `https://cdn.heweather.com/cond_icon/${code}.png`;

export const aqiFunc = aqi => {
  switch (true) {
    case (0 <= aqi && 50 >= aqi):
      return "优";
      break;
    case (51 <= aqi && 100 >= aqi):
      return "良";
      break;
    case (101 <= aqi && 150 >= aqi):
      return "轻度污染";
      break;
    case (151 <= aqi && 200 >= aqi):
      return "中度污染";
      break;
    case (201 <= aqi && 300 >= aqi):
      return "重度污染";
      break;
    case (301 <= aqi):
      return "严重污染";
      break;
  }
}

export const lifeStyleTitle = type => {
  switch (type) {
    case "comf":
      return "舒适度指数";
    case "cw":
      return "洗车指数";
    case "drsg":
      return "穿衣指数";
    case "flu":
      return "感冒指数";
    case "sport":
      return "运动指数";
    case "trav":
      return "旅游指数";
    case "uv":
      return "紫外线指数";
    case "air":
      return "污染指数";
    default:
      return "";
  }
}

export const imgBashPath = "http://ox6gixp8f.bkt.clouddn.com/";
