layui.use(['table','layer','form','upload','element'], function() {
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var upload = layui.upload;
    var element = layui.element;

    //获取部门
    $.ajax({
        url: "/getDepartmentData",
        dataType: 'json',
        success: function (result) {
            var list = result.list;
            $.each(list,function (i,item) {
                $("#department_name").append("<option value="+item.departmentID+">"+item.departmentName+"</option>");
                $("#departmentName").append("<option value="+item.departmentID+">"+item.departmentName+"</option>");
            })
            form.render();
        }
    });


    //获取角色权限
    $.ajax({
        url: "/getRole",
        dataType: 'json',
        success: function (result) {
            var list = result.list;
            $.each(list,function (i,item) {
                if(item.name==="ROLE_USER"){
                    item.name = "员工";
                }else if(item.name==="ROLE_SUPPLIER"){
                    item.name = "供应方";
                }else if(item.name==="ROLE_DEMAND"){
                    item.name = "需求方";
                }else if(item.name==="ROLE_MANAGER"){
                    item.name = "主任";
                }else if(item.name==="ROLE_ADMIN"){
                    item.name = "管理员";
                }
                $("#role1").append("<option value="+item.id+">"+item.name+"</option>");
                $("#role2").append("<option value="+item.id+">"+item.name+"</option>");
            })
            form.render();
        }
    });


    table.render({
        elem: '#test'
        , url: '/getPersonList'
        , toolbar: '#toolbarDemo'
        , title: '人员列表'
        , cols: [
            [
                {type: 'checkbox', fixed: 'left'}
                , {field: 'user_ID', title: 'ID', hide: true, width: 60, align: 'center'}
                , {field: 'username', title: '姓名', width: 180,align:'center'}
                , {field: 'department', title: '部门', width: 180,align:'center'}
                , {field: 'role', title: '角色权限', hide: true,width: 180,align:'center'}
                , {field: 'name', title: '角色', width: 180,align:'center'}
                , {field: 'user_cancel', title: '状态', width: 180,align:'center'
                    , templet: function (d) {
                        if (d.user_cancel === 0) {
                            return "<span style='color: #FF5722'>注销</span>";
                        } else if (d.user_cancel === 1) {
                            return "<span style='color: #009688'>正常</span>";
                        }
                    }}
            ]
        ]
        , id: 'textReload'
        , page: false
    });


    //头工具栏事件
    table.on('toolbar(test)', function (obj) {
        var type = obj.event;
        if (type === "add") {
            var node = layer.open({
                title: '添加人员'
                , type: 1
                , shift: 4
                , area: ['850px', '650px'] //宽高
                , content: $('#ggggg')
            });
            $("#close_modal").click(function () {
                layer.close(node);
            });
        } else if (type === "delete") {
            var checkRow = table.checkStatus('textReload');
            if (checkRow.data.length > 0) {
                var ID ="";
                $.each(checkRow.data, function (i, o) {
                    ID += o.user_ID + ",";
                });
                ID = ID.substring(0, ID.length - 1);
                node = layer.confirm('是否删除选中的'+checkRow.data.length+'条数据', {
                    btn: ['确定', '取消'], title: "删除",
                    btn1: function (index, layero) {
                        $.ajax({
                            type: "post",
                            url: 'deletePerson?id=' + ID,
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                layer.close(node);
                                if(data.msg===1){
                                    layer.msg("删除失败，存在项目跟用户有关",{icon:2});
                                }else{
                                    layer.msg('删除成功', {icon: 1});
                                    table.reload('textReload', {
                                        url: '/getPersonList',
                                        method: 'post'
                                    });
                                }
                            }
                        })
                    },
                    btn2: function (index, layero) {
                        layer.close(node);
                        table.reload('textReload', {
                            url: '/getPersonList',
                            method: 'post'
                        });
                    }
                });
            } else {
                layer.msg('请选择至少一个用户', {icon: 2});
            }
        }else if(type==="update") {
            var checkRow = table.checkStatus('textReload');
            if (checkRow.data.length > 1 || checkRow.data.length == 0) {
                layer.msg('选择一个人员数据进行编辑操作', {icon: 2});
            }else {
                var user_id = checkRow.data[0].user_ID;
                var user_name = checkRow.data[0].username;
                var department_name = checkRow.data[0].department;
                var role = checkRow.data[0].role;
                $("#userID").val(user_id);
                $("#userName").val(user_name);
                $("#departmentName option:contains('" + department_name + "')").attr("selected", true);
                $("#role2 option[value='"+role+"']").prop("selected",true);
                form.render();
                var node = layer.open({
                    title: '编辑项目'
                    , type: 1
                    , shift: 5
                    , area: ['850px', '650px'] //宽高
                    , content: $('#kkkkk')
                    , cancel: function () {
                        table.reload('textReload', {
                            url: '/getPersonList',
                            method: 'post',
                        });
                    }
                });
                $("#close").click(function () {
                    table.reload('textReload', {
                        url: '/getPersonList',
                        method: 'post',
                    });
                    layer.close(node);
                });
            }
        }else if(type==="cancel"){
            var checkRow = table.checkStatus('textReload');
            if (checkRow.data.length > 0) {
                var ID ="";
                $.each(checkRow.data, function (i, o) {
                    ID += o.user_ID + ",";
                });
                ID = ID.substring(0, ID.length - 1);
                node = layer.confirm('是否注销选中的'+checkRow.data.length+'条数据', {
                    btn: ['确定', '取消'], title: "删除",
                    btn1: function (index, layero) {
                        $.ajax({
                            type: "post",
                            url: 'cancelPerson?id=' + ID,
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                layer.close(node);
                                layer.msg('注销成功', {icon: 1});
                                table.reload('textReload', {
                                    url: '/getPersonList',
                                    method: 'post'
                                });
                            }
                        })
                    },
                    btn2: function (index, layero) {
                        layer.close(node);
                        table.reload('textReload', {
                            url: '/getPersonList',
                            method: 'post'
                        });
                    }
                });
            } else {
                layer.msg('请选择至少一个用户', {icon: 2});
            }
        }else if(type==="use"){
            var checkRow = table.checkStatus('textReload');
            if (checkRow.data.length > 0) {
                var ID ="";
                $.each(checkRow.data, function (i, o) {
                    ID += o.user_ID + ",";
                });
                ID = ID.substring(0, ID.length - 1);
                node = layer.confirm('是否启用选中的'+checkRow.data.length+'条数据', {
                    btn: ['确定', '取消'], title: "删除",
                    btn1: function (index, layero) {
                        $.ajax({
                            type: "post",
                            url: 'usePerson?id=' + ID,
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                layer.close(node);
                                layer.msg('启用成功', {icon: 1});
                                table.reload('textReload', {
                                    url: '/getPersonList',
                                    method: 'post'
                                });
                            }
                        })
                    },
                    btn2: function (index, layero) {
                        layer.close(node);
                        table.reload('textReload', {
                            url: '/getPersonList',
                            method: 'post'
                        });
                    }
                });
            } else {
                layer.msg('请选择至少一个用户', {icon: 2});
            }
        }
    })

})



