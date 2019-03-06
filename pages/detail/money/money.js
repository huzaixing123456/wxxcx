import LocalStorage from '../../../libs/localStorage';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomDeatal:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      roomDeatal:options
    })
  }
})