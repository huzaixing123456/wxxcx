// pages/order/orderTips/orderTips.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'02:00:00',
    orderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options['orderId']
    })
    let timeMinutes = 2*60*60;
    this.timer = setInterval(()=>{
      timeMinutes--;
      var hour = Math.floor(timeMinutes/60/60)
      hour = hour < 10 ? '0' + hour : hour;
      var minutes = Math.floor((timeMinutes - parseInt(hour)*60*60)/ 60);
      minutes = minutes < 10 ? '0'+minutes:minutes;
      var seconds = Math.floor(timeMinutes % 60);
      seconds = seconds < 10 ? '0' + seconds : seconds;
      this.setData({
        time: hour + ':' + minutes + ':' + seconds
      })
      if (timeMinutes == 0){
        clearInterval(this.timer);
        this.timer = null;
      }
    },1000);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.timer);
    this.timer = null;
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