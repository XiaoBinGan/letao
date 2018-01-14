/**
 * Created by Administrator on 2018/1/14.
 */
$(function () {
var  imgarr=[];
  var currentPage=1;
  var pageSize=2;
  var Size=1000;
  var $form=$("#form");
    function render() {
      $.ajax({
      type:'get',
        url:'/product/queryProductDetailList',
        data:{
        page:currentPage,
          pageSize:pageSize
      },
        success:function(info){
          console.log(info);
          $("tbody").html(template("tpl",info));
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
      });
      $.ajax({
        type:"get",
        url:'/category/querySecondCategoryPaging',
        data:{
          page:currentPage,
          pageSize:Size
        },
        success:function (data) {
          console.log(data);
          $("select").html(template("tp2",data));

        }
      })
    }
  render();
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      //console.log(data.result);
      imgarr.push(data.result);
      if(imgarr.length>3){
        return;
      };
      $(".img_box").append($('<img src="'+data.result.picAddr+'" alt="" width="100" height="100" style="margin-right:2px ">'));
      //3. 判断数组的长度，如果是3，手动让brandLogo 校验成功即可，  如果不是3，校验失败
      if(imgarr.length==3){
        $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      }else {
        $form.data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
      }
    }

  });




  $form.bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      branch: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          },
        }
      },
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品的名称'
          }
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品的描述'
          }
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品的库存'
          }
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入合法的库存'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '用户名由数字字母下划线和.组成'
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品的尺码'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '用户名由数字字母下划线和.组成'
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '"请输入合法的尺码,例如(32-46)"'
          }
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品的原价'
          }
        }
      },
      statu: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品的价格'
          }
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      },
    }

  });


$form.on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
     var information=$form.serialize();
  information+="&picName1="+imgarr[0].picName+"&picAddr1="+imgarr[0].picAddr;
  information+="&picName2="+imgarr[1].picName+"&picAddr2="+imgarr[1].picAddr;
  information+="&picName3="+imgarr[2].picName+"&picAddr3="+imgarr[2].picAddr;
  console.log(information);
  $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:information,
      success:function (info) {
        //console.log(info);
        if(info.success){
          $("#myModal1").modal("hide");
          //page=1;
          render();
          $form.data("bootstrapValidator").resetForm(true);
        }
      }
  })
  });

















});