import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';
import { HTTP } from '../../libs/const';

Page({
    data: {
      form:{
        startDate: "", //开始时间
        endDate: "",   //结束时间,
        sort:0,        //排序方式
        pageNum:1      //分页页码
      },
      start:'',
      end:'',
      list:[],
      noData:'',
      noMoreData:false,
      location:'',
      sort:'',
      filter:[]
    },
    onShow(){
        LocalStorage.get('checkDate').then(res=>{
          var {startDate,endDate} = res;
          var start = util.getDateByNum(startDate);
          var end = util.getDateByNum(endDate);

          this.setData({
            form: Object.assign(this.data.form,{
              startDate: `${start.year}-${start.month}-${start.day}`,
              endDate: `${end.year}-${end.month}-${end.day}`
            }),
            start:`${start.month}.${start.day}`,
            end: `${end.month}.${end.day}`
          });
          return LocalStorage.get('trapeze');
        }).then(res=>{
          this.setData({
            form: Object.assign(this.data.form, {
              longitude:res.longitude,
              latitude:res.latitude
            })
          });
          return LocalStorage.get('cityData');
        }).then(res=>{
          this.setData({
            city: Object.assign(this.data.form, {
              city:res['cityId']
            })
          });
          this.getData();
        })
    },
    initParams(){
      return {
        startDate: "", //开始时间
        endDate: "",   //结束时间,
        sort: 0,        //排序方式
        pageNum: 1      //分页页码
      }
    },
    onBottomRefresh(){
      var { pageNum} = this.data.form;
      var { noMoreData} = this.data;
      if (noMoreData) return;
      this.getData(++pageNum);
      console.log("这是scroll的底部刷新了", pageNum);
    },
    getData(page=1){
      var parmas = this.data.form;
      parmas['pageNum'] = page;
      httpApi.getRoomList(parmas).then(data => {
        let listData = this.data.list;
        if (listData.length == 0 && data.length == 0){
          this.setData({
            noData:true
          })
          return;
        }
        if(data.length < 10){
          this.setData({
            noMoreData:true
          })
        }
        data.forEach(item => {
          item.coverPic = HTTP.imgPath + item.coverPic
        });
        listData = listData.concat(data);
        this.setData({
          list: listData
        });
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