import httpApi from '../../../libs/httpApi';
import LocalStorage from '../../../libs/localStorage';

Page({
    data: {
        items: [
        {
            text: "商圈",
            key: "商圈",
            children: []
        }, {
            text: "行政区",
            key: "行政区",
            children: []
        } ],
        activeIndex:0
    },
    onShow(){
      LocalStorage.get('cityData').then(res=>{
        httpApi.getBusiness({
          did:res['cityId']
        }).then(res => {
            console.log(res);
            var {items} = this.data;
            items[0]['children'] = res['businessArea'];
            items[1]['children'] = res['areaCodes'];
            this.setData({
                items
            })
        })
      });
    },
    change(e){
        var index  = e.currentTarget.dataset.index;
        this.setData({
            activeIndex:index
        })
    },
    changeCity(e){
        var item = e.currentTarget.dataset.item;
        console.log(item);
        LocalStorage.set('district',item['district']);
        wx.navigateBack();
    },
    onLoad: function(e) {
        
    }
});