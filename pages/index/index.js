//index.js
//获取应用实例
const app = getApp();
import * as server from "../../server/server";
import cityData from "../../data/cityData";
import * as config from "../../utils/util";

Page({
  data: {
    isLoading: true,
    currentIndex: 0,
    currentListIndex: 2,
    currentListKey: 0,

    nowWeather: {},
    nextWeather: {},
    airInfo: {},
    allWeatherInfo: {},
    weatherInfoList: [],
    config,
  },
  onPullDownRefresh() {
    this.initData();
  },
  getNewCity(e, kIndex, cIndex) {
    const keyIndex = e && e.detail ? e.detail.keyIndex : kIndex;
    const childIndex = e && e.detail ? e.detail.childIndex : cIndex;
    this.setData({
      currentListIndex: childIndex,
      currentListKey: keyIndex,
      isLoading: true,
    })
    wx.showLoading({
      title: "正在加载",
    })
    server.requestAllWeatherInfo(this, "location", cityData[keyIndex].child[childIndex].key, () => {
      this.setData({
        isLoading: false
      })
      wx.hideLoading();
      this.closeDrawer();
    })
  },
  openModal(e) {
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
  openDrawer() {
    this.selectComponent("#drawer").openDrawer();
  },
  closeDrawer() {
    this.selectComponent("#drawer").closeDrawer();
  },
  initData() {
    server.requestWeatherInfo(this, "location", "CN101010400", () => {
      server.requestWeatherInfo(this, "location", "CN101010200", () => {
        server.requestWeatherInfo(this, "location", "JP1850147", () => {
          server.requestAllWeatherInfo(this, "location", cityData[this.data.currentListKey].child[this.data.currentListIndex].key, () => {
            this.setData({
              isLoading: false
            })
            wx.hideLoading();
            wx.stopPullDownRefresh();
          })
        })
      })
    })
  },
  onLoad() {
    wx.showLoading({
      title: "正在加载",
    })
    this.initData();
  }
})
