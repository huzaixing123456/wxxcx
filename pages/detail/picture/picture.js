import httpApi from '../../../libs/httpApi';
import {HTTP} from '../../../libs/const';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSwiper:false,
    activeIndex:0,
    current:1,
    activeData:[],
    listData:[
     
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let { roomId } = options;
    httpApi.getRoomImage({roomId}).then(res=>{
      var { balconyPic_500, bathroomPic_500, bedroomPic_500, kitchenPic_500, parlorPic_500,otherPic_500} = res;
      var listData = [{
        name:"全部",
        data:[]
      }];
      listData.push({
        name:'阳台',
        data:balconyPic_500
      });
      listData.push({
        name: '浴室',
        data: bathroomPic_500
      });
      listData.push({
        name: '卧室',
        data: bedroomPic_500
      });
      listData.push({
        name: '厨房',
        data: kitchenPic_500
      });
      listData.push({
        name: '客厅',
        data: parlorPic_500
      });
      listData.push({
        name: '其它',
        data: otherPic_500
      });
      listData.forEach(item=>{
        var data = item.data.map(i=>{
          i = HTTP.imgPath + i;
          return i;
        });
        item['data'] = data;
      })
      this.setData({
        listData
      });
      this.changeData();
    })
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
    
  },
  changeData(){
    var { activeIndex, listData } = this.data;
    var tagArray = [];
    if (activeIndex == 0) { //全部
      listData.forEach(item=>{
        tagArray = tagArray.concat(item.data);
      })
    }else{
      tagArray = listData[activeIndex]['data'];
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
  lookBigPicture(e){ 
    var { index } = e.currentTarget.dataset; 
    console.log(index);
    this.setData({
      showSwiper:true,
      current: index
    })
  },
  closBigPicture(){
    this.setData({
      showSwiper:false
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