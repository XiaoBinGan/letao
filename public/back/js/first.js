/**
 * Created by Administrator on 2018/1/13.
 */
/**
 * Created by Administrator on 2018/1/13.
 */
$(function () {

  function render() {
    var currentPage = 1;
    var pagesize = 5;
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pagesize
      },
      success: function (info) {
        console.log(info);
        $("tbody").html(template("tpl", info));


        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / pagesize),//总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    });
  }

  render();

  var $form = $("#form");
  $form.bootstrapValidator({

    //配置校验时的图标,
    feedbackIcons: {
      //校验成功的图标
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //配置校验的规则
    //字段，你想要校验哪些字段
    fields: {
      categoryName:{
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          }
        }
      }
    }
  });


  $form.on('success.form.bv', function (e) {
    e.preventDefault();
    //console.log(data);
    $.ajax({
      type: 'post',
      url:'/category/addTopCategory',
      data:$form.serialize(),
      success: function (info) {
        console.log(info);
        if (info.success) {
          $("#myModal1").modal("hide");
          render();
        }
      }
    })
  })
});