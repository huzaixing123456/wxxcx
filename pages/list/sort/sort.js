import LocalStorage from '../../../libs/localStorage';
Page({
  data: {
    items: [{
      value: "1",
      name: "推荐排序",
      active: false
    }, {
      value: "2",
      name: "距离排序",
      active: false
    }, {
      value: "3",
      name: "价格低到高",
      active: false
    }, {
      value: "4",
      name: "价格高到低",
      active: false
    }, {
      value: "5",
      name: "好评排序",
      active: false
    }]
  },
  getSort(e){
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var {items} = this.data;
    items.forEach((item,i)=>{
      if(index == i){
        item['active'] = true;
      }else{
        item['active'] = false;
      }
    }) 
    this.setData({
      items
    });
    LocalStorage.set('sort', items[index]).then(res => {
      wx.navigateBack();
    })
  },
  onLoad: function(e) {

  }
});