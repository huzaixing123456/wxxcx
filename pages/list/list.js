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
    noMoreData: false,
    district: '', //位置
    sort: '',     //排序
    maxPage:'',   
    filter: {}, //帅选
    filterLength:''//涮选条件长度
  },
  onLoad(){
    var cityData = LocalStorage.getSync('cityData');
    console.log(cityData);
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
    console.log(start);
    this.setData({
      form: Object.assign(this.data.form, {
        checkInDate: `${start.year}-${start.month}-${start.day}`,
        checkOutDate: `${end.year}-${end.month}-${end.day}`
      }),
      start: `${start.month}.${start.day}`,
      end: `${end.month}.${end.day}`
    });
    var trapeze = LocalStorage.getSync('trapeze');
    this.setData({
      form: Object.assign(this.data.form, {
        longitude: trapeze.longitude,
        latitude: trapeze.latitude
      })
    });
    var cityData = LocalStorage.getSync('cityData');
    this.setData({
      city: Object.assign(this.data.form, {
        city: cityData['cityId']
      })
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
    console.log("这是scroll的底部刷新了", pageNum);
  },
  getData(page = 1) {
    var parmas = this.data.form;
    var tagParam = Object.assign({}, parmas);
    var { district, sort, filter} = this.data;
    if (district){
      if (district['id']){
        tagParam['district'] = district['id'];
      }
      if (district['business']){
        tagParam['businessArea'] = district['business'];
      }
    }
    if(sort){
      tagParam['sort'] = sort['value'];
    }
    if (filter) {
      if (filter.suitPeople){
        tagParam['suitPeople'] = filter.suitPeople;
      }
      if (filter.bedAmount){
        tagParam['bedAmount'] = filter.bedAmount;
      }
      if (filter.bedRoom) {
        tagParam['bedRoom'] = filter.bedRoom;
      }
      if (filter.roomType) {
        tagParam['roomType'] = filter.roomType;
      }
      if (filter.facilities) {
        tagParam['facilities'] = filter.facilities;
      }
    }
    tagParam['pageNum'] = page;
    httpApi.getRoomList(tagParam).then(data => {
      var data = data['content'];
      let listData = this.data.list;
      if(page == 1){
        listData = [];
      }
      if (listData.length == 0 && data.length == 0) {
        this.setData({
          noData: true
        })
        return;
      }
      if (data.length < 10) {
        this.setData({
          noMoreData: true
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
