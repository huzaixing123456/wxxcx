import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';
import { HTTP } from '../../libs/const.js';
Page({
    data: {
        basic: '',     //基本信息
        current: 0,    //当前索引
        location: '',   //位置信息
        facility: '',   //房屋设施
        date: '',        //入住时间
        rules: '',
        additional: '',   //额外费用
        notice: '',
        price: '',
        noPayDate: '',
        halfPayDate: '',
        leaveDate: '',
        roomId:''
    },
    onShow(){
      var checkDate = LocalStorage.getSync("checkDate");
      var { startDate, endDate } = checkDate;
      if (startDate) {
        var start = util.getDateByNum(startDate, '-');
      }
      if (endDate) {
        var end = util.getDateByNum(endDate, '-');
      }
      httpApi.getRoomDetail({
        checkInDate: start,
        checkOutDate: end,
        roomId:this.data.roomId
      }).then(res => {
        console.log(res);
        var basic = res.basic;
        var coverPic = basic['coverPic'].split(',');
        coverPic = coverPic.map(item => {
          return HTTP.imgPath + item;
        })
        basic['coverPic'] = coverPic;
        var bedType = basic['bedType'].replace(/\[|\]|"/g, '').replace(/、/g, ' ');
        bedType = bedType + '张';
        basic['bedType'] = bedType;
        this.setData({
          basic: res.basic,
          location: res.location,
          facility: res.facility,
          rules: res.rules,
          additional: res.additional,
          price: res.price,
          notice: res.notice
        }, () => {
          if (res.rules.refundDay) {
            this.getNoPayDay();
          }
        })
      });
      this.getDate();
    },
    onLoad: function (options) {
        var {roomId} = options;
        this.setData({roomId});
        
    },
    getDate() {
        LocalStorage.get('checkDate').then(res => {
            var startDate = util.getDateByNum(res['startDate']);
            var endDate = util.getDateByNum(res['endDate']);
            var start = util.getDateByNum(res['startDate'], '.');
            var end = util.getDateByNum(res['endDate'], '.');
            var days = util.getCountDay(startDate, endDate);
            var date = {
                year: startDate['year'],
                month: startDate['month'],
                startDate: start,
                endDate: end,
                startCalendar:startDate.year+''+startDate.month+''+startDate.day,
                endCalendar:endDate.year+''+endDate.month+''+endDate.day,
                startStr: `${startDate.month}月${startDate.day}`,
                endStr: `${endDate.month}月${endDate.day}`,
                days
            }
            this.setData({
                date
            });
        });
    },
    getNoPayDay() {
        var { refundDay, refundPer } = this.data.rules;
      console.log(refundDay, refundPer)
      var { year, month, day } = util.getDateByNum(this.data.date.startCalendar);
      console.log(year, month, day);
        var times = new Date(year, month - 1, day).getTime() - refundDay * 24 * 60 * 60 * 1000;
        var tagDate = new Date(times);
      console.log(times);
        this.setData({
            noPayDate: tagDate.getFullYear() + '.' + (tagDate.getMonth() + 1) + '.' + tagDate.getDate()
        });
    },
    switchChange(e) {
        this.setData({
            current: e.detail.current
        })
    },
    onShareAppMessage: function (t) {

    },
    goLocation() {
        var { longitude, latitude } = this.data.location;
        console.log(longitude);
        wx.openLocation({
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
            scale: 18
        })
    },
    navigatorToCommitOrder: function () {
        var user = LocalStorage.getSync('user');
        if(!user){
            wx.navigateTo({
                url: "../login/login"
            });
            return;
        }else{
          var {basic,roomId,price,rules} = this.data;
          console.log(basic);
          LocalStorage.set('roomDeatal',{
              coverPic:basic.coverPic[0],
              roomId,
              price,
              roomName:basic.roomName,
              maxLive: basic.maxLive,
              roomCount: basic.roomAmount,
              pledge: rules.pledge,
              refundPer: rules.refundPer
          })
          wx.navigateTo({
              url: "./submit/submit"
          });
        }
    },
  navigatorToCalendar: function () {
    wx.navigateTo({
      url: "../date/date"
    });
  },
  markerUpPhone(){
    wx.makePhoneCall({
      phoneNumber: '4006001232' 
    })
  }
});