layui.use([ 'upload','table'], function(){
    var upload = layui.upload;
    var table = layui.table;
    var index
    upload.render({
        elem: '#file', // 文件选择
        accept:'file',
        url: '/uploadFile',
        auto: false, // 设置不自动提交
        bindAction: '#uploadFile', // 提交按钮
        choose: function(obj) {
            obj.preview(function(index, file, result) {
                $("#fileName").html(file.name);
            });
        },
        before:function(obj){
            index = layer.load();
        },
        done: function(res) {
            layer.close(index);
            if(res.res==="0"){
                layer.msg("上传成功",{icon:1,time:2000});
                table.reload('textReload', {
                    url: '/getPersonList',
                    method: 'post',
                });
                $("#fileName").html("");
            }else{
                layer.msg(res.res,{icon:2,time:3000});
                $("#fileName").html("");
            }
        },
        error:function (res) {
            layer.close(index);
            layer.msg("上传错误..");
        }
    });


})




//添加人员
function addPerson() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;

        var user_id = $("#user_id").val();
        var user_name = $("#user_name").val();
        var department_id = $("#department_name option:selected").val();
        var role = $("#role1 option:selected").val();

        if (user_id === "") {
            layer.msg("人员工号不能为空");
        } else if (user_name === "") {
            layer.msg("人员姓名不能为空");
        } else if (department_id === "") {
            layer.msg("部门不能为空");
        } else if (role === "") {
            layer.msg("角色权限不能为空");
        } else {
            $.ajax({
                type: "post",
                url: "/insertPerson",//对应controller的URL
                data: {
                    "user_id": user_id,
                    "user_name": user_name,
                    "department_id": department_id,
                    "role":role
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    var data = data.msg;
                    if(data==="0"){
                        layer.msg("工号已占用",{icon:2});
                    }else if(data==="1"){
                        layer.closeAll();
                        layer.msg('添加成功', {icon: 1});
                        table.reload('textReload', {
                            url: '/getPersonList',
                            method: 'post',
                        });
                    }
                }
            });
        }
    })
}



