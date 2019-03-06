import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';
import { HTTP } from '../../libs/const';

Page({
  data: {
    form: {
      checkInDate: "", //开始时间
      checkOutDate: "",   //结束时间,
      pageNum: 1      //分页页码
    },
    start: '',
    end: '',
    list: [],
    noData: '',
    tips:'',
    noMoreData: false,
    district: '', //位置
    sort: '',     //排序
    maxPage:'',   
    filter: {}, //帅选
    filterLength:''//涮选条件长度
  },
  onLoad(){
    var cityData = LocalStorage.getSync('cityData');
    if (cityData) {
      wx.setNavigationBarTitle({
        title: cityData.name
      })
    }
  },
  onShow() {
    var sort = LocalStorage.getSync('sort')||'';
    this.setData({
      sort
    })
    var district = LocalStorage.getSync('district')||'';
    this.setData({
        district
    })
    var filter = LocalStorage.getSync('filter')||{};
    this.setData({
      filter: filter,
      filterLength: Object.keys(filter).length
    })
    var checkDate = LocalStorage.getSync('checkDate');
    var { startDate, endDate } = checkDate;
    var start = util.getDateByNum(startDate);
    var end = util.getDateByNum(endDate);
    var oData = {};
    oData = {
      checkInDate: `${start.year}-${start.month}-${start.day}`,
      checkOutDate: `${end.year}-${end.month}-${end.day}`
    }
    this.setData({
      form: Object.assign(this.data.form, oData),
      start: `${start.month}.${start.day}`,
      end: `${end.month}.${end.day}`
    });
    var trapeze = LocalStorage.getSync('trapeze');
    if (trapeze){
      oData['longitude'] = trapeze.longitude;
      oData['latitude'] = trapeze.latitude;
    }
    var cityData = LocalStorage.getSync('cityData');
    if (cityData){
      oData['city'] = cityData['cityId']
    }
    if (district) {
      if (district['id']) {
        oData['district'] = district['id'];
      }
      if (district['business']) {
        oData['businessArea'] = district['business'];
      }
    }
    if (sort) {
      oData['sort'] = sort['value'];
    }
    if (filter) {
      if (filter.suitPeople) {
        oData['suitPeople'] = filter.suitPeople;
      }
      if (filter.bedAmount) {
        oData['bedAmount'] = filter.bedAmount;
      }
      if (filter.bedRoom) {
        oData['bedRoom'] = filter.bedRoom;
      }
      if (filter.roomType) {
        oData['roomType'] = filter.roomType;
      }
      if (filter.facilities) {
        oData['facilities'] = filter.facilities;
      }
    }
    this.setData({
      form: oData
    });
    this.getData();
  },
  initParams() {
    return {
      checkInDate: "", //开始时间
      checkOutDate: "",   //结束时间,
      sort: 0,        //排序方式
      pageNum: 1      //分页页码
    }
  },
  onBottomRefresh() {
    var { pageNum } = this.data.form;
    var { noMoreData } = this.data;
    if (noMoreData) return;
    this.getData(++pageNum);
  },
  getData(page = 1) {
    var parmas = this.data.form;
    var tagParam = Object.assign({}, parmas);
    var { district, sort, filter} = this.data;
    tagParam['pageNum'] = page;
    httpApi.getRoomList(tagParam).then(data => {
      var content = data['content'];
      let listData = this.data.list;
      if(page == 1){
        listData = [];
      }
      if (data.maxRow == 0) {
        this.setData({
          noData: true,
          tips: Object.keys(filter).length > 0 ? '当前筛选条件下无房，建议修改筛选条件' :'您附近无房或已客满'
        })
      }
      if (content.length < 10) {
        this.setData({
          noMoreData: true
        })
      }
      content.forEach(item => {
        item.coverPic = HTTP.imgPath + item.coverPic
      });
      listData = listData.concat(content);
      this.setData({
        list: listData
      });
    })
  },
    toLocation: function () {
    wx.navigateTo({
      url: "location/location"
    });
  },
  toSort: function () {
    wx.navigateTo({
      url: "sort/sort"
    });
  },
  toFilter: function () {
    var {form} = this.data;
    wx.navigateTo({
      url: "filter/filter?params="+ JSON.stringify(form)
    });
  },
  toCalendar: function () {
    wx.navigateTo({
      url: "../date/date"
    });
  },
  navigatorToHouseDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../detail/detail?roomId=" + id
    });
  },
    onUnload(){
        LocalStorage.remove("filter");
        LocalStorage.remove("location");
        LocalStorage.remove("sort");
        LocalStorage.remove("district");
    }
});
