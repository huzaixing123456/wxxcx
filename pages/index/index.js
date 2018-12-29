import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';


Page({
    data: {
        startDate: "", //开始时间
        endDate: "",  //结束时间
        days: "",     //入住天数

        bannerList: ["https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg?t=1","https://pic1.ajkimg.com/display/hj/f10a54ddb204240a4b5fe7353732ac66/240x180m.jpg?t=1"],
        src: "",
        motto: "休息，休息一下~",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: '',
        cityInfo: {
            city_id: "",
            city_name: "北京市",
            city_lat: "",
            city_lng: ""
        },
        place: "",

        peopleNum: "不限人数",
        isHide: !0,
        current: 0,
        recommendList: [{
            imageURL:"https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg?t=1",
            title:"我的房间1"
        },
            {
                imageURL:"https://pic1.ajkimg.com/display/hj/f10a54ddb204240a4b5fe7353732ac66/240x180m.jpg?t=1",
                title:"我的房间2"
            }]
    },
    onLoad: function(a) {
        util.getLocation().then(data=>{
            return httpApi.getCityInfo(data);
            LocalStorage.set('trapeze',data); //保存经纬度
        }).then(data=>{
            return httpApi.getAddress({
                did:data['did']
            });
        });

        httpApi.getAllCity().then(res=>{
            console.log(res);
        });
    },
    onShow(){
        LocalStorage.get('checkDate').then(res=>{
            var {startDate,endDate} = res;
            var start = util.getDateByNum(startDate);
            var end = util.getDateByNum(endDate);
            var days = util.getCountDay(start,end);
            this.setData({
                startDate:`${start.month}月${start.day}`,
                endDate:`${end.month}月${end.day}`,
                days
            });
        }).catch(err=>{
            var current = util.getCurrentDate();
            var tomorrow = util.getTomorrowDate();
            this.setData({
                startDate:`${current.month}月${current.date}`,
                endDate:`${tomorrow.month}月${tomorrow.date}`,
                days:1
            });
            LocalStorage.set('checkDate',{
                startDate: util.getStrByNum(current.year,current.month,current.date),
                endDate: util.getStrByNum(tomorrow.year,tomorrow.month,tomorrow.date)
            })
        });
    },
    navigatorToCity: function () {
        wx.navigateTo({
            url: "../city/city"
        });
    },
    navigatorToCalendar: function () {
        wx.navigateTo({
            url: "../date/date"
        });
    },
    navigatorToList: function () {
        wx.navigateTo({
            url: "../list/list"
        });
    }
});