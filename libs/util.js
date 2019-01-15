//获取登录信息
function getLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code)
        }
      }
    });
  })
}

//获取位置信息经纬度
function getLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      success: resolve,
      fail: reject
    })
  }).then(data => {
    console.log(data)
    let { latitude, longitude } = data;
    return {
      latitude,
      longitude
    };
  })
}

//微信tips
function toast(option) {
  var defaultOption = {
    duration: 2000,
    icon: 'none'
  };
  wx.showToast(Object.assign({}, defaultOption, option))
}

//获取当天日期
function getCurrentDate() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let week = now.getDay();
  return {
    year,
    month,
    date,
    week
  }
}

//获取明天日期
function getTomorrowDate() {
  let current = new Date();
  current.setTime(current.getTime() + 24 * 60 * 60 * 1000);
  let year = current.getFullYear();
  let month = current.getMonth() + 1;
  let date = current.getDate();
  let week = current.getDay();
  return {
    year,
    month,
    date,
    week
  }
}

//获取下一个月日期
function getNextMonth(year, month) {
  if (month >= 12) {
    year += 1;
    month = 1;
  } else {
    month = month + 1;
  }
  return {
    nextYear: year,
    nextMonth: month
  }
}

//获取每月1号对应的星期
function getWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

//获取一个月多少天
function getDays(year, month) {
  return new Date(year, month, 0).getDate();
}

//根据年月日字符串获取日期
function getDateByNum(str, e) {
  var original = str.toString();
  var year = parseInt(original.substr(0, 4));
  var month = parseInt(original.substr(4, 2));
  var day = parseInt(original.substr(6, 2));
  month = month < 10 ? '' + '0' + month : month;
  day = day < 10 ? '' + '0' + day : day;
  if (e) {
    return year + e + month + e + day;
  };
  return {
    year,
    month,
    day
  }
}

//根据年月日生成字符串
function getStrByNum(year, month, date) {
  var month = month < 10 ? '0' + month : month;
  var date = date < 10 ? '0' + date : date;
  return parseInt('' + year + month + date);
}

//计算两个日期之间相差天数
function getCountDay(startDay, endDay) {
  var start = (new Date(startDay['year'], startDay['month'], startDay['day'])).getTime();
  var end = (new Date(endDay['year'], endDay['month'], endDay['day'])).getTime();
  var days = parseInt(Math.ceil((end - start) / 1000 / 60 / 60 / 24));
  return days;
}

//获取随机数
function getRandomNumber(n) {
  var number = Math.random();
  number = number.toFixed(n) * Math.pow(10, n);
  return Math.floor(number);
}


export default {
  getLogin,
  getLocation,
  toast,
  getCurrentDate,
  getTomorrowDate,
  getNextMonth,
  getDateByNum,
  getCountDay,
  getStrByNum,
  getWeek,
  getDays,
  getRandomNumber
}