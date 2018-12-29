getApp();

Page({
    data: {
        isLogin: !1
    },
    toLogin:function(){
      wx.navigateTo({
        url: "../login/login"
      });
    }
});