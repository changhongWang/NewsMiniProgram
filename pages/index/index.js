//index.js
let util = require('../../utils/util.js')

Page({
  data: {
    types: [
      {swiper_id: 0, name: '国内', current: true , newsType: 'gn'}, 
      {swiper_id: 1, name: '国际', current: false, newsType: 'gj'}, 
      {swiper_id: 2, name: '财金', current: false, newsType: 'cj'}, 
      {swiper_id: 3, name: '娱乐', current: false, newsType: 'yl'}, 
      {swiper_id: 4, name: '军事', current: false, newsType: 'js'}, 
      {swiper_id: 5, name: '体育', current: false, newsType: 'ty'}, 
      {swiper_id: 6, name: '其他', current: false, newsType: 'other'}
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
    let types = this.data.types;
    for (let i = 0; i < types.length; i++) {
      types[i].current = false;
    }
    types[currentPageId].current = true;
    this.setData({ types, swiperCurrent: currentPageId });
    this.getNews();
  },
  changeSwiper(e) {
    let swiperCurrent = e.target.dataset.swiperId;
    let types = this.data.types;
    for (let i = 0; i < types.length; i++) {
      types[i].current = false;
    }
    types[swiperCurrent].current = true;
    this.setData({ types, swiperCurrent });
    this.getNews();
  },
  getNews(callback) {
    wx.request(
      {
        url: 'https://test-miniprogram.com/api/news/list',
        data: {
          type: this.data.types[this.data.swiperCurrent].newsType
        },
        success: (res) => {
          if(res.statusCode == 200){
            let newsList = res.data.result;
            for(let i=0; i<newsList.length;i++){
              newsList[i].datetime = util.formatDate(newsList[i].date)
            }
            console.log(newsList)
            this.setData({ newsList });
          }
        },
        complete: () => {
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
