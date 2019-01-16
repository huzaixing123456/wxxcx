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
  changeCity() {

  },
  changeView(e){
    var name = e.currentTarget.dataset.name;
    this.setData({
      toView:name
    });
  }
});