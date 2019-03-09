import httpApi from '../../../libs/httpApi';
import util from '../../../libs/util';
import LocalStorage from '../../../libs/localStorage';
import { REGEXP } from '../../../libs/const.js';
Page({
  data: {
    roomDeatal:{},
    startDate:'',
    endDate:'',
    days:'',
    roomCount:1,
    peopleCount:1,
    name:'',
    phone: '',
    idCard:'',
    cardIndex: 0,
    cardList: ["身份证", "军官证", "护照"],
    price:'', //金额
    pledge:'' //押金
  },
  onLoad: function (options) {
    var checkDate = LocalStorage.getSync('checkDate');
    var roomDeatal = LocalStorage.getSync('roomDeatal');
    var { startDate, endDate } = checkDate;
    var start = util.getDateByNum(startDate);
    var end = util.getDateByNum(endDate);
    var days = util.getCountDay(start, end);
    var checkInDate = util.getDateByNum(startDate,'-');
    var checkOutDate = util.getDateByNum(endDate,'-');
    this.setData({
      startDate: parseInt(start.year) +'年'+ parseInt(start.month) + '月' + parseInt(start.day)+'日',
      endDate: parseInt(start.year) + '年' + parseInt(end.month) + '月' + parseInt(end.day) + '日',
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      days,
      roomDeatal,
      price: roomDeatal.price * this.data.roomCount,
      pledge: roomDeatal.pledge,
      total: parseFloat(roomDeatal.price * this.data.roomCount) + parseFloat(roomDeatal.pledge)
    });
  },
  submit(e) {
    var formId = e.detail.formId;
    if (formId == 'the formId is a mock one') {
      console.log(`模拟器中运行！`)
      return false;
    } if (formId.length == 0) {
      console.log(`formId不能为空`)
      return false;
    }
    var { checkInDate, checkOutDate, roomCount, peopleCount, name, phone, idCard, cardIndex,roomDeatal } = this.data;
    if(!name){
      util.toast({ title: "请输入入住人姓名" });
      return;
    }
    if (!REGEXP.TELEPHONE.test(phone)) {
      util.toast({ title: "请输入正确的手机号码" });
      return;
    }
    if (cardIndex == 0){
      if (!REGEXP.IDCARD1.test(idCard) && !REGEXP.IDCARD2.test(idCard)) {
        util.toast({ title: "请输入正确的身份证号码" });
        return;
      }
    }
    if (cardIndex == 1) {
      if (!REGEXP.PASSPORT.test(idCard)) {
        util.toast({ title: "请输入正确的军官证号码" });
        return;
      }
    }
    if (cardIndex == 2) {
      if (!REGEXP.OFFICER.test(idCard)) {
        util.toast({ title: "请输入正确的护照号码" });
        return;
      }
    }
    httpApi.submitOrder({
      "checkInDate": checkInDate,
      "checkOutDate": checkOutDate,
      "guestNum": peopleCount,
      "idNo": idCard ,
      "idType": cardIndex,
      "mobile": phone,
      "name": name,
      "roomId": roomDeatal.roomId,
      "roomNum": roomCount,
      "form_id": formId
    }).then(res => {
      var params = JSON.parse(res);
      var user = LocalStorage.getSync('user');
      user.name = name;
      user.cardIndex = cardIndex;
      user.idCard = idCard;
      console.log(user);
      LocalStorage.set('user', user);
      wx.requestPayment({
        'timeStamp': params['timeStamp'],
        'nonceStr': params['nonceStr'],
        'package': params['package'],
        'signType': params['signType'],
        'paySign': params['paySign'],
        'success': function (res) {
          wx.navigateTo({
            url: "../../order/orderTips/orderTips?orderId=" + params['orderId']
          });
        },
        'fail': function (res) {
          util.toast({title:'支付失败'});
            wx.switchTab({
                url: "../../order/order"
            });
        }
      })
    })
  },
  chooseRoom(e){
    var { tag, max } = e.currentTarget.dataset;
    var { roomCount } = this.data;
    if(tag>0){
      if (roomCount >= max) return;
      this.setData({
        roomCount: ++roomCount
      })
    }else{
      if (roomCount>1){
        this.setData({
          roomCount: --roomCount
        })
      }
    }
    var { roomCount, roomDeatal} = this.data;
    this.setData({
      price: roomDeatal.price * roomCount,
      pledge: roomDeatal.pledge,
      total: parseFloat(roomDeatal.price * roomCount) + parseFloat(roomDeatal.pledge)
    })
  },
  choosePeople(e) {
    var {tag,max} = e.currentTarget.dataset;
    var { peopleCount } = this.data;
    if (tag > 0) {
      if (peopleCount>=max)return;
      this.setData({
        peopleCount: ++peopleCount
      })
    } else {
      if (peopleCount > 1) {
        this.setData({
          peopleCount: --peopleCount
        })
      }
    }
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  getIdCard(e){
    this.setData({
      idCard: e.detail.value
    })
  },
  bindCardChange(e){
    var index = e.detail.value;
    this.setData({
      cardIndex:index
    })
  },
  toMoney(){
    var { roomCount, roomDeatal} = this.data;
    wx.navigateTo({
      url: "../money/money?money=" + roomDeatal['price'] * roomCount + '&name=' + roomDeatal['roomName']
    });
  },
  onShow: function () {
    var user = LocalStorage.getSync('user');
    if(user){
      this.setData({
        phone:user['mobile'],
        name: user['name']||'',
        cardIndex: user['cardIndex']||0,
        idCard: user['idCard'] || ''
      })
    }
  }
});