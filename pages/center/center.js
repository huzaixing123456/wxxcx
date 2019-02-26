import LocalStorage from '../../libs/localStorage';
import httpApi from '../../libs/httpApi';
import util from '../../libs/util';

Page({
    data: {
        user:''
    },
    onShow(){
      util.getLogin().then(wxcode => {
        console.log("code值是" + wxcode);
        httpApi.codeLogin({
          client_id: "wechat-client",
          client_secret: "wechat-client",
          grant_type: "wechat",
          code: wxcode
        }).then(res => {
          console.log(res);
          var user = {
            token: res['access_token']
          };
          LocalStorage.set('user',user);
          this.setData({user})
        }).catch(() => {
          var user = LocalStorage.getSync("user");
          if (user) {
            this.setData({
              user
            })
          }
        })
      }); 
    },
    onLoad(){

    },
    navigateToOrder(){
        wx.switchTab({
            url: "../order/order"
        });
    },
    toLogin:function(){
      wx.navigateTo({
        url: "../login/login"
      });
    },
    logout(){
      var trapeze = LocalStorage.getSync('trapeze');
      var allowLocation = LocalStorage.getSync('allowLocation');
      var cityData = LocalStorage.getSync('cityData');
      LocalStorage.clear();
      this.setData({
        user:''
      })
      if (trapeze){
        LocalStorage.set('trapeze', trapeze);
      }
      if (allowLocation) {
        LocalStorage.set('allowLocation', allowLocation);
      }
      if (cityData) {
        LocalStorage.set('cityData', cityData);
      }
    },
    markerUpPhone() {
      wx.makePhoneCall({
        phoneNumber: '4006001232'
      })
    }
});