import httpApi from '../../../libs/httpApi';
import util from '../../../libs/util';
import LocalStorage from '../../../libs/localStorage';
import { REGEXP } from '../../../libs/const.js';
Page({
  data: {
    dataList: {
      imgUrl: "https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg"
    },
    startDate:'',
    endDate:'',
    days:'',
    roomCount:1,
    peopleCount:1,
    name:'',
    phone: '',
    idCard:'',
    cardIndex: 0,
    cardList: ["身份证", "军官证", "护照"]
  },
  onLoad: function (e) {
    var checkDate = LocalStorage.getSync('checkDate')
    var { startDate, endDate } = checkDate;
    var start = util.getDateByNum(startDate);
    var end = util.getDateByNum(endDate);
    var days = util.getCountDay(start, end);
    var checkInDate = util.getDateByNum(startDate,'-');
    var checkOutDate = util.getDateByNum(endDate,'-');
    this.setData({
      startDate: parseInt(start.month) + '月' + parseInt(start.day)+'日',
      endDate: parseInt(end.month) + '月' + parseInt(end.day) + '日',
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      days
    });



  },
  submit() {
    var { checkInDate, checkOutDate, roomCount, peopleCount, name, phone, idCard, cardIndex} = this.data;
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
      "roomId": 30,
      "roomNum": roomCount
    }).then(res => {
      console.log(res);
    })
  },
  chooseRoom(e){
    console.log(e);
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
  },
  choosePeople(e) {
    console.log(e);
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
  onShow: function () {

  }
});