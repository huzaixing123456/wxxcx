import {
  HTTP
} from './const.js'
import LocalStorage from './localStorage';


class Http {
  constructor(options) {

  }


  get(url, data, config) {
    return this._requestGenerator('GET', url, data, config);
  }

  post(url, data, config) {
    return this._requestGenerator('POST', url, data, config);
  }

  _requestGenerator(method, url, data, config) {
    wx.showLoading({
      title: '加载中',
    })
    var dataUrl = HTTP['prefix'] + url;
    var requestObj = {
      'url': dataUrl,
      'method': method,
      'header': {
        'authorization': 'Bearer 85200af1-5111-4802-9f86-9f7aa0194bd8'
      },
    };
    var user = LocalStorage.get('user');
    console.log(user);
    if (method == "POST" && config && config['body']) {
      requestObj['data'] = data;
    } else {
      var paramsUrl = '';
      for (var i in data) {
        paramsUrl = paramsUrl + i + '=' + data[i] + "&";
      }
      paramsUrl = paramsUrl.replace(/&$/, '');
      if (paramsUrl) {
        paramsUrl = `?${paramsUrl}`;
        dataUrl = dataUrl + paramsUrl;
      }
      requestObj['url'] = dataUrl;
    }
    console.log(requestObj);
    return new Promise((resolve, reject) => {
      var callback = {
        success: resolve,
        fail: reject
      };
      wx.request(Object.assign({}, requestObj, callback));
    }).then(data => {
      wx.hideLoading();
      console.log(data);
      var data = data['data'];
      if (!data) {
        showError();
        return Promise.reject();
      } else {
        if (data['code'] == 1) {
          return data['data'];
        }
      }
    }, error => {
      showError();
      console.log("加载错误");
    })
  }
}

function showError() {
  wx.showToast({
    title: '网络错误',
    icon: 'none',
    duration: 2000
  })
}

export default new Http();

// { access_token: "85200af1-5111-4802-9f86-9f7aa0194bd8", token_type: "bearer", … }
// access_token
// :
// "85200af1-5111-4802-9f86-9f7aa0194bd8"
// expires_in
// :
// 431999
// refresh_token
// :
// "92e3a34a-3622-4b5f-8f86-79376f216930"
// scope
// :
// "read write"
// token_type
// :
// "bearer"

//16655793587748864