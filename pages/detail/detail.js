
Page({
    data: {
        isView1: !0,
        isView2: !0,
        isView3: !0,
        isView4: !0,
        isShow: !1,
        isShow2: !1,
        detailList: {
          ImageList:[
            {
              path:"https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg"
            },
            {
              path: "https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg"
            }
          ],
          "introduction":{
            minsu_name: "北京市昌平区沙河镇松兰堡",
            room_special:"这里是房屋描述信息",
            room_intduce:"这里是房屋介绍信息"
          },
          NearbyRomm:[
            {
              pictureURL: "https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg",
              price:300,
              unitName: "北京市昌平区沙河镇松兰堡",
              advantage:["经济","一居室1床2人","5.0分/1点评","近沙河地铁站"]
            },
            {
              pictureURL: "https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg",
              price: 300,
              unitName: "北京市昌平区沙河镇松兰堡",
              advantage: ["经济", "一居室1床2人", "5.0分/1点评", "近沙河地铁站"]
            }
          ],
          bedroomCount:3,
          livingroomCount:2,
          bathroomCount:2,
          kitchenCount:1,
          addExplanation:"名宿",
          roomArea:140,
          recommendedGuests:3,
          bedTypeList:["大床-2.1*1.8-2人"],
          logoPicURL:"https://pic1.ajkimg.com/display/hj/d2d4fb3bb62a358d6ec0c671358eb690/240x180m.jpg",
          unitAddress: "北京市昌平区沙河镇松兰堡",
          merchant:["个人经营","芝麻信用780分"],
          unitNumber:2000,
          decount_list: [
            {
              day: 3,
              discount: 9
            }
          ],
          info:{
            accomAuto:[
              {
                title: "吸烟"
              },
              {
                title: "带宠物"
              },
              {
                title:"做饭"
              },
              {
                title:"加入"
              }
            ],
            washType:{
              wash:"1客1扫",
              clear: "1客1换",
              wash: "入住时间13：00后|退房时间12：00前"
            },
            recepTime: {
              start: "08:00",
              end: "00:00"
            },
          },
          facilities:[
            {
              title:"基础设施",
              child:[
                {
                  title: "wifi"
                },
                {
                  title: "空调"
                },
                {
                  title: "wifi"
                },
                {
                  title: "空调"
                }
              ]
            }
          ],
          refundsRule: [
            {
              statusTexe: "付款方式",
              desc: "全额预付房款"
            },
            {
              statusTexe: "付款方式",
              desc: "全额预付房款"
            },
            {
              statusTexe: "付款方式",
              desc: "全额预付房款"
            }
          ],
          payType:"全额预付房款",
          isComfirm:"下单后既有房，无须等待房东确认",
          is_deposit:0,
          auto: "通过智能门锁自助人住",
          Invoice:"平台代开发票"
        },
        zhoubianList: [],
        date: [],
        starttime: "",
        endtime: "",
        level: "",
        current: 0,
        popupList: [ {
            title: "优选",
            isShow: !1,
            context: "途家优选房屋，误服优质，设施可靠，出行首选"
        }, {
            title: "连住优惠",
            isShow: !1,
            context: "连住多天可享受超值折扣"
        }, {
            title: "闪订",
            isShow: !1,
            context: "下单既有房"
        }, {
            title: "实拍",
            isShow: !1,
            context: "途家摄影师上门拍摄，百分百真实展示"
        }, {
            title: "免押金",
            isShow: !1,
            context: "信用认证达标，即可享受途家担保，无需支付押金"
        }, {
            title: "验真",
            isShow: !1,
            context: "途家实地上门考察，房屋图片，描述，设施真实有效"
        }, {
            title: "智能门锁",
            isShow: !1,
            context: "密码开锁，自助入住和退房，无需等待房东"
        } ],
        facilitiesCount: 30,
        price: "",
        days: 1,
        price:1000
    },
    onLoad: function(t) {

    },
    onShareAppMessage: function(t) {
       
    },
    onShow: function() {
       
    },
    goLocation(){
        wx.openLocation({
            longitude:113.324520,
            latitude:23.099994,
            scale: 18
        })
    },
    navigatorToCommitOrder: function () {
      wx.navigateTo({
        url: "./submit/submit"
      });
    }
});