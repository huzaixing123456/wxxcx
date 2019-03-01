import LocalStorage from './libs/localStorage';

App({
  onLaunch: function() {

  },
  onUnload(){
    var user = LocalStorage.getSync('user');
    LocalStorage.clear();
    LocalStorage.set('user',user);

  },
  globalData: {
    userInfo: null
  }
});