import util from '../../libs/util';
import httpApi from '../../libs/httpApi';
import {REGEXP} from '../../libs/const';
import LocalStorage from '../../libs/localStorage';

Page({
    data: {
        navId: 1,
        phone:'',
        imageCodeUrl:'',
        imageCode:'',
        code:'',
        timestamp:'',
        codeParams:{
          disable:false,
          initText:'获取验证码',
          timeText:''
        },
        showImageCode:false,
        hasCheckImageCode:false //是否经过图片验证码验证      
    },
    onLoad: function() {
      util.getLogin().then(res=>{
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
      let { phone, imageCode, timestamp, codeParams, showImageCode, hasCheckImageCode} = this.data;
      if (codeParams['disable']) return;
      console.log(phone);
      if (!phone) {
        util.toast({ title: "请输入手机号码" });
        return;
      }
      if (!REGEXP.TELEPHONE.test(phone)) {
        util.toast({ title: "请输入正确的手机号码" });
        return;
      }
      if (!hasCheckImageCode){
        this.setData({
          showImageCode:true
        })
        return;
      }
      var time = 60;
      var tagData = {
        disable: true,
        timeText: time + 's重新发送'
      }
      this.setData({
        codeParams: Object.assign({}, codeParams, tagData)
      });
      var timer = setInterval(()=>{
        if(time == 0){
          var tagData = {
            disable: false,
            timeText: ''
          }
          this.setData({
            codeParams: Object.assign({}, codeParams, tagData)
          });
          clearInterval(timer)
          timer = null;
        }else{
          time--;
          var tagData = {
            disable: true,
            timeText: time + 's重新发送'
          }
          this.setData({
            codeParams: Object.assign({}, codeParams, tagData)
          });
        }
      },1000);
      httpApi.getMessageCode({
          mobile:phone,
          captcha:imageCode,
          timestamp
      }).then(res=>{

      })
    },
    checkImageCode(){
      let {imageCode} = this.data;
      console.log(imageCode);
      if (!imageCode) {
        util.toast({ title: "请输入图形验证码" });
        return;
      }
      if (!REGEXP.CODE.test(imageCode)) {
        util.toast({ title: "请输入正确格式的图片验证码" });
        return;
      }
      this.setData({
        showImageCode: false,
        hasCheckImageCode: true
      });
    },
    login(){
        let {phone,imageCode,code} = this.data;
        if(!phone){
            util.toast({title:"请输入手机号码"});
        }
        if(!REGEXP.TELEPHONE.test(phone)){
            util.toast({title:"请输入正确的手机号码"});
        }
        if(!code){
            util.toast({title:"请输入验证码"});
        }
        if (!REGEXP.CODE.test(code)){
            util.toast({title:"请输入正确格式的验证码"});
        };
        LocalStorage.get('cityData').then(res=>{
          httpApi.codeLogin({
            client_id:"wechat-client", 
            client_secret:"wechat-client",
            grant_type:"smscode",
            mobile:phone,
            did:res['cityId'],
            code:code
          }).then(res=>{
            console.log(res);
            LocalStorage.set(user, {
              token: 'aa001ef9-2eab-4fd7-9a34-c55f0b1a6032',
              telephone: phone
            })
          })
        })        
    },
    getPhoneNumber(e){

    }
});