import httpApi from "../../../libs/httpApi";
import LocalStorage from '../../../libs/localStorage';
Page({
  data: {
   form:{
       bedRoom:'',  //户型
       suitPeople:'', //人数
       bedAmount:'',  //床铺数
       roomType:''    //房型
      },
      params:{},
      isLoading:false,
      length:false
  },
  onLoad: function (options) {
    var {params} = options;
    this.setData({
        params:JSON.parse(params)
    })
    this.init();
  },
  onShow: function () {

  },
  onUnload: function () {

  },
  init(flag=0){
    var data = {
      suitPeople:'',
      bedAmount:'',
      flag:false,
      bedRoom: [
        {
          text: "一居",
          id: 1,
          active: false
        },
        {
          text: "二居",
          id: 2,
          active: false
        },
        {
          text: "三居",
          id: 3,
          active: false
        },
        {
          text: "四居以以上",
          id: 4,
          active: false
        }
      ],
      roomType: [
          {
            text: "普通公寓",
            id: 1,
            active: false
          },
          {
              text: "酒店式公寓",
              id: 2,
              active: false
          },
          {
              text: "客栈",
              id: 3,
              active: false
          },
          {
              text: "独栋别墅",
              id: 4,
              active: false
          }
      ],
      facilities: [
        {
          text: "无线网络",
          id: 1,
          icon: 'icon-wifi',
            name:"wifi",
          active: false
        },
        {
          text: "全天热水",
          id: 2,
            name:"hotWater",
          icon: 'icon-reshui',
          active: false
        },
        {
          text: "洗衣机",
          id: 3,
            name:"washer",
          icon: 'icon-xiyiji',
          active: false
        },
        {
          text: "电梯",
          id: 4,
          icon: 'icon-dianti',
            name:"elevator",
          active: false
        },
        {
          text: "浴缸",
          id: 5,
            name:"bathtub",
          icon: 'icon-yugang',
          active: false
        },
        {
          text: "空调",
          id: 6,
            name:"airConditioner",
          icon: 'icon-kongtiao',
          active: false
        },
        {
          text: "电视",
          id: 7,
            name:"tv",
          icon: 'icon-dianshi',
          active: false
        },
        {
          text: "冰箱",
          id: 8,
            name:"freezer",
          icon: 'icon-bingxiang',
          active: false
        },
      ],
      isLoading: false,
      length: false
    }
    if(!flag){
      var filter = LocalStorage.getSync('filter');
      if (filter.suitPeople) {
        data['suitPeople'] = filter.suitPeople;
      }
      if (filter.bedAmount) {
        data['bedAmount'] = filter.bedAmount;
      }
      if (filter.bedRoom && filter.bedRoom.length > 0) {
        for (var i = 0; i < filter.bedRoom.length; i++) {
          var tagIndex = data['bedRoom'].findIndex(e => {
            return e.id == filter.bedRoom[i]
          })
          if (tagIndex >= 0) {
            data['bedRoom'][tagIndex]['active'] = true;
          }
        }
      }

      if (filter.roomType && filter.roomType.length > 0) {
        for (var i = 0; i < filter.roomType.length; i++) {
          var tagIndex = data['roomType'].findIndex(e => {
            return e.id == filter.roomType[i]
          })
          if (tagIndex >= 0) {
            data['roomType'][tagIndex]['active'] = true;
          }
        }
      }

      if (filter.facilities && filter.facilities.length > 0) {
        for (var i = 0; i < filter.facilities.length; i++) {
          var tagIndex = data['facilities'].findIndex(e => {
            return e.name == filter.facilities[i]
          })
          if (tagIndex >= 0) {
            data['facilities'][tagIndex]['active'] = true;
          }
        }
      }
    }

    var initData = this.data;
    this.setData(Object.assign({}, initData, data));
    if (flag){
      this.checkData();
    }
  },
  changeHouse(e) {
    var { bedRoom } = this.data;
    var index = e.currentTarget.dataset.index;
    bedRoom[index]['active'] = !bedRoom[index]['active'];
    this.setData({
      bedRoom
    })
    this.checkData();
  },
  changeType(e) {
    var { roomType } = this.data;
    var index = e.currentTarget.dataset.index;
    roomType[index]['active'] = !roomType[index]['active'];
    this.setData({
      roomType
    })
    this.checkData();
  },
  changeAssort(e){
    var { facilities } = this.data;
    var index = e.currentTarget.dataset.index;
    facilities[index]['active'] = !facilities[index]['active']
    this.setData({
      facilities
    })
    this.checkData();
  },
  changeBed(e){
    var tag = parseInt(e.currentTarget.dataset.tag);
    var { bedAmount } = this.data;
    if (tag){
      if (bedAmount >= 10) return;
      bedAmount = bedAmount ? bedAmount+1:1
    }else{
      if (!bedAmount) return;
      bedAmount = bedAmount ? bedAmount - 1 : ''
    }
    this.setData({
      bedAmount
    })
    this.checkData();
  },
  changePeople(e){
    var tag = parseInt(e.currentTarget.dataset.tag);
    var { suitPeople } = this.data;
    if (tag) {
      if (suitPeople>=10) return;
      suitPeople = suitPeople ? suitPeople + 1 : 1
    } else {
      if (!suitPeople) return;
      suitPeople = suitPeople ? suitPeople - 1 : ''
    }
    this.setData({
      suitPeople
    })
    this.checkData();
  },
  checkData(){
    var flag = false;
    var data = {};
    var { bedRoom, roomType, facilities, suitPeople, bedAmount} = this.data;
    if (suitPeople){
      flag = true;
        data.suitPeople = suitPeople
    }

    if (bedAmount){
      flag = true;
        data.bedAmount = bedAmount
    }


    var bed = bedRoom.find(item=>{
      return item.active;
    })
    if(bed){
      flag = true;
      data.bedRoom = bedRoom.map(item=>{
        return item.active?item.id:''
      }).filter(i=>{
        return !!i;
      });
    }

    var room = roomType.find(item => {
      return item.active;
    });
    if (room) {
      flag = true;
      data.roomType = roomType.map(item => {
        return item.active ? item.id : ''
      }).filter(i => {
        return !!i;
      });
    }
    var facilt = facilities.find(item => {
      return item.active;
    })
    if (facilt) {
      flag = true;
      var facilities = facilities.map(item=>{
        return item.active?item.name:'';
      }).filter(e=>{
        return !!e
      });
      data.facilities = facilities;
    }

    this.setData({
      flag
    })
    this.getData(data);
  },
  getData(data){
    var {params} = this.data;
    this.setData({
        isLoading:true
    });
      httpApi.getRoomList(Object.assign({},params,data)).then(res=>{
          this.setData({
            isLoading:false,
            length: res.maxRow
          });
        LocalStorage.set('filter',data);
      }).catch(error=>{
          this.setData({
              isLoading:false
          });
          LocalStorage.set('filter',data);
      })
  },
  reset(){
    this.init(1);
  },
  lookRoom(){
    wx.navigateBack();
  }
});