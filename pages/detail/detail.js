import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';
import { HTTP } from '../../libs/const.js';
Page({
    data: {
        basic: '',     //基本信息
        current: 0,    //当前索引
        location: '',   //位置信息
        facility: '',   //基础设施
        bathroom:'',    //卫浴设施
        kitchen:'',     //厨房设施
        recreation:'',  //娱乐设施
        safety:'',      //安保设施
        other:'',       //特色以及其它
        circum:'',       //周边500米
        service:'',      //服务设施
        date: '',        //入住时间
        rules: '',
        additional: '',   //额外费用
        notice: '',
        noPayDate: '',
        halfPayDate: '',
        leaveDate: '',
        roomId:'',
        markers:''
    },
    onShow(){
      console.log("详情页出来了");
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
        var coverPic = HTTP.imgPath + basic['coverPic'];
        basic['coverPic'] = coverPic;
        var bedType = basic['bedType'].replace(/\[|\]|"/g, '').replace(/、/g, ' ');
        bedType = bedType + '张';
        basic['bedType'] = bedType;
        var { basicFacility, bathroomFacility, kitchenFacility, recreationFacility, safetyFacility, otherFacility, circumFacility, serviceFacility} = res;
        basicFacility = basicFacility.filter(item=>{
          return item.active == 1;
        })
        bathroomFacility = bathroomFacility.filter(item => {
          return item.active == 1;
        });
        console.log(bathroomFacility)
        kitchenFacility = kitchenFacility.filter(item => {
          return item.active == 1;
        })
        recreationFacility = recreationFacility.filter(item => {
          return item.active == 1;
        })
        safetyFacility = safetyFacility.filter(item => {
          return item.active == 1;
        })
        otherFacility = otherFacility.filter(item => {
          return item.active == 1;
        })
        circumFacility = circumFacility.filter(item => {
          return item.active == 1;
        })
        serviceFacility = serviceFacility.filter(item => {
          return item.active == 1;
        })
        this.setData({
          basic: res.basic,
          location: res.location,
          markers: [{
            iconPath: '../../assets/location.png',
            id: 0,
            latitude: res.location['latitude'],
            longitude: res.location['longitude'],
            width: 25,
            height: 25
          }],
          facility: basicFacility,
          bathroom: bathroomFacility,
          kitchen: kitchenFacility,
          recreation: recreationFacility,
          safety: safetyFacility,
          other: otherFacility,
          circum: circumFacility,
          service: serviceFacility,
          rules: res.rules,
          additional: res.additional,
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
        var {basic} = this.data;
        if (basic.status != 1 || basic.roomNum == 0) return;
        var user = LocalStorage.getSync('user');
        if(!user){
            wx.navigateTo({
                url: "../login/login"
            });
            return;
        }else{
          var {basic,roomId,rules,notice} = this.data;
          console.log(basic);
          LocalStorage.set('roomDeatal',{
              coverPic:basic.coverPic,
              roomId,
              price: basic['sumRoomPrice'],
              roomName:basic.roomName,
              maxLive: basic.maxLive,
              roomCount: basic.roomAmount,
              pledge: rules.pledge > 0 ? rules.pledgeMoney:0,
              refundPer: rules.refundPer,
              checkInTime: notice['checkInTime'],
              checkOutTime: notice['checkOutTime']
          })
          wx.navigateTo({
              url: "./submit/submit"
          });
        }
    },
  navigatorToCalendar: function () {
    wx.navigateTo({
      url: "../calPrice/calPrice?roomId=" + this.data.roomId
    });
  },
  navigatorToPicture: function () {
    console.log(this.data.roomId);
    wx.navigateTo({
      url: "./picture/picture?roomId=" + this.data.roomId
    });
  },
  markerUpPhone(){
    wx.makePhoneCall({
      phoneNumber: '4006001232' 
    })
  },
  onShareAppMessage: function () {
    var { basic, roomId} = this.data;
    return {
        title: basic.roomName,        
        path:'pages/detail/detail?roomId='+roomId,
　　　　 imageUrl: basic.coverPic
      }
  }
});

