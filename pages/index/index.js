//index.js
//获取应用实例
const app = getApp();
const server = require("../../server/server");
const cityData = require("../../data/cityData");
const config = require("../../utils/util.js");

Page({
  data: {
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
    config,
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
  getNewCity: function(e, kIndex, cIndex) {
    const keyIndex = e && e.detail ? e.detail.keyIndex : kIndex;
    const childIndex = e && e.detail ? e.detail.childIndex : cIndex;
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
  openModal: function(e) {
    const currentIndex = e.currentTarget.dataset.index;
    this.setData({
      currentIndex
    })
    const activity = this.data.allWeatherInfo.HeWeather6[0].lifestyle;
    wx.showModal({
      title: config.lifeStyleTitle(activity[currentIndex].type),
      content: activity[currentIndex].txt,
      showCancel: false
    })
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
