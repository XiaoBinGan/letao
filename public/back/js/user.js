/**
 * Created by Administrator on 2018/1/13.
 */
$(function(){

  function render(){
    var currentPage=1;
    var pagesize=5;
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:currentPage,
        pageSize:pagesize
      },
      success:function(info){
        console.log(info);
        $("tbody").html(template("tpl",info));



        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/pagesize),//总页数
          onPageClicked:function(a,b,c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage=page;
            render();
          }
        });
      }
    });
  }
  render();

  $("tbody").on("click",".btn-confirm",function () {
    var id=$(this).parent().data("id");
    var isDelete=$(this).hasClass("btn-danger")?0:1;
    $(".btn-check").off().on("click",function () {
      $.ajax({
        type:'post',
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(info){
          //console.log(info);
          if(info.success){
            $("#myModal1").modal("hide");
            render();
          }
        }
      })

    });

  })

});