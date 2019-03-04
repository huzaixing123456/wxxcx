import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';

Page({
  data: {
    city: '',
    list: [],
    toView: ''
  },
  onShow() {
    this.getData();
    this.getAddress();
  },
  getData() {
    httpApi.getAllCity().then(res => {
      console.log(res);
      this.setData({
        list: res
      })
    });
  },
  getAddress() {
    LocalStorage.get('locationCityData').then(data => {
      this.setData({
        city: data
      })
    })
  },
  changeCity(e) {
    var data = e.currentTarget.dataset.item;
    var cityData = {
      name: data['city'],
      cityId: data['did']
    }
    LocalStorage.set("cityData", cityData);
    wx.navigateBack();
  },
  changeView(e){
    var name = e.currentTarget.dataset.name;
    this.setData({
      toView:name
    });
  },
  openLocationTips(){
    var that = this;
    wx.getSetting({
      success: function (res) {
        console.log(res);
        var statu = res.authSetting;
        if (!statu['scope.userLocation']) {
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
            success: function (tip) {
              if (tip.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data.authSetting["scope.userLocation"] === true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      that.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '调用授权窗口失败',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  setLocationCity(){
    var locationCityData = LocalStorage.getSync('locationCityData');
    if (locationCityData){
      LocalStorage.set('cityData', locationCityData);
    }
    wx.navigateBack();
  },
  getLocation() {
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
          locationCityData: cityData
        });
        LocalStorage.set('locationCityData', cityData);
        LocalStorage.set('cityData', cityData);
      });
    }, () => {
      console.log("我不允许定位");
    });
  }
});
