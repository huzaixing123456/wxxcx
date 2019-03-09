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
        httpApi.codeLogin({
          client_id: "wechat-client",
          client_secret: "wechat-client",
          grant_type: "wechat",
          code: wxcode
        }).then(res => {
          var tempUser = {};
            if(res.code != 401 && res['access_token']){
              var tempUser = {
                    token: res['access_token'],
                    prefix:res['token_type']
                };
              var user = LocalStorage.getSync('user');
              LocalStorage.set('user', tempUser).then(res=>{
                    httpApi.getUserInfo().then(res => {
                      tempUser['mobile'] = res.mobile;
                      var tagUser = Object.assign({}, user, tempUser);
                      LocalStorage.set('user', tagUser);
                      this.setData({ user: tagUser });
                    })
                });
            }
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
        this.setData({
            user:''
        })
        LocalStorage.clear();
      })
    },
    markerUpPhone() {
      wx.makePhoneCall({
        phoneNumber: '4006001232'
      })
    }
});