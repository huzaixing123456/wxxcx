import LocalStorage from '../../libs/localStorage';

Page({
    data: {
        user:''
    },
    onShow(){
        var user = LocalStorage.getSync("user");
        if(user){
            this.setData({
                user
            })
        }
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
      LocalStorage.clear();
      this.setData({
        user:''
      })
    },
    markerUpPhone() {
      wx.makePhoneCall({
        phoneNumber: '4006001232'
      })
    }
});