// pages/detail/detail.js
let util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: {},
    detailId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({detailId: options.id});
    this.getNewsDetail();
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
  
  },


  getNewsDetail() {
    let id = this.data.detailId;
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: { id: id },
      success: (res) => {
        if (res.statusCode == 200) {
          res.data.result.datetime = util.formatDate(res.data.result.date)
          this.setData({ news: res.data.result });
        }
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  navigateBack() {
    wx.navigateBack();
  }
})