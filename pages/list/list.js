import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';

Page({
    data: {
        startDate: "", //开始时间
        endDate: "",  //结束时间
        list:''
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
            city: 110101,
            longitude:116.29845,
            latitude:39.95933,
            checkInDate:'2018-01-02',
            checkOutDate:'2018-01-03',
            peopleNum:2,
            sort:1
        }).then(data=>{
            this.setData({
              list:data
            })
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