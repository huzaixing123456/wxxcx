
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
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});