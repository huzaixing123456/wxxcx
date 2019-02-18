import httpApi from '../../../libs/httpApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSwiper:false,
    activeIndex:0,
    current:1,
    activeData:[],
    list:[
      {
        type:0,
        name:'全部',
        data:[]
      },
      {
        type: 1,
        name: '客厅',
        data: [
          {
            name: '客厅',
            id: "",
            link: 'https://wx.longmenkezhan.com/images/rooms/201901222219338630.jpg'
          },
          {
            name: '客厅',
            id: "",
            link: 'https://wx.longmenkezhan.com/images/rooms/201901222219338630.jpg'
          }
        ]
      },
      {
        type: 2,
        name: '卧室',
        data: [
          {
            name: '卧室',
            id: "",
            link: 'https://wx.longmenkezhan.com/images/rooms/201901222219338630.jpg'
          },
          {
            name: '卧室',
            id: "",
            link: 'https://wx.longmenkezhan.com/images/rooms/201901222219338630.jpg'
          },
          {
            name: '卧室',
            id: "",
            link: 'https://wx.longmenkezhan.com/images/rooms/201901222219338630.jpg'
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let { roomId } = options;
    httpApi.getRoomImage({roomId})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.changeData();
  },
  changeData(){
    var { activeIndex, list } = this.data;
    var tagArray = [];
    if (activeIndex == 0) { //全部
      list.forEach(item=>{
        tagArray = tagArray.concat(item.data);
      })
    }else{
      tagArray = list[activeIndex]['data'];
    }
    this.setData({
      activeData:tagArray
    })
  },
  changeNav(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex:index
    })
    this.changeData();
  },
  lookBigPicture(){
    this.setData({
      showSwiper:!this.data.showSwiper
    })
  },
  switchChange(e) {
    console.log(e.detail.current);
      this.setData({
          current: e.detail.current
      })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  }
})