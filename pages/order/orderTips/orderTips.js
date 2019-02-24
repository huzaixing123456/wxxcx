// pages/order/orderTips/orderTips.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'01:00:00',
    orderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      orderId:options['orderId']
    })
    let timeMinutes = 60*60;
    this.timer = setInterval(()=>{
      timeMinutes--;
      var minutes = Math.floor(timeMinutes / 60);
      minutes = minutes < 10 ? '0'+minutes:minutes;
      var seconds = Math.floor(timeMinutes % 60);
      seconds = seconds < 10 ? '0' + seconds : seconds;
      this.setData({
        time: '00:' + minutes + ':' + seconds
      })
      if (timeMinutes == 0){
        clearInterval(this.timer);
        this.timer = null;
      }
    },1000);
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
    clearInterval(this.timer);
    this.timer = null;
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
  navigateToIndex(){
    wx.switchTab({
      url: "../../index/index"
    });
  },
  navigateToDetail(){
    wx.navigateTo({
      url: "../orderdetail/orderdetail?orderId=" + this.data.orderId
    });
  }
})