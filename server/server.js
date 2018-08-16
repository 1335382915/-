export const requestWeatherInfo = (self, key, value, callback) => {
  wx.request({
    url: `https://free-api.heweather.com/s6/weather/now?${key}=${value}&key=65ad7b5d9b934958b451f585aa83a505`,
    method: "GET",
    success: res => {
      if(res.statusCode == 200) {
        let _weatherInfoList = JSON.parse(JSON.stringify(self.data.weatherInfoList));
        _weatherInfoList.push(res.data);
        self.setData({
          weatherInfoList: _weatherInfoList
        })
        callback && callback();
      }
      else {
        wx.showToast({
          title: res.errMsg
        })
      }
    },
    fail: err => {
      wx.showToast({
        title: "服务器异常",
      })
    }
  })
} 

export const requestAirInfo = (self, key, value, callback) => {
  wx.request({
    url: `https://free-api.heweather.com/s6/air/now?${key}=${value}&key=65ad7b5d9b934958b451f585aa83a505`,
    method: "GET",
    success: res => {
      if(res.status == 200) {
        self.setData({
          airInfo: res.data
        })
        callback && callback()
      }
      else {
        wx.showToast({
          title: res.errMsg
        })
      }
    },
    fail: err => {
      wx.showToast({
        title: "服务器异常",
      })
    }
  })
}

export const requestAllWeatherInfo = (self, key, value, callback) => {
  wx.request({
    url: `https://free-api.heweather.com/s6/weather?${key}=${value}&key=65ad7b5d9b934958b451f585aa83a505`,
    method: "GET",
    success: res => {
      if(res.statusCode == 200) {
        self.setData({
          allWeatherInfo: res.data
        })
        callback && callback();
      }
    },
    fail: err => {
      wx.showToast({
        title: "服务器异常",
      })
    }
  })
}