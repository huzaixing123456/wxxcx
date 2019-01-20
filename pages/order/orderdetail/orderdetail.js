
import httpApi from '../../../libs/httpApi';
import util from '../../../libs/util';
import LocalStorage from '../../../libs/localStorage';
import { HTTP } from '../../../libs/const.js';

Page({
    data: {
        order:''
    },
    onReady: function() {},
    onShow: function() {
      httpApi.getOrderDetail({
        orderId: 18430869995782144
      }).then(res=>{
        this.setData({
          order:res
        })
      })
      // httpApi.refundOrder({
      //   orderId: 16655793587748864
      // })
      // httpApi.deleteOrder({
      //   orderId: 16655793587748864
      // })

    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});