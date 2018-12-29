import util from '../../libs/util';
import httpApi from '../../libs/httpApi';
import {REGEXP} from '../../libs/const';

Page({
    data: {
        navId: 1,
        phone:18611985439,
        imageCode:'5862',
        code:3456,

        isLogin: !0,
        fun_id: 2,
        time: "获取验证码",
        currentTime: 61,
        disabled: !1,
        imgUrl: ""
    },
    onLoad: function(t) {
        util.getLogin().then(res=>{
            console.log(res);
        });
        httpApi.getImageCode().then(res=>{

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
        let {phone,imageCode} = this.data;
        httpApi.getMessageCode({
            mobile:phone,
            captcha:imageCode
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
        if(!REGEXP.CODE.test(CODE)){
            util.toast({title:"请输入正确格式的验证码"});
        }
        httpApi.register({
            mobile:phone,
            captcha:imageCode,
            smscode:code
        })

    },
    getPhoneNumber(e){

    }
});