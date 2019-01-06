import httpApi from '../../libs/httpApi';
import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';

Page({
    data:{
      city:'',
      list:[]
    },
    onShow(){
      this.getData();
      this.getAddress();
    },
    getData(){
      httpApi.getAllCity().then(res => {
        this.setData({
          list:res
        })
      });
    },
    getAddress(){
      LocalStorage.get('cityData').then(data=>{
        this.setData({
          city: data
        })
      })
    },
    changeCity(){

    }
});