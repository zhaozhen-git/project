layui.use(['table','layer','form','upload','element'], function() {
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var element = layui.element;

    table.render({
        elem: '#test'
        , url: '/getDepartmentList'
        , toolbar: '#toolbarDemo'
        , title: '部门列表'
        , cols: [
            [
                {type: 'checkbox', fixed: 'left'}
                , {field: 'departmentID', title: '部门ID', width: 100, align: 'center'}
                , {field: 'departmentName', title: '部门名', width: 180,align:'center'}
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
                title: '添加部门'
                , type: 1
                , shift: 4
                , area: ['650px', '350px'] //宽高
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
                    ID += o.departmentID + ",";
                });
                ID = ID.substring(0, ID.length - 1);
                node = layer.confirm('是否删除选中的'+checkRow.data.length+'条数据', {
                    btn: ['确定', '取消'], title: "删除",
                    btn1: function (index, layero) {
                        $.ajax({
                            type: "post",
                            url: 'deleteDepartment?id=' + ID,
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                layer.close(node);
                                layer.msg('删除成功', {icon: 1});
                                table.reload('textReload', {
                                    url: '/getDepartmentList',
                                    method: 'post'
                                });
                            }
                        })
                    },
                    btn2: function (index, layero) {
                        layer.close(node);
                        table.reload('textReload', {
                            url: '/getDepartmentList',
                            method: 'post'
                        });
                    }
                });
            } else {
                layer.msg('请选择至少一个部门', {icon: 2});
            }
        }else if(type==="update") {
            var checkRow = table.checkStatus('textReload');
            if (checkRow.data.length > 1 || checkRow.data.length == 0) {
                layer.msg('选择一个部门数据进行编辑操作', {icon: 2});
            }else {
                var department_ID = checkRow.data[0].departmentID;
                var department_Name = checkRow.data[0].departmentName;
                $("#departmentID").val(department_ID);
                $("#departmentName").val(department_Name);
                form.render();
                var node = layer.open({
                    title: '编辑部门'
                    , type: 1
                    , shift: 5
                    , area: ['650px', '350px'] //宽高
                    , content: $('#kkkkk')
                    , cancel: function () {
                        table.reload('textReload', {
                            url: '/getDepartmentList',
                            method: 'post',
                        });
                    }
                });
                $("#close").click(function () {
                    table.reload('textReload', {
                        url: '/getDepartmentList',
                        method: 'post',
                    });
                    layer.close(node);
                });
            }
        }
    })

})



//添加部门
function addDepartment() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;

        var department_id = $("#department_id").val();
        var department_name = $("#department_name").val();

        if (department_id === "") {
            layer.msg("部门id不能为空");
        } else if (department_name === "") {
            layer.msg("部门名称不能为空");
        }else {
            $.ajax({
                type: "post",
                url: "/insertDepartment",//对应controller的URL
                data: {
                    "department_id": department_id,
                    "department_name": department_name
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    var data = data.msg;
                    if(data==="0"){
                        layer.msg("部门ID已占用",{icon:2});
                    }else if(data==="1"){
                        layer.closeAll();
                        layer.msg('添加成功', {icon: 1});
                        table.reload('textReload', {
                            url: '/getDepartmentList',
                            method: 'post',
                        });
                    }
                }
            });
        }
    })
}



//编辑部门
function updateDepartment() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;
        var departmentID = $("#departmentID").val();
        var departmentName = $("#departmentName").val();
        if(departmentID===""){
            layer.msg("部门ID不能为空");
        }else if(departmentName===""){
            layer.msg("部门名不能为空");
        }else{
            $.ajax({
                type: "post",
                url: "/updateDepartment",//对应controller的URL
                data: {
                    "departmentID": departmentID,
                    "departmentName": departmentName,
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.closeAll();
                    layer.msg('修改成功', {icon: 1});
                    table.reload('textReload', {
                        url: '/getDepartmentList',
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