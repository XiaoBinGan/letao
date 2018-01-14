/**
 * Created by Administrator on 2018/1/13.
 */
$(function () {

  var currentPage=1;
  var pageSize=5;
  function render() {
      $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
          page:currentPage,
          pageSize: pageSize
        },
        success:function (info) {
          console.log(info);
          $("tbody").html(template("tpl",info));
          $("select").html(template("tp2",info));
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: info.page,//当前页
            totalPages: Math.ceil(info.total / pageSize),//总页数
            onPageClicked: function (a, b, c, page) {
              //为按钮绑定点击事件 page:当前点击的按钮值
              currentPage = page;
              render();
            }
          });
        }
      })
    }
  render();


  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      //console.log(data);
      var src=data.result.picAddr;
      $(".img_box img").attr("src",src);
      $("#brandLogo").val(src);
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });






  //表单校验功能
  var $form = $("#form");
  $form.bootstrapValidator({
    excluded: [],//不校验的内容
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验规则
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传品牌图片"
          }
        }
      }
    }
  });


  //给表单注册校验成功事件
  $form.on("success.form.bv", function (e) {
    e.preventDefault();
    console.log(1123);
    //发送ajax
    $.ajax({
      type: "post",
      url:"/category/addSecondCategory",
      data: $form.serialize(),
      success: function (info) {
        console.log(info);
        if (info.success) {
          //成功了
          //1. 关闭模态框
          $("#myModal1").modal("hide");
          //2. 重新渲染第一页
          currentPage = 1;
          render();


          //3. 重置内容和样式
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
        }
      }
    });

  });

//  //测试select
//$(".add-btn").on("click",function () {
//  console.log($("#form").serialize());
//})

});
