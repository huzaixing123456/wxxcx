
Page({
    data: {
        list: [ {
            id: 8,
            title: "全部"
        }, {
            id: 0,
            title: "待支付"
        }, {
            id: 1,
            title: "待入住"
        } ],
        orderList: [
          {
            orderId:123456789,
            orderNumber:55555,
            orderStatusLabel:22222,
            unitName:"测试数据",
            checkInDate:20181101,
            checkOutDate:20181102,
            totalUnitAmount:999,
            preAmount:220
          }
        ],
        selectedId: 8,
        curr_page: 1,
        isLogin: true,
        total: "",
        isHideLoadMore: !0
    },
    onLoad: function(t) {
     
    },
    onShow: function() {
       
    },
    navigatorToOrderDetail:function(){
      wx.navigateTo({
        url: "./orderdetail/orderdetail"
      });
    }
});