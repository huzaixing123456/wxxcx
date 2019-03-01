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
        showNotOpen:false,
        allowLocation:true
    },
    onLoad: function (a) {
      var allowLocation = LocalStorage.getSync("allowLocation");
      this.setData({
        allowLocation
      });
    },
    getDataByCity(cityId) {
        var params = cityId ? { did: cityId } : null;
        httpApi.getRecommend(params).then(res => {
            console.log(res);
            let { rooms, headImg } = res;
            rooms = rooms.map(item => {
                item.coverPic = HTTP.imgPath + item.coverPic
            })
            
          headImg = headImg?HTTP.imgPath + headImg:'https://wx.longmenkezhan.com/images/header.png';
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
                    showNotOpen: !data['isOpen'],
                    allowLocation:true
                });
                LocalStorage.set('allowLocation', true);
                LocalStorage.set('cityData', cityData);
                this.getDataByCity(cityData.cityId);
            });
        }, () => {
            this.getDataByCity();
            LocalStorage.set('allowLocation',false);
          this.setData({
            allowLocation:false
          });
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
        showNotOpen:false
      })
    }
});