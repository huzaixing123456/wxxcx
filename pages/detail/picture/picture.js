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
     
    ],
    name:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  formate(name,arr){
    if(arr.length == 0)return [];
    var imgArr = [];
    arr.forEach((item)=>{
      var obj = {
        name: name,
        src: HTTP.imgPath + item
      }
      imgArr.push(obj);
    });
    return imgArr;
  },
  onLoad: function (options) {
    let { roomId } = options;
    httpApi.getRoomImage({roomId}).then(res=>{
      var { balconyPic_500, bathroomPic_500, bedroomPic_500, kitchenPic_500, parlorPic_500,otherPic_500} = res;
      var listData = [];
      listData = listData.concat(this.formate('阳台', balconyPic_500));
      listData = listData.concat(this.formate('浴室', bathroomPic_500));
      listData = listData.concat(this.formate('卧室', bedroomPic_500));
      listData = listData.concat(this.formate('厨房', kitchenPic_500));
      listData = listData.concat(this.formate('客厅', parlorPic_500));
      listData = listData.concat(this.formate('其它', otherPic_500));
      var name = listData.map(item=>{
        return item.name;
      });
      var name = [...new Set(name)];
      name.unshift('全部');
      this.setData({
        listData,
        name:name
      });
      this.changeData('全部');
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
  changeData(name){
    var { activeIndex, listData } = this.data;
    var tagArray = [];
    if (name == "全部") { //全部
      tagArray = listData; 
    }else{
      tagArray = listData.filter(item=>{
        return item.name == name;
      })
    }
    this.setData({
      activeData:tagArray
    })
  },
  changeNav(e){
    var {index,name} = e.currentTarget.dataset;
    this.setData({
      activeIndex:index
    })
    this.changeData(name);
  },
  lookBigPicture(e){ 
    var { index } = e.currentTarget.dataset;
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
      this.setData({
          current: e.detail.current
      })
  },
  preventD(){
    return;
  }
})