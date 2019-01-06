import util from '../../libs/util';
import httpApi from '../../libs/httpApi';
import {REGEXP} from '../../libs/const';
import LocalStorage from '../../libs/localStorage';

Page({
    data: {
        navId: 1,
        phone:18611985439,
        imageCodeUrl:'',
        imageCode:'',
        code:3456,
        timestamp:''      
    },
    onLoad: function(t) {
        util.getLogin().then(res=>{
          // httpApi.getOpenId({
          //   code:res
          // });
          // wx.getUserInfo({
          //   success(res) {
          //     console.log(res);
          //     const userInfo = res.userInfo
          //     const nickName = userInfo.nickName
          //     const avatarUrl = userInfo.avatarUrl
          //     const gender = userInfo.gender // 性别 0：未知、1：男、2：女
          //     const province = userInfo.province
          //     const city = userInfo.city
          //     const country = userInfo.country
          //   }
          // })
            console.log("code值是"+res);
        });
        this.getImage();
    },
    getImage(){
      var timestamp = util.getRandomNumber(10);
      var imageCodeUrl = httpApi.getImageCode({random:timestamp});
      console.log(imageCodeUrl);
      this.setData({
        imageCodeUrl,
        timestamp
      })
    },
    changeNav: function (event) {
        this.setData({
            navId:event.target.dataset.navid
        })
    },
    getPhone(e){
        this.setData({
            phone:e.detail.value
        })
    },
    getImageCode(e){
        this.setData({
            imageCode:e.detail.value
        })
    },
    setCode(e){
        this.setData({
            code:e.detail.value
        })
    },
    getCode(){
        let {phone,imageCode,timestamp} = this.data;
        httpApi.getMessageCode({
            mobile:phone,
            captcha:imageCode,
            timestamp
        }).then(res=>{

        })
    },
    login(){
        let {phone,imageCode,code} = this.data;
        if(!phone){
            util.toast({title:"请输入手机号码"});
        }
        if(!REGEXP.TELEPHONE.test(phone)){
            util.toast({title:"请输入正确的手机号码"});
        }
        if(!imageCode){
            util.toast({title:"请输入图形验证码"});
        }
        if(!REGEXP.CODE.test(imageCode)){
            util.toast({title:"请输入正确格式的图片验证码"});
        }
        if(!code){
            util.toast({title:"请输入验证码"});
        }
        if (!REGEXP.CODE.test(code)){
            util.toast({title:"请输入正确格式的验证码"});
        };
        LocalStorage.get('cityData').then(res=>{
          httpApi.register({
            mobile: phone,
            did:res['cityId'],
            smscode: code
          })
        })
    },
    getPhoneNumber(e){

    }
});