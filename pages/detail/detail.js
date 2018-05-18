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
  onLoad: function(option) {
    this.setData({detailId: option.id});
    this.getNewsDetail();
  },
  // 获取最新新闻
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
  // 返回前页
  navigateBack() {
    wx.navigateBack();
  }
})