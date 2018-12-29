import http from './http';
//获取所有开通城市
function getAllCity() {
    return http.get('/api/city/list');
}

//获取具体位置信息
function getCityInfo(data) {
    return http.get('/api/city/city/location',data);
}

//获取详细地址信息
function getAddress(data) {
    return http.get('/api/city/info',data);
}

//获取图片验证码
function getImageCode() {
    return http.get('/captcha');
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

export default {
    getAllCity,
    getCityInfo,
    getAddress,
    getImageCode,
    getMessageCode,
    register,
    getRoomList
}