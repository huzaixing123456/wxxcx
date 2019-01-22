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
      'method': method
    };
    var user = LocalStorage.getSync('user');
    if (user) {
      requestObj['header'] = {};
      requestObj['header']['authorization'] = 'Bearer ' + user['token']
    }
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
        success: (data) => {
          console.log(data);
          wx.hideLoading();
          console.log(data['data']);
          if (data['statusCode'] == 200) {
            var tagetData = data['data'];
            if (tagetData.hasOwnProperty('code')){
              if (tagetData['code'] == 1) {
                resolve(tagetData['data']);
              } else {
                resolve(tagetData);
              }
            }else{
              resolve(tagetData);
            }
          } else if (data['statusCode'] == 401) { //token过期
            reject({ msg: 'token已过期，请重新登录' });
          } else {
            reject();
          }
        },
        fail: () => {
          reject({ msg: '网络错误' });
        }
      };
      wx.request(Object.assign({}, requestObj, callback));
    }).catch(error => {
      showError(error['msg'])
      return Promise.reject();
    })
  }
}

function showError(msg = "网络错误") {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}

export default new Http();

