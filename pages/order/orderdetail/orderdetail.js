
import httpApi from '../../../libs/httpApi';
import util from '../../../libs/util';
import LocalStorage from '../../../libs/localStorage';
import { HTTP } from '../../../libs/const.js';

Page({
    data: {
        order:''
    },
    onLoad: function(options) {
        let {orderId} = options;
        httpApi.getOrderDetail({
            orderId: orderId
        }).then(res=>{
            this.setData({
                order:res
            })
        })
    },
    onShow: function() {

      // httpApi.refundOrder({
      //   orderId: 16655793587748864
      // })
      // httpApi.deleteOrder({
      //   orderId: 16655793587748864
      // })

    },
  goLocation() {
    var { longitude, latitude } = this.data.order;
    wx.openLocation({
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
      scale: 18
    })
  },

  toPay(){
    var orderId = this.data.order.orderId;

    httpApi.getPayParams({orderId}).then(res=>{
      var params = JSON.parse(res);
      console.log(params);
      wx.requestPayment({
        'timeStamp': params['timeStamp'],
        'nonceStr': params['nonceStr'],
        'package': params['package'],
        'signType': params['signType'],
        'paySign': params['paySign'],
        'success': function (res) {
          console.log("成功了");
        },
        'fail': function (res) {
          console.log("失败了", res);
        }
      })
    });
  },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});