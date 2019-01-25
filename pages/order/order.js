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
    noData:false,
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
      content.forEach(item => {
        item.coverPic = HTTP.imgPath + item.coverPic
        item.coverPic = 'https://wx.longmenkezhan.com/images/rooms/201901021411439610.jpg'
      });
      this.setData({
          noData:content.length == 0 && maxPage == 1 ? true:false
      });
      this.setData({
          noMoreData:pageNum == maxPage ? true:false
      })
      this.setData({
        orderList: content
      })
    })
  },
  onShow: function () {
    var user = LocalStorage.getSync('user');
    if(user){
      this.getData();
    }
    this.setData({
        user
    })
  },
  changeNav(e) {
    var index = e.currentTarget.dataset.index;
    var {nav} = this.data;
    if (nav[index]['active']) return;
    nav.forEach((item,i)=>{
      item['active'] = (index == i) ? true :false;
    })
    this.setData({
      nav,
      page:''
    });
    this.getData();
  },
  onReachBottom: function () {
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
  }
});