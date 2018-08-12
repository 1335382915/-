//index.js
//获取应用实例
const app = getApp();
const server = require("../../server/server");
const cityData = require("../../data/cityData");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isLoading: true,
    modalShow: false,
    currentIndex: 0,
    isRefreshing: false,
    drawerLockMode: 'unlocked',
    currentListIndex: 2,
    currentListKey: 0,
    cityModalShow: false,

    nowWeather: {},
    nextWeather: {},
    airInfo: {},
    allWeatherInfo: {},
    weatherInfoList: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  initData: function() {
    server.requestWeatherInfo(this, 'location', 'CN101010400', () => {
      server.requestWeatherInfo(this, 'location', 'CN101010200', () => {
        server.requestWeatherInfo(this, 'location', 'JP1850147', () => {
          server.requestAllWeatherInfo(this, 'location', cityData[this.data.currentListKey].child[this.data.currentListIndex].key, () => {
            // this.props.actions.requestAirInfo('location','beijing',()=>{
            //
            // })
            this.setData({
              isLoading: false,
              isRefreshing: false
            })
            console.log(this.data.weatherInfoList)
          })
        })
      })
    })
  },
  onLoad: function() {
    this.initData();
  },
})
