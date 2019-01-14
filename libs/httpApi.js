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
function getImageCode({random}) {
  return HTTP['prefix'] + '/captcha?timestamp=' + random;
}

//获取短信验证码
function getMessageCode(data) {
    return http.get('/api/sms/send',data);
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

//用户登录
function codeLogin(data){
  return http.post('/oauth/token', data);
}

//获取商圈
function getBusiness(data){
  return http.get('/api/city/business',data);
}

//预定下单
function submitOrder(data) {
  return http.post('/book', data,{body:true});
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
    getRecommend,
    codeLogin,
    getBusiness,
    submitOrder
}