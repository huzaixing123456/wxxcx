import LocalStorage from '../../libs/localStorage';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        text:'1人',
        num:1,
        active:false
      },
      {
        text: '2人',
        num: 2,
        active: false
      },
      {
        text: '3人',
        num: 3,
        active: false
      },
      {
        text: '4人',
        num: 4,
        active: false
      },
      {
        text: '5人',
        num: 5,
        active: false
      },
      {
        text: '6人',
        num: 6,
        active: false
      },
      {
        text: '7人',
        num: 7,
        active: false
      },
      {
        text: '8人',
        num: 8,
        active: false
      },
      {
        text: '9人',
        num: 9,
        active: false
      },
      {
        text: '10人以上',
        num: 10,
        active: false
      },
      {
        text: '不限人数',
        num: '',
        active: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('load');
    var people = LocalStorage.getSync('people');
    if (people) {
      var { list } = this.data;
      var index = list.findIndex(item => {
        return item.num == people.num
      })
      if (index) {
        list[index] = people;
        this.setData({
          list
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('ready');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('hide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('unload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changePeople(e){
    var {index} = e.currentTarget.dataset; 
    var {list} = this.data;
    
    list.forEach((item,i)=>{
      if (index == i){
        item['active'] = true;
      }else{
        item['active'] = false;
      }
    });
    this.setData({
      list:list
    });
    LocalStorage.set('people',list[index]).then(res=>{
      wx.navigateBack();
    });
  }
})