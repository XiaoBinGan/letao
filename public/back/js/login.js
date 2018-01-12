/**
 * Created by Administrator on 2018/1/11.
 */
(function(){
var $form=$("form");
$form.bootstrapValidator({

  //设置小图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //设置校验规则
  fields:{
    username:{
      validators:{
        notEmpty:{
          message:"用户名不能为空"
        },
        callback:{
          message:"用户名不存在"
        }
      }
    },
    password:{
      validators:{
        //非空校验
        notEmpty:{
          message:"用户密码不能为空哦！"
        },
        //长度校验
        stringLength:{
          min:6,
          max:12,
          message:"密码必须是6-12位"
        },
        callback:{
          message:"密码错误"
        }
      }
    }
  }
});


  $form.on("success.form.bv", function(e){
    //阻止表单的默认提交
    e.preventDefault();
    //使用ajax进行提交
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      dataType:"json",
      success:function(info){
        //console.log(info);
        if(info.success){
            location.href="index.html";
        }
        if(info.error==1000){
          $form.data("bootstrapValidator").updateStatus("username","INVALID", "callback")
        }
        if(info.error==1001){
          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }

      }
    });
  });






  $("[type='reset']").on('click',function(){
    $('form').data('bootstrapValidator').resetForm(true);
  })
})();