//index.js
let util = require('../../utils/util.js')

Page({
  data: {
    types: [
      {swiper_id: 0, name: '国内', newsType: 'gn'}, 
      {swiper_id: 1, name: '国际', newsType: 'gj'}, 
      {swiper_id: 2, name: '财金', newsType: 'cj'}, 
      {swiper_id: 3, name: '娱乐', newsType: 'yl'}, 
      {swiper_id: 4, name: '军事', newsType: 'js'}, 
      {swiper_id: 5, name: '体育', newsType: 'ty'}, 
      {swiper_id: 6, name: '其他', newsType: 'other'}
    ],
    swiperCurrent: 0,
    newsList: []
  },
  onLoad: function () {
    this.getNews();
  },
  onPullDownRefresh() {
    this.getNews(function() {
      wx.stopPullDownRefresh();
    });
  },
  changeLabel(e) {
    let currentPageId = e.detail.current;
    this.setData({ swiperCurrent: currentPageId });
    this.getNews();
  },
  changeSwiper(e) {
    let swiperCurrent = e.target.dataset.swiperId;
    this.setData({ swiperCurrent });
    this.getNews();
  },
  getNews(callback) {
    wx.showLoading({
      title: '加载中，请稍等...',
    })
    wx.request(
      {
        url: 'https://test-miniprogram.com/api/news/list',
        data: {
          type: this.data.types[this.data.swiperCurrent].newsType
        },
        success: (res) => {
          if(res.statusCode == 200){
            let newsList = res.data.result;
            if(newsList != undefined && newsList.length != 0){
              for (let i = 0; i < newsList.length; i++) {
                newsList[i].datetime = util.formatDate(newsList[i].date)
              }
              this.setData({ newsList });
            }else{
              // 没有数据的情况
              this.setData({ newsList: [] })
            }
            
          }
        },
        fail: (res) => {
          this.setData({ newsList: [] })
        },
        complete: () => {
          wx.hideLoading();
          if(typeof callback == 'function'){
            callback();
          }
        }

      }
    )
  },
  viewDetail(e) {
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  }
})
