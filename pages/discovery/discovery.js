var util = require('../../utils/util.js');
// pages/discovery/discovery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab:['推荐','圆桌','热门','收藏'],
    currentNavtab:"0",
    imgUrls:[
      '../../images/24213.jpg',
      '../../images/24280.jpg',
      '../../images/1444983318907-_DSC1826.jpg'
    ],
    indicatorDots:false,
    autoplay:true,
    interval:5000,
    duration:1000,
    feed:[],
    feed_length:0
  },
  switchTab(e){
    this.setData({
      currentNavtab:e.currentTarget.dataset.idx
    })
  },
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload');
    var that = this;
    this.refresh();
  },
  refresh(){
    var feed = util.getDiscovery();
    console.log('loaddata');
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length:feed_data.length
    })
  },
  upper(){
    wx.showNavigationBarLoading();
    this.refresh();
    console.log('upper');
    setTimeout(()=>{wx.hideNavigationBarLoading();wx.stopPullDownRefresh();},2000);
  },
  lower(e){
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(()=>{wx.hideNavigationBarLoading();that.nextLoad()},1000);
    console.log('lower');
  },
  nextLoad(){
    var next = util.discoveryNext();
    var next_data = next.data;
    this.setData({
      feed:this.data.feed.concat(next_data),
      feed_length:this.data.feed_length+next_data.length
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})