import util from '../../libs/util';

Component({
  properties: {
      year:{
          type: Number
      },
      month:{
          type: Number
      },
      startDate:{
          type: Number
      },
      endDate:{
          type: Number
      }
  },
  data: {
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    year:0,
    month:0
  },
  attached : function () {
    let {year,month} = this.properties;
    var current = util.getCurrentDate();
    this.dateInit(year,month);
    this.setData({
      year: year,
      month: month,
      isToday: parseInt('' + current['year'] + current['month'] + current['date'] )
    })
  },
  methods:{
      dateInit: function (year,month) {
          let dateArr = [];
          let arrLen = 0;
          let {nextYear,nextMonth} = util.getNextMonth(year,month);
          let startWeek = util.getWeek(year,month-1);
          let dayNums = util.getDays(nextYear,nextMonth);
          let obj = {};
          let num = 0;
          arrLen = startWeek + dayNums;
          for (let i = 0; i < arrLen; i++) {
              if (i >= startWeek) {
                  num = i - startWeek + 1;
                  obj = {
                      isToday:util.getStrByNum(year,month,num),
                      dateNum: num
                  }
              } else {
                  obj = {};
              }
              dateArr[i] = obj;
          }
          this.setData({
              dateArr: dateArr
          });
      },
      setCurrent(e){
          var num = e.currentTarget.dataset.num;
          if(num > this.data.isToday){
              this.triggerEvent('myevent', {num});
          }
      }
  }
})
