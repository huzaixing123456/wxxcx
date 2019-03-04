import LocalStorage from '../../libs/localStorage';
import httpApi from '../../libs/httpApi';
import util from '../../libs/util';

Page({
    data: {
        user:'',
        showFapiao:false
    },
    onShow(){
      var user = LocalStorage.getSync('user');
      this.setData({
        user
      })
    },
    onLoad(){
      util.getLogin().then(wxcode => {
        console.log("code值是" + wxcode);
        httpApi.codeLogin({
          client_id: "wechat-client",
          client_secret: "wechat-client",
          grant_type: "wechat",
          code: wxcode
        }).then(res => {
          var user = {
            token: res['access_token']
          };
          LocalStorage.set('user', user).then(res=>{
            httpApi.getUserInfo().then(res => {
              console.log(res);
              user['mobile'] = res.mobile;
              this.setData({ user });
              LocalStorage.set('user', user);
            })
          });
          console.log(res);
        }).catch(() => {
          
        })
      }); 
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
    fapiaoTip(){
      util.toast({
        title:'发票请联系客服'
      })
      this.setData({
        showFapiao:true
      })
      setTimeout(()=>{
        this.setData({
          showFapiao: false
        })
      },10000)
    },
    logout(){
      httpApi.logout().then(res=>{
        LocalStorage.clear();
      })
    },
    markerUpPhone() {
      wx.makePhoneCall({
        phoneNumber: '4006001232'
      })
    }
});