var HTTP = {
  prefix: "https://wx.longmenkezhan.com",
  imgPath: 'https://wx.longmenkezhan.com/images/rooms/'
};


var REGEXP = {
  TELEPHONE: /^1[34578]\d{9}/,
  CODE: /^[0-9]{4}$/,
  IDCARD1: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/,
  IDCARD2: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/,
  PASSPORT:/^([PSE]{1}\\d{7}|[GS]{1}\\d{8})$/,
  OFFICER:/^([\u4e00-\u9fa5]{1,}[\u4e00-\u9fa50-9()（）-]{5,})$/
}

export {
  HTTP,
  REGEXP
}