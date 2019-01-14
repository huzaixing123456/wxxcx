Page({
    data: {
      bedRoom:[
        {
          text:"一居",
          id:1,
          active:false
        },
        {
          text: "二居",
          id: 2,
          active: false
        },
        {
          text: "三居",
          id: 3,
          active: false
        },
        {
          text: "四居以以上",
          id: 4,
          active: false
        }
      ],
      roomType:[
        {
          text:"公寓",
          id:1,
          active:false
        },
        {
          text: "复式",
          id: 2,
          active: false
        },
        {
          text: "别墅",
          id: 3,
          active: false
        },
        {
          text: "客栈",
          id: 4,
          active: false
        },
        {
          text: "农家乐",
          id: 5,
          active: false
        },
        {
          text: "木屋",
          id: 6,
          active: false
        },
        {
          text: "四合院",
          id: 7,
          active: false
        },
        {
          text: "渔家乐",
          id: 8,
          active: false
        },
        {
          text: "房车营地",
          id: 9,
          active: false
        },
        {
          text: "树屋",
          id: 10,
          active: false
        },
        {
          text: "帐篷营地",
          id: 11,
          active: false
        }
      ],
      facilities:[
        {
          text: "无线网络",
          id: 1,
          icon:'icon-wifi',
          active: false
        },
        {
          text: "全天热水",
          id: 2,
          icon: 'icon-reshui',
          active: false
        },
        {
          text: "洗衣机",
          id: 3,
          icon: 'icon-xiyiji',
          active: false
        },
        {
          text: "电梯",
          id: 4,
          icon: 'icon-dianti',
          active: false
        },
        {
          text: "浴缸",
          id: 5,
          icon: 'icon-yugang',
          active: false
        },
        {
          text: "空调",
          id: 6,
          icon: 'icon-kongtiao',
          active: false
        },
        {
          text: "电视",
          id: 7,
          icon: 'icon-dianshi',
          active: false
        },
        {
          text: "冰箱",
          id: 8,
          icon: 'icon-bingxiang',
          active: false
        },
      ]
    },
    onLoad: function(t) {

    },
    onShow: function() {

    },
    onUnload: function() {
       
    },
    changeHouse(e){
      var index = e.currentTarget.dataset.index;
      
    }
});