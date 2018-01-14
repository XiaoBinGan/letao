/**
 * Created by Administrator on 2018/1/11.
 */



//关闭进度环

//进度条
$(document).ajaxStart(function () {
  NProgress.start();
});
NProgress.configure({showSpinner: false });
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  },500);

});

//非登陆页面，判断当前用户是否是登录了，如果登录了，就继续，如果没登陆，需要跳转到登录页面。
//console.log(location.href);
if(location.href.indexOf("login.html")==-1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function (info) {
      //console.log(info.error);
      if(info.error==400){
        location.href="login.html";
      }
    }
  });
}



//二级分类
$(".down").on("click", function () {
  $(this).next().slideToggle();
});





//给退出按钮注册事件, off:解绑所有的事件
$(".btn_logout").off().on("click", function () {
  //console.log("Hehe");
  //发送ajax请求，退出系统
  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    success:function (data) {

      if(data.success){
        //退出成功
        location.href = "login.html";
      }
    }
  });
});

$(".sildeshow").on("click",function () {
    $(".lt_aside").toggleClass("now");
    $(".min").toggleClass("now1");
    $(".min_title").toggleClass("now2");
  });
