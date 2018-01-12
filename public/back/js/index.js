/**
 * Created by Administrator on 2018/1/11.
 */
//初始化图表
var myChart = echarts.init(document.querySelector(".pic_left"));


//s=模拟真实数据传递
var data = [
  {name: "1月", num: 333},
  {name: "2月", num: 200},
  {name: "3月", num: 300},
  {name: "4月", num: 200},
  {name: "5月", num: 100},
  {name: "6月", num: 500}
];
var arr = data.map(function (e, i) {
  return e.num;
})
var arr1 = data.map(function (e, i) {
  return e.name;
});
//console.log(arr1);
//e=模拟真实数据传递

// 指定图表的配置项和数据
var option = {
  title: {
    text: '2017年注册人数'
  },
  tooltip: {},
  legend: {
    data: ['人数']
  },
  xAxis: {
    data: arr1
  },
  yAxis: {},
  series: [{
    name: '人数',
    type: 'bar',
    data: arr
  }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);





//初始化饼图
var myChart1 = echarts.init(document.querySelector(".pic_right"));
var data1=[
  {value: 335, name: '耐克'},
  {value: 310, name: '阿迪'},
  {value: 234, name: '新百伦'},
  {value: 135, name: '迪卡侬'},
  {value: 1548, name: '阿迪王'}
];




var arr3=data1.map(function(e,i){
  return e.name;
});
option = {
  title: {
    text: '热门销售',
    subtext: '2018年1月11号',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data:arr3
  },
  series: [
    {
      name: '销售情况',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data:data1,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
myChart1.setOption(option);

