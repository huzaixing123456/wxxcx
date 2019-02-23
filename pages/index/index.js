import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';
import { HTTP } from '../../libs/const';

Page({
    data: {
        startDate: "", //开始时间
        endDate: "",  //结束时间
        current: 0,    //当前索引
        days: "",     //入住天数
        city: {
            name: "请选择",
            address: "",
            latitude: "",
            longitude: "",
            isOpen:false
        },
        headImg: '',
        rooms: '',
        peopleNum: '', //入住人数
        showNotOpen:false
    },
    onLoad: function (a) {
      // var params = { "timeStamp": "1550924796", "package": "prepay_id=wx2320263638160627bb3d03352955030885", "paySign": "B322B31B819F8FF08E1E4F920922566D", "appId": "wxf5247441cbca103f", "signType": "MD5", "nonceStr": "AlJrY9GsvCmvK6rq" };
      // console.log(params);
      // console.log(params['appId'], params['timeStamp'], params['nonceStr'], params['package'], params['signType'], params['paySign'])
      // wx.requestPayment({
      //   'timeStamp': params['timeStamp'],
      //   'nonceStr': params['nonceStr'],
      //   'package': params['package'],
      //   'signType': params['signType'],
      //   'paySign': params['paySign'],
      //   'success': function (res) {
      //     console.log("成功了");
      //   },
      //   'fail': function (res) {
      //     console.log("失败了",res);
      //   }
      // })
        console.log("load");
        // httpApi.getRoomPicture({roomId:35}).then(res=>{
        //   console.log(res);
        // })
    },
    getDataByCity(cityId) {
        var params = cityId ? { did: cityId } : null;
        httpApi.getRecommend(params).then(res => {
            console.log(res);
            let { rooms, headImg } = res;
            rooms = rooms.map(item => {
                item.coverPic = HTTP.imgPath + item.coverPic
            })
            headImg = HTTP.imgPath + headImg;
            this.setData({
                rooms: res.rooms,
                headImg: headImg
            });
        });
    },
    getLocation(){
        util.getLocation().then(data => {
            console.log(data);
            LocalStorage.set('trapeze', data); //保存经纬度
            httpApi.getCityInfo(data).then(data => {
                var cityData = {
                    name: data['city'],
                    address: data['addRess'],
                    cityId: data['cid'],
                    isOpen: data['isOpen']
                };
                this.setData({
                    city: cityData,
                    showNotOpen: !!data['isOpen']
                });
                LocalStorage.set('cityData', cityData);
                this.getDataByCity(cityData.cityId);
            });
        }, () => {
            this.getDataByCity();
            console.log("我不允许定位");
        });
    },
    onShow() {
        console.log("show");
        var cityData = LocalStorage.getSync("cityData");
        if (cityData){
            this.setData({
                city: cityData
            });
            this.getDataByCity(cityData.cityId);
        }else{
            this.getLocation();
        }

        LocalStorage.get('checkDate').then(res => {
            var { startDate, endDate } = res;
            var start = util.getDateByNum(startDate);
            var end = util.getDateByNum(endDate);
            var days = util.getCountDay(start, end);
            this.setData({
                startDate: `${start.month}月${start.day}`,
                endDate: `${end.month}月${end.day}`,
                days
            });
        }, () => {
            var current = util.getCurrentDate();
            var tomorrow = util.getTomorrowDate();
            this.setData({
                startDate: `${current.month}月${current.date}`,
                endDate: `${tomorrow.month}月${tomorrow.date}`,
                days: 1
            });
            LocalStorage.set('checkDate', {
                startDate: util.getStrByNum(current.year, current.month, current.date),
                endDate: util.getStrByNum(tomorrow.year, tomorrow.month, tomorrow.date)
            })
        });
        var people = LocalStorage.getSync('people');
        if (people){
            this.setData({
                peopleNum: people['text']
            })
        }
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
    },
    navigatorToDeatail(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../detail/detail?roomId=" + id
        });
    },
    navigatorToPeople() {
        wx.navigateTo({
            url: "../people/people"
        });
    },
    onUnload() {
      var user = LocalStorage.getSync("user");
      LocalStorage.clear();
      LocalStorage.set('user',user);
    },
    closeNotOpen(){
      this.setData({
        showNotOpen:true
      })
    }
});