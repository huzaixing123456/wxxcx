import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';
import { HTTP } from '../../libs/const';

Page({
  data: {
    nav: [{
      id: 0,
      title: "全部",
      active: true
    }, {
      id: 1,
      title: "待支付",
      active: false
    }, {
      id: 2,
      title: "待入住",
      active: false
    }],
    orderList: [],
    pageNum:1,
    maxPage: "",
    user: false,
    noMoreData:false
  },
  onLoad: function (t) {
    
  },
  getData(){
    var { nav ,pageNum } = this.data;
    var index = nav.findIndex(item=>{
      return item['active'];
    });
    var orderStatus;
    switch(index){
      case 0:
        orderStatus = 'all';
        break;
      case 1:
        orderStatus = 'forPay';
        break;
      case 2:
        orderStatus = 'forCheck';
        break;
    };
    httpApi.getOrderList({
      orderStatus,
      pageNum
    }).then(res => {
      var {content,pageNum,maxPage} = res;
      var {orderList} = this.data;
      if(content.length>0){
          content.forEach(item => {
              item.coverPic = HTTP.imgPath + item.coverPic
          });
      }
      var flag = (pageNum == maxPage) ? true : false;
      this.setData({
          noMoreData:flag
      });
      this.setData({
        orderList: [].concat((pageNum == 1)?[]:this.data.orderList, content),
        maxPage:maxPage
      })
    })
  },
  onShow: function () {
    var user = LocalStorage.getSync('user');
    if (user) {
      this.getData();
    }
    this.setData({
      user
    })
  },
  getInitParams(){
      return {
          orderList: [],
          pageNum:1,
          maxPage: "",
          user: false,
          noMoreData:false
      }
  },
  changeNav(e) {
    var index = e.currentTarget.dataset.index;
    var {nav,user} = this.data;
    if (nav[index]['active']) return;
    nav.forEach((item,i)=>{
      item['active'] = (index == i) ? true :false;
    });
    var params = Object.assign({},this.getInitParams(),{nav,user});
    this.setData(params);
    this.getData();
  },
  onReachBottom: function () {
    console.log('底部加载了');
   let {pageNum,maxPage} = this.data;
    console.log(this.data);
   if(pageNum>=maxPage){
       return false;
   }else{
        this.setData({
            pageNum:++pageNum
        })
       this.getData();
   }
    console.log('底部加载了');
  },
  navigatorToOrderDetail: function () {
    wx.navigateTo({
      url: "./orderdetail/orderdetail"
    });
  },
  toLogin:function(){
      wx.navigateTo({
          url: "../login/login"
      });
  },
    toOrderDetail(e){
      var orderId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "./orderdetail/orderdetail?orderId=" + orderId
        });
    }
});