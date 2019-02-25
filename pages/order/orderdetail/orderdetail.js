
import httpApi from '../../../libs/httpApi';
import util from '../../../libs/util';
import LocalStorage from '../../../libs/localStorage';
import { HTTP } from '../../../libs/const.js';

Page({
    data: {
      order:'',
      applyRefundOrder:false,
      refundAmount:'',
      deleteOrderFlag:false,
      leaveOrderFlag:false,
      markers:''
    },
    onLoad: function(options) {
        let {orderId} = options;
        httpApi.getOrderDetail({
            orderId: orderId
        }).then(res=>{
            this.setData({
              order:res,
              markers:[{
                iconPath: '../../../assets/location.png',
                id: 0,
                latitude: res['latitude'],
                longitude: res['longitude'],
                width: 25,
                height: 25
              }],
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
          wx.navigateTo({
            url: "../../order/orderTips/orderTips?orderId=" + params['orderId']
          });
        },
        'fail': function (res) {
          util.toast({ title: '支付失败' });
          console.log("失败了", res);
        }
      })
      
    });
  },
  refundOrder(){
    var orderId = this.data.order.orderId;
    httpApi.applyRefundOrder({orderId}).then(res=>{
      this.setData({
        applyRefundOrder:true,
        refundAmount: res.refundAmount
      })
    })
    
  },
  confrimRefundOrder(){
    var orderId = this.data.order.orderId;
    httpApi.refundOrder({ orderId }).then(res => {
      console.log(res);
      this.setData({
        applyRefundOrder:false
      })
      util.toast({title:'退款成功'});
      setTimeout(()=>{
        wx.switchTab({
          url: "../order"
        });
      },1000);
    })
  },
  closeDialog(){
    this.setData({
      applyRefundOrder: false
    })
  },
  deleteOrder(){
    this.setData({
      deleteOrderFlag:true
    })
  },
  closeDeleteDialog(){
    this.setData({
      deleteOrderFlag: false
    })
  },
  confrimDeleteOrder(){
    var orderId = this.data.order.orderId;
    httpApi.deleteOrder({ orderId }).then(res => {
      console.log(res);
      this.setData({
        deleteOrderFlag: false
      });
      util.toast({ title: '删除成功' });
      setTimeout(() => {
        wx.switchTab({
          url: "../order"
        });
      }, 1000);
    })
  },
  
  leaveOrder(){
    this.setData({
      leaveOrderFlag: true
    })
  },
  confrimLeaveOrder(){
    var orderId = this.data.order.orderId;
    httpApi.leaveOrder({ orderId }).then(res => {
      this.setData({
        leaveOrderFlag: false
      })
      util.toast({ title: '离店成功' });
      setTimeout(() => {
        wx.switchTab({
          url: "../order"
        });
      }, 1000);
    })
  },
  closeLeaveDialog(){
    this.setData({
      leaveOrderFlag:false
    })
  },
  navigatorTohouseDetail(){
    var roomId = this.data.order.roomId;
    LocalStorage.remove('checkDate');
    var current = util.getCurrentDate();
    var tomorrow = util.getTomorrowDate();
    this.setData({
      startDate: `${current.month}月${current.date}`,
      endDate: `${tomorrow.month}月${tomorrow.date}`,
      days: 1
    });
    LocalStorage.set('checkDate', {
      startDate: util.getStrByNum(current.year, current.month, current.date),
      endDate: util.getStrByNum(tomorrow.year, tomorrow.month, tomorrow.date)
    })
    wx.navigateTo({
      url: "../../detail/detail?roomId=" + roomId
    });
  },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});