import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';

Page({
    data: {
        startDate: "", //开始时间
        endDate: "",  //结束时间

        bg_date: "",
        end_date: "",
        place: {
            title: "位置",
            value: "0"
        },
        sort_value: 0,
        sort: [ {
            value: "0",
            name: "排序"
        }, {
            value: "1",
            name: "推荐排序"
        }, {
            value: "2",
            name: "距离排序"
        }, {
            value: "3",
            name: "价格低到高"
        }, {
            value: "4",
            name: "价格高到低"
        }, {
            value: "5",
            name: "好评排序"
        } ],
        filter: [ {
            title: "筛选",
            value: ""
        } ],
        filter_num: 0,
        levelList: [ {
            id: 1,
            title: "豪华",
            url: "icon-jingpin1"
        }, {
            id: 2,
            title: "精品",
            url: "icon-jingpin"
        }, {
            id: 3,
            title: "舒适",
            url: "icon-zuowu-xiaomai"
        } ],
        houseList: [
            {
                activityType:1,
                activityPrice:"200",
                pictureURL:"https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg",
                logoPicURL: "https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg",
                houseLevel:0,
                introduction:{
                    minsu_name:"北京市昌平区沙河镇松兰堡"
                },
                advantage: ["一居室一床2人", "5.0分/1点评","近万博中心地铁"],
                activity:["连住优惠","送门票","可接机"]
            },
            {
                activityType:1,
                activityPrice:"200",
                pictureURL:"https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg",
                logoPicURL: "https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg",
                houseLevel:0,
                introduction:{
                    minsu_name:"北京市昌平区沙河镇松兰堡"
                },
                advantage: ["一居室一床2人", "5.0分/1点评","近万博中心地铁"],
                activity:["连住优惠","送门票","可接机"]
            },{
                activityType:1,
                activityPrice:"200",
                pictureURL:"https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg",
                logoPicURL: "https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg",
                houseLevel:0,
                introduction:{
                    minsu_name:"北京市昌平区沙河镇松兰堡"
                },
                advantage: ["一居室一床2人", "5.0分/1点评","近万博中心地铁"],
                activity:["连住优惠","送门票","可接机"]
            },{
                activityType:1,
                activityPrice:"200",
                pictureURL:"https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg",
                logoPicURL: "https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg",
                houseLevel:0,
                introduction:{
                    minsu_name:"北京市昌平区沙河镇松兰堡"
                },
                advantage: ["一居室一床2人", "5.0分/1点评","近万博中心地铁"],
                activity:["连住优惠","送门票","可接机"]
            }
        ],
        isHideLoadMore: !0,
        isHideNoMore: !1,
        total: 0,
        current_page: 1,
        isWeek: ""
    },
    onShow(){
        this.getData();
        LocalStorage.get('checkDate').then(res=>{
            console.log(res);
            var {startDate,endDate} = res;
            var start = util.getDateByNum(startDate);
            var end = util.getDateByNum(endDate);
            var days = util.getCountDay(start,end);
            this.setData({
                startDate:`${start.month}.${start.day}`,
                endDate:`${end.month}.${end.day}`,
                days
            });
        })
    },
    getData(){
        httpApi.getRoomList({
            city:110100,
            longitude:116.29845,
            latitude:39.95933,
            checkInDate:'20180102',
            checkOutDate:'20180103',
            peopleNum:2,
            sort:1
        }).then(data=>{
            console.log(data);
        })
    },
    toPlace: function () {
        var e = this;
        wx.navigateTo({
            url: "location/location"
        });
    },
    toSort: function () {
        var e = this;
        wx.navigateTo({
            url: "sort/sort"
        });
    },
    toFilter: function () {
        var e = this;
        wx.navigateTo({
            url: "filter/filter"
        });
    },
    toCalendar: function () {
        var e = this;
        wx.navigateTo({
            url: "../date/date"
        });
    },
    navigatorToHouseDetail: function () {
        var e = this;
        wx.navigateTo({
            url: "../detail/detail"
        });
    }
});