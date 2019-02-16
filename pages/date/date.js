import util from '../../libs/util';
import LocalStorage from '../../libs/localStorage';

Page({
  data: {
    date:[],
    startDate:'',
    endDate:''
  },
  onLoad: function () {
      LocalStorage.get('checkDate').then(res=>{
          this.setData({
              startDate:res['startDate'],
              endDate:res['endDate']
          });
      });
    var {year ,month} = util.getCurrentDate();
    var date = [];
    for(var i = 0 ; i < 6 ; i++) {
        date.push({
            year,
            month:month + i
        })
    }
    var date = date.map(item=>{
      let {year,month} = item;
      if(month>12){
          year = year + 1;
          month = month - 12;
      }
      return {
          year,
          month
      }
    });
    this.setData({
        date
    })
  },
  getDate(data){
    console.log("修改日期了");
      var {startDate,endDate} = this.data;
      var date = data['detail']['num'];
      if(date == startDate || date == endDate) return;
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
            LocalStorage.set('checkDate',obj).then(res=>{
                wx.navigateBack();
            })
        }
      }
  }
})
