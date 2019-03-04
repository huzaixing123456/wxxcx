import LocalStorage from './libs/localStorage';

App({
  onLaunch: function() {
    var user = LocalStorage.getSync("user");
    LocalStorage.clear();
    if (user) {
      LocalStorage.set('user', user);
    }
  },
  onUnload(){

  },
  globalData: {
    userInfo: null
  }
});