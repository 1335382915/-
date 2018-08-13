// components/drawer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentListIndex: {
      type: Number,
      value: 2
    },
    currentListKey: {
      type: Number,
      value: 0
    },
    weatherList: {
      type: Array,
      value: []
    },
    isLoading: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    drawerHasShown: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openDrawer: function () {
      this.setData({
        drawerHasShown: true
      })
    },
    closeDrawer: function () {
      this.setData({
        drawerHasShown: false
      })
    },
    getNewCity: function (e) {
      const keyIndex = e.target.dataset.key;
      const childIndex = e.target.dataset.child;
      this.triggerEvent('getNewCity', {
        keyIndex,
        childIndex
      })
    }
  }
})
