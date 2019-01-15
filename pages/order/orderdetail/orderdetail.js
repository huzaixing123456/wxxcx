
import httpApi from '../../../libs/httpApi';
import util from '../../../libs/util';
import LocalStorage from '../../../libs/localStorage';
import { HTTP } from '../../../libs/const.js';

Page({
    data: {
        order: {
          orderNumber:23533333,
          unitName:"房间名字",
          bookingCount:258,
          checkInDate:20181012,
          checkOutDate:20185820,
          defund:258,
          total_price:2589,
          unitAddress:"北京市昌平沙河",
          bookerName:"胡再兴",
          phone:18611985439,
          payStatus:0
        },
        clock: "",
        isDisabled: !1,
        isShow: !1
    },
    onReady: function() {},
    onShow: function() {
      // httpApi.getOrderDetail({
      //   orderId: 16655793587748864
      // })
      // httpApi.refundOrder({
      //   orderId: 16655793587748864
      // })
      httpApi.deleteOrder({
        orderId: 16655793587748864
      })

    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});