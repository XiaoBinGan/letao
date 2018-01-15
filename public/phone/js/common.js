/**
 * 底部nav点击高亮
 */
$(".lt_footer").on("click","li",function () {
  //console.log(12);
  $(this).addClass("now").siblings().removeClass("now");
});



/**
 * 初始化区区域滚动
 */
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});