// components/drawer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    openValue: 0,
    drawerHasShown: false,
    scrollTop: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openDrawer: function () {
      this.drawerHasShown = true;
    },
    closeDrawer: function () {
      this.setData({
        drawerHasShown: false
      })
    }
  }
})
