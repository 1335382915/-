// components/drawer.js
import * as echarts from "../../components/ec-canvas/echarts";

let chart = null;

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
    dailyWeather: {
      type: Object,
      value: {}
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
    drawerHasShown: false,
    ec: {
      lazyLoad: true
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    openDrawer() {
      this.setData({
        drawerHasShown: true,
      })
      this.ecComponent = this.selectComponent("#echart");
      setTimeout(() => {
        this.init();
      }, 0)
    },
    closeDrawer() {
      this.setData({
        drawerHasShown: false,
      })
    },
    getTmp(daily) {
      daily = daily.slice(0, 3);
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

    getDate(daily) {
      let date = [];
      daily.map((item, index) => {
        if (index == 0) {
          date.push("今天");
        }
        else if (index == 1) {
          date.push("明天");
        }
        else if (index == 2) {
          date.push("后天");
        }
      });
      return date;
    },

    getChartOptions() {
      const dailyWeather = this.data.dailyWeather;
      const lowerTmp = this.getTmp(dailyWeather).lowerTmp;
      const higherTmp = this.getTmp(dailyWeather).higherTmp;
      const date = this.getDate(dailyWeather);
      return {
        timeLine: {
          show: false
        },
        backgroundColor: "white",
        tooltip: {},
        color: ["#68b1ed", "#ff3737"],
        legend: {
          data: ["最低气温", "最高气温"]
        },
        xAxis: {
          data: date
        },
        yAxis: {},
        series: [
          {
            name: "最低气温",
            type: "line",
            smooth: true,
            data: lowerTmp
          },
          {
            name: "最高气温",
            type: "line",
            smooth: true,
            data: higherTmp
          }
        ]
      };
    },
    getNewCity(e) {
      const keyIndex = e.currentTarget.dataset.key;
      const childIndex = e.currentTarget.dataset.child;
      this.triggerEvent("getNewCity", {
        keyIndex,
        childIndex
      })
    },
    getMoreCity() {
      wx.navigateTo({
        url: "../city/city",
      })
    },
    init() {
      this.ecComponent.init((canvas, width, height) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        chart.setOption(this.getChartOptions())

        // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
        this.chart = chart;

        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    },
  }
})
