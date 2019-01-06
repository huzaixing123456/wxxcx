import {
  HTTP
} from './const.js'
 

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
        var requestObj = {};
        //if(method == "GET"){
            var paramsUrl = '';
            for(var i in data){
                paramsUrl = paramsUrl + i + '=' + data[i] + "&";
            }
            paramsUrl = paramsUrl.replace(/&$/,'');
            if(paramsUrl){
                paramsUrl = `?${paramsUrl}`;
                dataUrl = dataUrl + paramsUrl;
            }
        //}
        requestObj = {
            'url' : dataUrl,
            'method':method
        };
        if(method == "POST"){
            requestObj['data'] = data;
        };
        return new Promise((resolve,reject)=>{
            var callback = {
                success:resolve,
                fail:reject
            };
            wx.request(Object.assign({},requestObj,callback));
        }).then(data=>{
            console.log(data);
            wx.hideLoading();
            var data =  data['data'];
            if(data['code'] == 1){
                return data['data'];
            }

        },error=>{
          wx.showToast({
            title: '网络错误',
            icon: 'none',
            duration: 2000
          })
          console.log("加载错误");
        })
    }
}

export default new Http();