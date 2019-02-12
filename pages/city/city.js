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
    LocalStorage.get('cityData').then(data => {
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
  }
});