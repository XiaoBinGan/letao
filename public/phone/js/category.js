/**
 * Created by Administrator on 2018/1/15.
 */
$(function () {
    function render() {
        $.ajax({
          type:'get',
          url:'/category/queryTopCategory',
          success:function (info) {
            //console.log(info);
            $(".c_l .mui-scroll").html(template("category",info));

          }
        })
    };
  render();


  function cate(id) {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{id:id||1},
      success:function (info) {
        console.log(info);
        $(".c_r .mui-scroll").html(template("category2",info));
      }
    })
  }
  cate();
  $(".c_l").on("click","li",function () {
    $(this).addClass("now").siblings().removeClass("now");
    mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);//100毫秒滚动到顶
    cate($(this).data("id"));
  });
});
