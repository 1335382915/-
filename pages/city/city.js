// pages/city/city.js
import * as config from "../../utils/util.js";
import cityData from "../../data/cityData";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    config,
    cityData
  },
  onReady: function() {
    const pages = getCurrentPages();
    const currentPage = pages[0];
    setTimeout(() => {
      currentPage.closeDrawer();
    }, 500)
  },
  selectCity: function(e) {
    const keyIndex = e.currentTarget.dataset.key;
    const childIndex = e.currentTarget.dataset.child;
    const pages = getCurrentPages();
    const currentPage = pages[0];
    currentPage.getNewCity(null, keyIndex, childIndex);
    wx.navigateBack();
  }
})