import http from './http';
import {HTTP} from './const';
import util from './util.js';
//获取所有开通城市
function getAllCity() {
    return http.get('/api/city/list');
}

//获取具体位置信息
function getCityInfo(data) {
    return http.get('/api/city/location',data);
}

//获取详细地址信息
function getAddress(data) {
    return http.get('/api/city/info',data);
}

//获取图片验证码
function getImageCode() {
  var timestamp = new Date().getTime();
  var random = util.getRandomNumber(10);
  return HTTP['prefix'] + '/captcha?timestamp=' + timestamp + '' + random;
}

//获取短信验证码
function getMessageCode(data) {
    return http.post('/api/sms/send',data);
}

//登录接口
function register(data) {
    return http.post('/api/user/reg',data);
}

//获取房屋列表
function getRoomList(data) {
    return http.get('/api/room/list',data);
}

//获取房屋列表
function getRoomDetail(data) {
  return http.get('/api/room/view', data);
}

//获取openId
function getOpenId(data) {
  return http.get('/api/wechat/openid', data);
}

//获取推荐房源
function getRecommend(data) {
  return http.get('/api/room/recommend', data);
}



export default {
    getAllCity,
    getCityInfo,
    getAddress,
    getImageCode,
    getMessageCode,
    register,
    getRoomList,
    getRoomDetail,
    getOpenId,
    getRecommend
}