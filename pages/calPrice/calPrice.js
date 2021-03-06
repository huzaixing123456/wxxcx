import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';
import httpApi from '../../libs/httpApi';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    week:['日','一','二','三','四','五','六'],
      startDate:'',
      endDate:'',
      today:'',
      calData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var {roomId} = options;
      var {year,month,date} = util.getCurrentDate();
      month = month < 10 ? '0'+month:month;
      date = date < 10 ? '0'+date:date;
      this.setData({
          today:year+''+month+''+date
      });
      httpApi.getCalendar({roomId}).then(res=>{
          var date = JSON.parse(res);
          this.calFormate(date);
      });
  },
  calFormate(data){
      var tagCalData = data.slice(0,6);
      tagCalData.forEach((item,index)=>{
          var year = item.date.toString().substr(0, 4);
          var month = item.date.toString().substr(4, 2);
          item.year = year;
          item.month = month;
          item.data.forEach((e,i)=>{
              var {day} =util.getDateByNum(e.date);
              var week = util.getWeek(parseInt(year),parseInt(month)-1);
              item.week = week;
              e.day = parseInt(day);
          });
      });
      var firstDate = tagCalData[0]['data'][0]['date'];
      var {year,month,day} =util.getDateByNum(firstDate.toString());
      var count = parseInt(day);
      for(var i = (count-1)  ; i > 0 ; i--){
          var j = i;
          j = j<10?'0'+j:j;
          tagCalData[0]['data'].unshift({
              date:year+''+month+''+j,
              num:0,
              day:parseInt(i)
          });
      }
      this.setData({
          calData:tagCalData
      });
      var {startDate,endDate} =  LocalStorage.getSync('checkDate');
      if(startDate && endDate){
          if(this.checkUsed(startDate,endDate)){
              this.setData({
                  startDate,
                  endDate
              });
          }
      }
  },

    setCurrent(e){
        var date = e.currentTarget.dataset.num;
        var item = e.currentTarget.dataset.item;
        var {startDate,endDate,today} = this.data;
        if(date<today){ //今天之前的不可选
            return;
        }
        if(!startDate && !endDate){
            if(item.num == 0){
                util.toast({title:'选择的日期部分订满,请重新选择'});
                return;
            }else{
                this.setData({
                    startDate:date
                })
            }
        }
        if(startDate && !endDate){
            if(startDate == date){
                return;
            }else if(date<startDate){
                if(item.num > 0){
                    this.setData({
                        startDate:date
                    })
                }else{
                    util.toast({title:'选择的日期部分订满,请重新选择'});
                }
            }else {
                if(this.checkUsed(startDate,date)){
                    this.setData({
                        endDate:date
                    })
                    // LocalStorage.set('checkDate',{
                    //     startDate:startDate,
                    //     endDate:date
                    // }).then(res=>{
                    //     //util.toast({title:'选择成功'});
                    //     wx.navigateBack();
                    // })
                }else{
                    util.toast({title:'选择的日期部分订满,请重新选择'});
                }
            }
        }
        if(startDate && endDate){
            if(date == endDate && date.num == 0) return;
            if(item.num > 0){
                this.setData({
                    startDate:date,
                    endDate:''
                })
            }else{
                util.toast({title:'选择的日期部分订满,请重新选择'});
            }
        }
    },

    checkUsed(startDate,endDate){
      var {calData} = this.data;
      if(!startDate||!endDate){
          this.setData({
              isUse:true
          })
      }
      var useArr = [];
      calData.forEach(item=>{
          item.data.forEach(i=>{
            if(i.date>=startDate && i.date<endDate){
                useArr.push(i)
            }
          })
      });
      var index = useArr.findIndex(item=>{
          return item.num == 0
      });
      return index<0?true:false

  },

    cannel(){
        this.setData({
            startDate:'',
            endDate:''
        })
    },
    confrim(){
        var {startDate,endDate} = this.data;
        if(!startDate || !endDate) return;
        LocalStorage.set('checkDate',{
            startDate,
            endDate
        }).then(res=>{
            wx.navigateBack();
        })
    }
})