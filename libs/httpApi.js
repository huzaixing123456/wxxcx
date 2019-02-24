import http from './http';
import { HTTP } from './const';
import util from './util.js';
//获取所有开通城市
function getAllCity() {
  return http.get('/api/city/list');
}

//获取具体位置信息
function getCityInfo(data) {
  return http.get('/api/city/location', data);
}

//获取详细地址信息
function getAddress(data) {
  return http.get('/api/city/info', data);
}

//获取图片验证码
function getImageCode({ random }) {
  return HTTP['prefix'] + '/captcha?timestamp=' + random;
}

//获取短信验证码
function getMessageCode(data) {
  return http.get('/api/sms/send', data);
}

//登录接口
function register(data) {
  return http.post('/api/user/reg', data);
}

//获取房屋列表
function getRoomList(data) {
  return http.post('/api/room/list', data, { body: true });
}

//获取房屋详情
function getRoomDetail(data) {
  return http.get('/api/room/view', data);
}

//房屋图片
function getRoomPicture(data){
  return http.get('/api/room/img',data);
}


//获取推荐房源
function getRecommend(data) {
  return http.get('/api/room/recommend', data);
}

//用户登录
function codeLogin(data) {
  return http.post('/oauth/token', data);
}

//获取openID
function getOpenID(data) {
  return http.get('/api/wechat/jscode', data);
}

//获取商圈
function getBusiness(data) {
  return http.get('/api/city/business', data);
}

//预定下单
function submitOrder(data) {
  return http.post('/oauth-api/order/book', data, { body: true });
}

//订单详情
function getOrderDetail(data) {
  return http.post('/oauth-api/order/view', data);
}

//取消订单
function refundOrder(data) {
  return http.post('/oauth-api/order/refund', data);
}

//删除订单
function deleteOrder(data) {
  return http.post('/oauth-api/order/delete', data);
}

//离店
function leaveOrder(data) {
  return http.post('/oauth-api/order/leave', data);
}

//预取消订单
function applyRefundOrder(data) {
  return http.post('/oauth-api/order/applyRefund', data);
}

//订单列表
function getOrderList(data){
  return http.post('/oauth-api/order/list',data);
}

//获取房屋图片
function getRoomImage(data) {
  return http.get('/api/room/viewImages', data);
}

//获取支付参数
function getPayParams(data) {
    return http.post('/oauth-api/order/toPay', data);
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
  getRoomPicture,
  getRecommend,
  codeLogin,
  getBusiness,
  submitOrder,
  getOrderDetail,
  refundOrder,
  deleteOrder,
  leaveOrder,
  applyRefundOrder,
  getOrderList,
  getOpenID,
  getRoomImage,
  getPayParams
}