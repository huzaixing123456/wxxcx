import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';
import httpApi from '../../libs/httpApi';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    week:['一','二','三','四','五','六',' 七'],
      startDate:'20190305',
      endDate:'20190406',
      today:'',
      isUse:false,
      calData:[
        {
          date:201903,
          data:[
              {
                date:20190305,
                num:20
              },
              {
                  date:20190306,
                  num:30
              }
          ]
        },
        {
            date:201904,
            data:[
                {
                    date:20190401,
                    num:0
                },
                {
                    date:20190402,
                    num:0
                },
                {
                    date:20190403,
                    num:30
                }
            ]
        }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // LocalStorage.get('checkDate').then(res=>{
      //     this.setData({
      //         startDate:res['startDate'],
      //         endDate:res['endDate']
      //     });
      // });
      var {roomId} = options;
      var {year,month,date} = util.getCurrentDate();
      month = month < 10 ? '0'+month:month;
      date = date < 10 ? '0'+date:date;
      this.setData({
          today:year+''+month+''+date
      })
      httpApi.getCalendar().then(res=>{
          var date = JSON.parse(res);
          console.log(date);
          this.calFormate(date);
      });
  },
  calFormate(data){
      var tagCalData = data.slice(0,6);
      tagCalData.forEach((item,index)=>{
          console.log(item);
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
      console.log(firstDate);
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
      console.log(tagCalData);
      this.setData({
          calData:tagCalData
      });
      this.checkUsed();
  },

    setCurrent(e){
        var date = e.currentTarget.dataset.num;
        var item = e.currentTarget.dataset.item;
        var {startDate,endDate} = this.data;
        // if(date == startDate || date == endDate) return;
        console.log(date);
        if(startDate && endDate){
            this.setData({
                startDate:date,
                endDate:''
            })
        }else{
            let dateArr = [startDate,endDate,date];
            console.log(dateArr);
            var tagArr = dateArr.filter(item=>{
                console.log(item);
                return !!item;
            }).sort(function (a,b) {
                return a-b;
            });
            if(tagArr.length == 1){
                this.setData({
                    startDate:tagArr[0]
                })
            }else{
                var obj = {
                    startDate:tagArr[0],
                    endDate:tagArr[1]
                };
                this.setData(obj);
            }
        }
        this.checkUsed();
    },

    checkUsed(){
      var {calData,startDate,endDate} = this.data;
      if(!startDate||!endDate){
          this.setData({
              isUse:true
          })
      }
      var useArr = [];
      calData.forEach(item=>{
          item.data.forEach(i=>{
            if(i.date>=startDate && i.date<=endDate){
                useArr.push(i)
            }
          })
      });
      console.log(useArr);
      var index = useArr.findIndex(item=>{
          return item.num == 0
      })
      this.setData({
          isUse:index<0?true:false
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