//编辑人员
function updatePerson() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;
        var user_id = $("#userID").val();
        var user_name = $("#userName").val();
        var department_id = $("#departmentName option:selected").val();
        var role = $("#role2 option:selected").val();
        if(user_id===""){
            layer.msg("人员工号不能为空");
        }else if(user_name===""){
            layer.msg("人员姓名不能为空");
        }else if(department_id===""){
            layer.msg("部门不能为空");
        }else if(role===""){
            layer.msg("角色权限不能为空");
        }else{
            $.ajax({
                type: "post",
                url: "/updatePerson",//对应controller的URL
                data: {
                    "user_id": user_id,
                    "user_name": user_name,
                    "department_id": department_id,
                    "role":role
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.closeAll();
                    layer.msg('修改成功', {icon: 1});
                    table.reload('textReload', {
                        url: '/getPersonList',
                        method: 'post'
                    });
                }
            });
        }
    })
}


function setPassword() {
    layui.use('layer', function () {
        var node = layer.open({
            title: '修改密码'
            , type: 1
            , shift: 4
            , area: ['700px', '400px'] //宽高
            , content: $('#passwordHtml')
        });
        $("#close_time2").click(function () {
            $("#password1").val("");
            $("#password2").val("");
            $("#password3").val("");
            layer.close(node);
        });
    })
}

function changePassword(){
    layui.use('layer', function () {
        var layer = layui.layer;
        var pass1 = $("#password1").val();
        var pass2 = $("#password2").val();
        var pass3 = $("#password3").val();
        if(pass2!=pass3){
            layer.msg("二次输入新密码不一致",{icon:2});
            $("#password1").val("");
            $("#password2").val("");
            $("#password3").val("");
        }else{
            $.ajax({
                url:'/changePassword',
                data:{'pass1':pass1,"pass2":pass2,"user":user_ID},
                success:function (data) {
                    data = JSON.parse(data);
                    if(data.msg==="0"){
                        $("#password1").val("");
                        $("#password2").val("");
                        layer.msg("原密码错误",{icon: 2});
                    }else{
                        layer.closeAll();
                        layer.msg("成功,3秒后重新登录",{icon: 1});
                        setTimeout('location.href="/"',3000); //跳转
                    }

                }
            })
        }

    })
}



layui.use(['table','layer'],function () {
    var table = layui.table;
    var layer = layui.layer;
    var active = {
        reload: function(){
            var demoReload = $('#demoReload');
            //执行重载
            var index = layer.msg("查询中，请稍后...",{icon:16});
            setTimeout(function () {
                table.reload('textReload', {
                    where: {
                        username: demoReload.val(),
                        department:demoReload.val()
                    }
                });
                layer.close(index);
            },800);
        }
    };

    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
})