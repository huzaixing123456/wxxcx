import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';
import {HTTP} from '../../libs/const';

Page({
    data: {
        startDate: "", //开始时间
        endDate: "",  //结束时间
        current:0,    //当前索引
        days: "",     //入住天数
        city: {
          name: "",
          address: "北京市",
          latitude: "",
          longitude: ""
        },
        headImg:'',
        rooms:''
    },
    onLoad: function(a) {
      util.getLocation().then(data => {
        console.log('允许定位啦');
        LocalStorage.set('trapeze', data); //保存经纬度
        return httpApi.getCityInfo(data).then(data => {
          var result = data['result'];
          var cityData = {
            name: result['addressComponent']['city'],
            address: result['formatted_address'],
            cityId: result['addressComponent']['adcode']
          };
          this.setData({
            city: cityData
          });
          LocalStorage.set('cityData', cityData);
          this.getDataByCity(cityData.cityId);
        }); 
      },()=>{
        this.getDataByCity();
        console.log("我不允许定位");
      });
    },
    getDataByCity(cityId){
      httpApi.getRecommend({city:cityId}).then(res=>{
        let { rooms, headImg} = res;
        rooms = rooms.map(item=>{
          item.coverPic = HTTP.imgPath + item.coverPic
        })
        headImg = HTTP.imgPath + headImg;
        this.setData({
          rooms:res.rooms,
          headImg: headImg
        });
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