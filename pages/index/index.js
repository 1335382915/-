//index.js
//获取应用实例
const app = getApp();
const server = require("../../server/server");
const cityData = require("../../data/cityData");
const config = require("../../utils/util.js");

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
    weatherInfoList: [],
    config: config
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPullDownRefresh: function() {
    this.setData({
      isRefreshing: true
    })
    this.initData();
  },
  getNewCity: function(e) {
    const keyIndex = e.detail.keyIndex;
    const childIndex = e.detail.childIndex;
    this.setData({
      currentListIndex: childIndex,
      currentListKey: keyIndex,
      drawerLockMode: "locked-closed",
      //async
      isLoading: true,
      drawerLockMode: "unlocked"
    })
    wx.showLoading({
      title: "正在加载",
    })
    server.requestAllWeatherInfo(this, "location", cityData[keyIndex].child[childIndex].key, () => {
      this.setData({
        isLoading: false,
        isRefreshing: false
      })
      wx.hideLoading();
      this.closeDrawer();
    })
  },
  openCityModal: function() {
    this.setData({
      cityModalShow: true
    })
  },
  closeCityModal(keyIndex, childIndex) {
    this.setData({
      cityModalShow: false
    })
    this.getNewCity(keyIndex, childIndex)
  },
  getTmp: function(daily) {
    let higherTmp = [];
    let lowerTmp = [];
    daily.map(item => {
      lowerTmp.push(item.tmp_min);
      higherTmp.push(item.tmp_max);
    });
    return {
      lowerTmp,
      higherTmp
    }
  },
  getDate: function(daily) {
    let date = [];
    daily.map((item, index) => {
      if (index == 0) {
        date.push('今天');
      }
      else if (index == 1) {
        date.push('明天');
      }
      else if (index == 2) {
        date.push('后天');
      }
      else {
        date.push((item.date.split('-'))[2] + '日');
      }
    });
    return date;
  },
  openDrawer: function() {
    this.selectComponent("#drawer").openDrawer();
  },
  closeDrawer: function () {
    this.selectComponent("#drawer").closeDrawer();
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
            wx.hideLoading();
            wx.stopPullDownRefresh();
            console.log(this.data.config);
            console.log(this.data.weatherInfoList)
          })
        })
      })
    })
  },
  onLoad: function() {
    wx.showLoading({
      title: "正在加载",
    })
    this.initData();
  }
})
