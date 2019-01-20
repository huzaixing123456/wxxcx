import httpApi from '../../../libs/httpApi';
import util from '../../../libs/util';
import LocalStorage from '../../../libs/localStorage';
import { HTTP } from '../../../libs/const.js';
Page({
  data: {
    dataList: {
      imgUrl: "https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg"
    },
    startDate:'',
    endDate:'',
    days:'',
    roomCount:1,

    price: "",
    name: "",
    phone: "",
    id_card: "",
    otherList: ["限时退：取消订单，将收取100%房费作为违约金支付给房东；入住后若提前退房，将收取100%的剩余房费作为违约金支付给房东。", "请根据实际入住人数填写，人数不同房屋报价也有所不同"],
    stepper: {
      stepper: 1,
      min: 1,
      max: 1,
      size: "small"
    },
    stepper2: {
      stepper: 1,
      min: 1,
      max: 1,
      size: "small"
    },
    array: ["身份证", "军官证", "护照"],
    objectArray: [{
      id: 0,
      name: "身份证"
    }, {
      id: 1,
      name: "军官证"
    }, {
      id: 2,
      name: "护照"
    }],
    index: 0,
    isShow: !1,
    baoxian: "未使用",
    peopleCount: 1,
    isDisabled: !1
  },
  onLoad: function (e) {
    var checkDate = LocalStorage.getSync('checkDate')
    var { startDate, endDate } = checkDate;
    var start = util.getDateByNum(startDate);
    var end = util.getDateByNum(endDate);
    var days = util.getCountDay(start, end);
    this.setData({
      startDate: `${start.month}月${start.day}`,
      endDate: `${end.month}月${end.day}`,
      days
    });



  },
  submit() {
    httpApi.submitOrder({
      "checkInDate": "2019-06-17",
      "checkOutDate": "2019-06-29",
      "guestNum": 1,
      "idNo": "421181198706078010",
      "idType": 0,
      "mobile": "12222222222",
      "name": "zhangsan",
      "roomId": 30,
      "roomNum": 1
    }).then(res => {
      console.log(res);
    })
  },
  chooseRoom(e){
    console.log(e);
    var tag = e.currentTarget.dataset.tag;
    var { roomCount } = this.data;
    if(tag>0){
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
  },
  onShow: function () {

  }
});