//index.js
//获取应用实例
const util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    feed:[],
    feed_length:0
  },
  //事件处理函数
  bindItemTap(){
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap(){
    wx.navigateTo({
      url: '../question/question'
    })
  },
  upper(){
    wx.showNavigationBarLoading();
    this.refresh();
    console.log("upper");
    setTimeout(()=>{wx.hideNavigationBarLoading();wx.stopPullDownRefresh();},2000)
  },
  lower(){
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(()=>{wx.hideNavigationBarLoading();that.nextLoad()},1000);
    console.log('lower');
  },
  onLoad: function () {
   console.log('onload');
   var that = this;
   this.getData();
  },
  getData(){
    var feed = util.getData2();
    console.log('loaddata');
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length:feed_data.length
    })
  },
  refresh(){
    wx.showToast({
      title:'刷新中',
      load:'loading',
      duration:3000
    });
    var feed = util.getData2();
    console.log('loaddata');
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length:feed_data.length
    });
    setTimeout(()=>{
      wx.showToast({
        title:'刷新成功',
        icon:"success",
        duration:2000
      })
    },3000)
  },
  nextLoad(){
    wx.showToast({
      title:'加载中',
      icon:'loading',
      duration:4000
    })
    var next = util.getNext();
    console.log('continueload');
    var next_data = next.data;
    this.setData({
      feed:this.data.feed.concat(next_data),
      feed_length:this.data.feed_length+next_data.length
    });
    setTimeout(()=>{
      wx.showToast({
        title:'加载成功',
        icon:'success',
        duration:2000
      })
    },3000)
  }
  
})
