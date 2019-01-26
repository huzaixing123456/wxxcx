class LocalStorage {
  constructor() {

  }

  get(key) {
    console.log(key);
    return new Promise((reslove, reject) => {
      wx.getStorage({
        key,
        success: reslove,
        fail: reject
      })
    }).then(data => {
      return JSON.parse(data.data)['v'];
    });
  }

  getSync(key) {
    console.log(key);
    try {
      const value = wx.getStorageSync(key);
      if (value) {
        return JSON.parse(value)['v'];
      }
      return false;
    } catch (e) {
      
    }
  }

  set(key, value) {
    var data = JSON.stringify({
      v: value
    });
    return new Promise((reslove, reject) => {
      wx.setStorage({
        key,
        data,
        success: reslove,
        fail: reject
      });
    })
  }

  remove(key){
      wx.removeStorageSync(key);
  }

  clear(){
    wx.clearStorageSync();
  }
}

export default new LocalStorage();