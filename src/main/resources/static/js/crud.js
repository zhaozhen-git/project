//全局变量
//项目id
var project;

//关键节点id
var event;

var Index;




// 创建加载后台布局函数
layui.use('element', function(){
    var element = layui.element;
    //获取部门
    $.ajax({
        url: "/getDepartmentData",
        dataType: 'json',
        success: function (result) {
            var list = result.list;
            $.each(list,function (i,item) {
                $("#dep").append("<option value="+item.departmentID+">"+item.departmentName+"</option>");
            })
        }
    });
    element.render();
});

// 创建加载时间选择函数
layui.use('laydate', function(){
    var laydate = layui.laydate;
    laydate.render({
        elem: '#project_duringtime',
        range: true
    });
    laydate.render({
        elem:'#duringTime',
        range: true
    });
    laydate.render({
        elem:'#during_time',
        range: true
    });
    laydate.render({
        elem:'#time',
        range: true
    });
    laydate.render({
        elem:'#extraT'
    });
    laydate.render({
        elem:'#extra_time'
    })
    laydate.render({
        elem:'#time1'
    })
});


function calendar(){
    getDataList(project);
}



// function sentMsg(){
//     var project_name = $("#project_name").val();
//     var project_director = $("#project_director").text();
//     var project_duringtime = $("#project_duringtime").val();
//     if(project_name===""){
//         layer.msg("任务名不能为空");
//     }else if(project_director===""){
//         layer.msg("负责人不能为空");
//     }else if(project_duringtime===""){
//         layer.msg("完成周期不能为空");
//     }else{
//         $.ajax({
//             type: "post",
//             url: "/insertProject",//对应controller的URL
//             async: false,
//             dataType: 'json',
//             data: {
//                 "project_name":$("#project_name").val(),
//                 "project_director":$("#project_director").text(),
//                 "project_duringtime":$("#project_duringtime").val(),
//                 "detailed_information":$("#detailed_information").val()
//             },
//             success: function (data) {
//                 $("#unfinish").empty();
//                 $("#finish").empty();
//                 getDataList(data.id);
//                 First();
//                 $("dl#unfinish dd").removeClass("selected");
//                 $("dl#finish dd").removeClass("selected");
//                 $("#"+data.id).parent().addClass("selected");
//                 project = data.id;
//                 layer.open({
//                     content:'<div style="text-align:center;padding:30px;font-size:16px;"><img src="../../img/1234.png"><i>恭喜你创建成功！</br>你可以预览计划日历或者添加事件节点。</i></div>'
//                     ,area:['400px','250px']
//                     ,btn:['预览任务计划','继续编辑事件节点']
//                     ,btn1:function(index){
//                         $('#page_1').removeClass("layui-this");
//                         $('#page_2').addClass("layui-this");
//                         $('#one').toggleClass("layui-show");
//                         $('#two').addClass("layui-show");
//                         layer.close(index);
//                         getDataList(project);
//                     }
//                     ,btn2:function(index,layero){
//                         $('#page_1').removeClass("layui-this");
//                         $('#page_3').addClass("layui-this");
//                         $('#one').toggleClass("layui-show");
//                         $('#three').addClass("layui-show");
//                         layer.close(index);
//                     }
//                 });
//             }
//         });
//     }
//
// }



//加载日历
window.onload=function () {
    layui.use(['table','layer','form','element'], function() {
        var table = layui.table;
        var layer = layui.layer;
        var form = layui.form;
        var element = layui.element;

        //当选中部门后，联动加载用户
        form.on('select(department)',function (data) {
            $.ajax({
                url:"/getDepartmentUser",
                dataType:"json",
                data:{"departmentID":data.value},
                success:function (result) {
                    var list = result.list;
                    $("#user").html("");
                    $.each(list,function (i,item) {
                        $("#user").append("<option value="+item.user_ID+">"+item.user_name+"</option>");
                    })
                    form.render();
                }
            })
        })

        table.render({
            elem: '#test'
            , url: '/getBrandList?id=' + project + '&username='+user_ID
            , toolbar: '#toolbarDemo'
            , title: '用户数据表'
            , cols: [
                [
                    {type: 'checkbox', fixed: 'left'}
                    , {field: 'event_id', title: 'ID', hide: true, width: 60, align: 'center'}
                    , {field: 'event_name', title: '事件节点名称', width: 200}
                    , {field: 'event_description', title: '节点详情描述', width: 340}
                    , {field: 'user_name', title: '负责组长', width: 100}
                    // , {field: 'event_phone', title: '电话', width: 180,align:'center'}
                    , {field: 'event_startTime', title: '开始时间', width: 120, align: 'center'}
                    , {
                    field: 'days', title: '计划节点时长', width: 120, align: 'center'
                    , templet: function (d) {
                        return d.days + "天"
                    }
                }
                    , {
                    field: 'event_state', title: '事件紧急情况', width: 120, align: 'center'
                    , templet: function (d) {
                        if (d.event_state === 0) {
                            return "正常";
                        } else if (d.event_state === 1) {
                            return "紧急";
                        }
                    }
                }
                    , {
                    field: 'event_success', title: '状态', width: 100, align: 'center'
                    , templet: function (d) {
                        if (d.event_success === 0) {
                            return "完成";
                        } else if (d.event_success === 1) {
                            return "未完成";
                        }
                    }
                }
                    , {
                    field: 'event_progress', title: '完成进度', width: 150,align:'center'
                    , templet: function (d) {
                        var html = '<div class="layui-progress">';
                        html += '<div class="layui-progress-bar"  lay-percent="'+d.event_progress+'%"></div>';
                        html +='</div>';
                        return html;
                    }
                }
                ]
            ]
            , id: 'textReload'
            , page: false
            ,done:function () {
                element.render();
            }
        });


        //个人待办事项
        table.render({
            elem: '#fourHtml'
            , url: '/getExtraList?id=' + project + '&username='+user_ID
            , toolbar: '#toolDemo'
            , title: '用户数据表'
            , cols: [
                [
                    {type: 'checkbox', fixed: 'left'}
                    , {field: 'extra_ID', title: 'ID', hide: true, width: 60, align: 'center'}
                    , {field: 'extra_name', title: '事件节点名称', width: 200}
                    , {field: 'user_name', title: '负责人', width: 150}
                    , {field: 'extra_add', title: '创建人', width: 150}
                    , {field: 'extra_time', title: '时间', width: 120, align: 'center'}
                    , {
                    field: 'extra_success', title: '状态', width: 120, align: 'center'
                    , templet: function (d) {
                        if (d.extra_success === 0) {
                            return "完成";
                        } else if (d.extra_success === 1) {
                            return "未完成";
                        }
                    }
                }
                ]
            ]
            , id: 'extraReload'
            , page: false
            ,done:function () {
                element.render();
            }
        });


        //全部待办事项
        table.render({
            elem: '#fourTable'
            , url: '/getExtraHtml?id='+ project
            , toolbar: '#toolDemo1'
            , title: '用户数据表'
            , cols: [
                [
                    {type: 'checkbox', fixed: 'left'}
                    , {field: 'extra_ID', title: 'ID', hide: true, width: 60, align: 'center'}
                    , {field: 'extra_name', title: '事件节点名称', width: 200}
                    , {field: 'user_name', title: '负责人', width: 150}
                    , {field: 'extra_add', title: '创建人', width: 150}
                    , {field: 'extra_time', title: '时间', width: 120, align: 'center'}
                    , {
                    field: 'extra_success', title: '状态', width: 120, align: 'center'
                    , templet: function (d) {
                        if (d.extra_success === 0) {
                            return "完成";
                        } else if (d.extra_success === 1) {
                            return "未完成";
                        }
                    }
                }
                ]
            ]
            , id: 'extra'
            , page: false
            ,done:function () {
                element.render();
            }
        });


        //项目员工
        table.render({
            elem: '#fiveHtml'
            , url: '/getUserList?id=' + project
            , toolbar: '#userDemo'
            , title: '用户数据表'
            , cols: [
                [
                    {type: 'checkbox', fixed: 'left'}
                    , {field: 'project_ID', title: 'ID', hide: true, width: 60, align: 'center'}
                    , {field: 'departmentID', title: '部门id', hide: true, width: 60, align: 'center'}
                    , {field: 'user_ID', title: '工号', hide: true, width: 120, align: 'center'}
                    , {field: 'departmentName', title: '部门名称', width: 120,align:'center'}
                    , {field: 'user_name', title: '姓名', width: 120,align:'center'}
                ]
            ]
            , id: 'userReload'
            , page: false
            ,done:function () {
                element.render();
            }
        });


        //头工具栏事件
        table.on('toolbar(test)', function (obj) {
            if (project === undefined) {
                layer.msg('请选择一个项目', {icon: 2});
            } else {
                var type = obj.event;
                if (type === "add") {
                    var node = layer.open({
                        title: '添加节点'
                        , type: 1
                        , shift: 4
                        , area: ['750px', '600px'] //宽高
                        , content: $('#ggggg')
                    });
                    $("#close_modal").click(function () {
                        layer.close(node);
                    });
                } else if (type === "delete") {
                    var checkRow = table.checkStatus('textReload');
                    if (checkRow.data.length > 0) {
                        var ID = "";
                        $.each(checkRow.data, function (i, o) {
                            ID += o.event_id + ",";
                        });
                        ID = ID.substring(0, ID.length - 1);
                        var node = layer.confirm('是否删除选中的' + checkRow.data.length + '条数据', {
                            btn: ['确定', '取消'], title: "删除", btn1: function (index, layero) {
                                $.ajax({
                                    type: "post",
                                    url: 'deleteBrand?id=' + ID,
                                    dataType: "json",
                                    async: false,
                                    success: function (data) {
                                        layer.close(node);
                                        layer.msg('删除成功', {icon: 1});
                                        table.reload('textReload', {
                                            url: '/getBrandList?id=' + project,
                                            method: 'post',
                                        });
                                        //重现加载用户详情页面
                                        load();
                                    }
                                })
                            },
                            btn2: function (index, layero) {
                                layer.close(node);
                                table.reload('textReload', {
                                    url: '/getBrandList?id=' + project,
                                    method: 'post',
                                });
                            }
                        });
                    } else {
                        layer.msg('请选择至少一个事件', {icon: 2});
                    }
                } else if (type === "update") {
                    var checkRow = table.checkStatus('textReload');
                    if (checkRow.data.length > 1 || checkRow.data.length == 0) {
                        layer.msg('选择一个事件进行编辑操作', {icon: 2});
                    } else {
                        var event_name = checkRow.data[0].event_name;
                        var group_leader = checkRow.data[0].event_groupLeader;
                        var start_time = checkRow.data[0].event_startTime;
                        var end_Time = checkRow.data[0].event_endTime;
                        var during_time = start_time + " - " + end_Time;
                        var event_description = checkRow.data[0].event_description;
                        var event_state = checkRow.data[0].event_state;
                        var event_success = checkRow.data[0].event_success;
                        if (event_success === 0) {
                            event_success = "完成";
                        } else {
                            event_success = "未完成";
                        }
                        event = checkRow.data[0].event_id;
                        $("#event_name").val(event_name);
                        $("#group_leader option:contains('"+group_leader+"')").attr("selected",true);
                        form.render();
                        $("#during_time").val(during_time);
                        $("#event_description").val(event_description);
                        $("#change_state").val(event_success);
                        $("#select").find("option[value=" + event_state + "]").attr("selected", true);
                        var node = layer.open({
                            title: '编辑节点'
                            , type: 1
                            , shift: 5
                            , area: ['700px', '680px'] //宽高
                            , content: $('#kkkkk')
                        });
                        $("#close").click(function () {
                            layer.close(node);
                        });
                    }
                } else if (type == "success") {
                    var checkRow = table.checkStatus('textReload');
                    if (checkRow.data.length > 1 || checkRow.data.length == 0) {
                        layer.msg('选择一个事件进行完成操作', {icon: 2});
                    } else {
                        var id = checkRow.data[0].event_id;
                        var node = layer.confirm('是否更改选中的' + checkRow.data.length + '条数据的完成状态', {
                            btn: ['确定', '取消'], title: "完成状态的更改", btn1: function (index, layero) {
                                $.ajax({
                                    type: "post",
                                    url: 'successBrand?id=' + id,
                                    dataType: "json",
                                    async: false,
                                    success: function (data) {
                                        layer.close(node);
                                        layer.msg('更改成功', {icon: 1});
                                        table.reload('textReload', {
                                            url: '/getBrandList?id=' + project,
                                            method: 'post',
                                        });
                                        //重现加载用户详情页面
                                        load();
                                    }
                                })
                            },
                            btn2: function (index, layero) {
                                layer.close(node);
                                table.reload('textReload', {
                                    url: '/getBrandList?id=' + project,
                                    method: 'post',
                                });
                            }
                        });
                    }
                } else if (type == "time") {
                    var checkRow = table.checkStatus('textReload');
                    if (checkRow.data.length > 1 || checkRow.data.length == 0) {
                        layer.msg('选择一个事件进行编辑时间操作', {icon: 2});
                    } else {
                        event = checkRow.data[0].event_id;
                        var start_time = checkRow.data[0].event_startTime;
                        var end_Time = checkRow.data[0].event_endTime;
                        var during_time = start_time + " - " + end_Time;
                        $("#time").val(during_time);
                        $("#select1 option[value='1']").attr("selected", "true");
                        var node = layer.open({
                            title: '编辑时间'
                            , type: 1
                            , shift: 4
                            , area: ['700px', '300px'] //宽高
                            , content: $('#tttt')
                        });
                        $("#close_time").click(function () {
                            layer.close(node);
                        });

                    }
                }else if (type == "progress") {
                    var checkRow = table.checkStatus('textReload');
                    if (checkRow.data.length > 1 || checkRow.data.length == 0) {
                        layer.msg('选择一个事件进行编辑进度条操作', {icon: 2});
                    } else {
                        event = checkRow.data[0].event_id;
                        var event_progress = checkRow.data[0].event_progress;
                        $("#progressNum").val(event_progress);
                        var node = layer.open({
                            title: '编辑进度条'
                            , type: 1
                            , shift: 4
                            , area: ['700px', '250px'] //宽高
                            , content: $('#progressHtml')
                        });
                        $("#close_progress").click(function () {
                            layer.close(node);
                        });

                    }
                }
            }
        })



        //待办理事件头工具栏事件
        table.on('toolbar(fourHtml)', function (obj) {
            if (project === undefined) {
                layer.msg('请选择一个项目', {icon: 2});
            } else {
                var type = obj.event;
                if (type === "add1") {
                    var node = layer.open({
                        title: '添加待办理事件'
                        , type: 1
                        , shift: 4
                        , area: ['750px', '400px'] //宽高
                        , content: $('#addExtra')
                    });
                    $("#close_extra").click(function () {
                        layer.close(node);
                    });
                } else if (type === "delete1") {
                    var checkRow = table.checkStatus('extraReload');
                    if (checkRow.data.length > 0) {
                        var ID = "";
                        var addPerson = "";
                        $.each(checkRow.data, function (i, o) {
                            ID += o.extra_ID + ",";
                            addPerson += o.extra_add + ",";
                        });
                        if(addPerson.indexOf(account)===-1){
                            layer.msg('不是创建人，无法删除', {icon: 2});
                        }else{
                            ID = ID.substring(0, ID.length - 1);
                            var node = layer.confirm('是否删除选中的' + checkRow.data.length + '条数据', {
                                btn: ['确定', '取消'], title: "删除", btn1: function (index, layero) {
                                    $.ajax({
                                        type: "post",
                                        url: 'deleteExtra?id=' + ID,
                                        dataType: "json",
                                        async: false,
                                        success: function (data) {
                                            layer.close(node);
                                            layer.msg('删除成功', {icon: 1});
                                            table.reload('extraReload', {
                                                url: '/getExtraList?id=' + project + '&username=' + user_ID,
                                                method: 'post',
                                            });
                                            table.reload('extra', {
                                                url: '/getExtraHtml?id=' + project,
                                                method: 'post',
                                            });
                                            //重现加载用户详情页面
                                            load();
                                        }
                                    })
                                },
                                btn2: function (index, layero) {
                                    layer.close(node);
                                    table.reload('extraReload', {
                                        url: '/getExtraList?id=' + project + '&username=' + user_ID,
                                        method: 'post',
                                    });
                                    table.reload('extra', {
                                        url: '/getExtraHtml?id=' + project,
                                        method: 'post',
                                    });
                                }
                            });
                        }
                    } else {
                        layer.msg('请选择至少一个事件', {icon: 2});
                    }
                } else if (type === "update1") {
                    var checkRow = table.checkStatus('extraReload');
                    if (checkRow.data.length > 1 || checkRow.data.length == 0) {
                        layer.msg('选择一个事件进行编辑操作', {icon: 2});
                    } else {
                        var extra_add = checkRow.data[0].extra_add;
                        if(extra_add!=account){
                            layer.msg('不是创建人，无法更改', {icon: 2});
                        }else{
                            var extra_name = checkRow.data[0].extra_name;
                            var extra_person = checkRow.data[0].extra_person;
                            var extra_time = checkRow.data[0].extra_time;
                            var extra_success = checkRow.data[0].extra_success;
                            if (extra_success === 0) {
                                extra_success = "完成";
                            } else {
                                extra_success = "未完成";
                            }
                            event = checkRow.data[0].extra_ID;
                            $("#extra_name").val(extra_name);
                            $("#extra_person option:contains('"+extra_person+"')").attr("selected",true);
                            form.render();
                            $("#extra_time").val(extra_time);
                            $("#extra_success").val(extra_success);
                            var node = layer.open({
                                title: '编辑节点'
                                , type: 1
                                , shift: 5
                                , area: ['700px', '380px'] //宽高
                                , content: $('#updateExtra')
                            });
                            $("#close_1").click(function () {
                                layer.close(node);
                            });
                        }
                    }
                } else if (type == "success1") {
                    var checkRow = table.checkStatus('extraReload');
                    if (checkRow.data.length > 1 || checkRow.data.length == 0) {
                        layer.msg('选择一个事件进行完成操作', {icon: 2});
                    } else {
                        var id = checkRow.data[0].extra_ID;
                        var node = layer.confirm('是否更改选中的' + checkRow.data.length + '条数据的完成状态', {
                            btn: ['确定', '取消'], title: "完成状态的更改", btn1: function (index, layero) {
                                $.ajax({
                                    type: "post",
                                    url: 'successExtra?id=' + id,
                                    dataType: "json",
                                    async: false,
                                    success: function (data) {
                                        layer.close(node);
                                        layer.msg('更改成功', {icon: 1});
                                        table.reload('extraReload', {
                                            url: '/getExtraList?id=' + project+"&username="+user_ID,
                                            method: 'post',
                                        });
                                        table.reload('extra', {
                                            url: '/getExtraHtml?id=' + project,
                                            method: 'post',
                                        });
                                        //重现加载用户详情页面
                                        load();
                                    }
                                })
                            },
                            btn2: function (index, layero) {
                                layer.close(node);
                                table.reload('extraReload', {
                                    url: '/getExtraList?id=' + project+"&username="+user_ID,
                                    method: 'post',
                                });
                                table.reload('extra', {
                                    url: '/getExtraHtml?id=' + project,
                                    method: 'post',
                                });
                            }
                        });
                    }
                } else if (type == "time1") {
                    var checkRow = table.checkStatus('extraReload');
                    if (checkRow.data.length > 1 || checkRow.data.length == 0) {
                        layer.msg('选择一个事件进行编辑时间操作', {icon: 2});
                    } else {
                        var extra_add = checkRow.data[0].extra_add;
                        if(extra_add!=account){
                            layer.msg('不是创建人，无法编辑时间', {icon: 2});
                        }else{
                            event = checkRow.data[0].extra_ID;
                            var extra_time = checkRow.data[0].extra_time;
                            $("#time1").val(extra_time);
                            $("#select2 option[value='1']").attr("selected", "true");
                            var node = layer.open({
                                title: '编辑时间'
                                , type: 1
                                , shift: 4
                                , area: ['700px', '250px'] //宽高
                                , content: $('#time_time')
                            });
                            $("#close_time1").click(function () {
                                layer.close(node);
                            });
                        }
                    }
                }
            }
        })

        table.on('toolbar(fiveHtml)', function (obj) {
            if (project === undefined) {
                layer.msg('请选择一个用户', {icon: 2});
            } else {
                var type = obj.event;
                if (type === "add") {
                    var node = layer.open({
                        title: '添加用户'
                        , type: 1
                        , shift: 4
                        , area: ['750px', '500px'] //宽高
                        , content: $('#userHtml')
                    });
                    $("#close_user").click(function () {
                        layer.close(node);
                    });
                } else if (type === "delete") {
                    var checkRow = table.checkStatus('userReload');
                    if (checkRow.data.length > 0) {
                        var ID = "";
                        $.each(checkRow.data, function (i, o) {
                            ID += o.user_ID + ",";
                        });
                        ID = ID.substring(0, ID.length - 1);
                        var node = layer.confirm('是否删除选中的' + checkRow.data.length + '条数据', {
                            btn: ['确定', '取消'], title: "删除", btn1: function (index, layero) {
                                $.ajax({
                                    type: "post",
                                    url: 'deleteUser?id=' + ID+"&project="+project,
                                    dataType: "json",
                                    async: false,
                                    success: function (data) {
                                        //加载用户列表
                                        $.ajax({
                                            type: "post",
                                            url: "/getProjectUser?id="+project,//对应controller的URL
                                            async: false,
                                            dataType: 'json',
                                            success: function (data) {
                                                var userList = data.list;
                                                $("#groupLeader").html("");
                                                $("#group_leader").html("");
                                                $("#extraPerson").html("");
                                                $("#extra_person").html("");
                                                $.each(userList, function (i, item) {
                                                    $("#groupLeader").append("<option value=" + item.user_ID + ">" + item.user_name + "("+item.departmentName+")</option>");
                                                    $("#group_leader").append("<option value=" + item.user_ID + ">" + item.user_name + "("+item.departmentName+")</option>");
                                                    $("#extraPerson").append("<option value=" + item.user_ID + ">" + item.user_name + "("+item.departmentName+")</option>");
                                                    $("#extra_person").append("<option value=" + item.user_ID + ">" + item.user_name + "("+item.departmentName+")</option>");
                                                });
                                                form.render();
                                            }
                                        });
                                        layer.close(node);
                                        layer.msg('删除成功', {icon: 1});
                                        table.reload('userReload', {
                                            url: '/getUserList?id=' + project,
                                            method: 'post',
                                        });
                                        //重现加载用户详情页面
                                        load();
                                    }
                                })
                            },
                            btn2: function (index, layero) {
                                layer.close(node);
                                table.reload('userReload', {
                                    url: '/getUserList?id=' + project,
                                    method: 'post',
                                });
                            }
                        });
                    } else {
                        layer.msg('请选择至少一个事件', {icon: 2});
                    }
                }
            }
        })


    })
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next ',
            center: 'title',
            right: 'today'
        },
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        today: ["今天"],
        buttonText: {
            today: '今天',
            month: '月',
            week: '周',
            day: '日',
            prev: '上一月',
            next: '下一月'
        },
        events: [],
        dayClick: function (date, allDay, jsEvent, view) {

        },
        eventClick: function (event, jsEvent, view) {

        }
    });
    First();
    if(projectID!="null"){
        $("#"+projectID).addClass("selected").siblings().removeClass("selected");
        getDataList(projectID);
    }
}




//获取所有项目,并初始化处理
function First() {
    //未完成的项目
    $.ajax({
        type: "post",
        url: "/getProjectList?username="+user_ID,//对应controller的URL
        async: false,
        dataType: 'json',
        success: function(data) {
            //unfinish为后台传过来的所有未完成数据
            var unfinish = data[0];
            //完成的项目
            // var finish = data[1];
            var unfinishItems='';
            // var finishItems='';
            for(var i=0;i<unfinish.length;i++){
                var id = unfinish[i].project_ID;
                var project_name = unfinish[i].project_name;
                unfinishItems+='<dd><a href="javascript:;" onclick="getDataList('+id+')" id='+id+'>'+project_name+'</a></dd>';
            }
            // for(var j=0;j<finish.length;j++){
            //     var id = finish[j].project_ID;
            //     var project_name = finish[j].project_name;
            //     finishItems+='<dd><a href="javascript:;" onclick="getDataList('+id+')" id='+id+'>'+project_name+'</a></dd>';
            // }
            $("#unfinish").append(unfinishItems);
            // $("#finish").append(finishItems);
        }
    });
}


//加载员工详情
function load() {
    $.ajax({
        type:"post",
        url:"/getExcelList?id="+project,
        success:function (data) {
            data = JSON.parse(data);
            $("#projectName").text("");
            $("#projectManager").text("");
            $("#supplierName").text("");
            $("#supplierPhone").text("");
            $("#demandName").text("");
            $("#demandPhone").text("");
            $("#projectDuringTime").text("");
            $("#main_list").html("");
            if(data.projectList!=""){
                var projectList = data.projectList;
                $("#projectName").text(projectList[0].projectName);
                $("#projectManager").text(projectList[0].projectDirector);
                $("#supplierName").text(projectList[0].supplier);
                $("#supplierPhone").text(projectList[0].supplierPhone);
                $("#demandName").text(projectList[0].demand);
                $("#demandPhone").text(projectList[0].demandPhone);
                $("#projectDuringTime").text(projectList[0].projectTime);
                var time = projectList[0].projectTime;
                var startDay = time.substring(0,10);
                var endDay = time.substring(13);
                //获取开始任务的时间是星期几
                var startDate = new Date(startDay).getDay();
                //判断第一周还余多少天
                var firstWeek = (8 - startDate)%7;
                startDay= startDay.replace(new RegExp("-","gm"),"/");
                endDay= endDay.replace(new RegExp("-","gm"),"/");
                startDay = (new Date(startDay)).getTime(); //得到毫秒数
                endDay = (new Date(endDay)).getTime(); //得到毫秒数
                var firstDate = startDay + firstWeek*1000*24*60*60;
                //以7天为一个周期，获取有几个周期,不足7天的向上取余
                var days = Math.ceil((endDay-firstDate)/(1000*60*60*24*7))+1;
                var first = '<div id="form_header"><ul class="list-unstyled"><li><b>项目负责部门</b></li><li><b>项目负责人</b></li>';
                var time = startDay;
                //定义一个毫秒数的数组
                var timeString = new Array();
                for(var i=0;i<days;i++){
                    var sTime = time;
                    time = firstDate+i*1000*24*60*60*7;
                    timeString[i] = time;
                    if(time>=endDay){
                        time = endDay;
                    }
                    var time1 = new Date(sTime);
                    var time2 = new Date(time);
                    var month1 = (time1.getMonth()+1);
                    var month2 = (time2.getMonth()+1);
                    if(month1.toString().length==1){
                        month1 = "0"+month1;
                    }
                    if(month2.toString().length==1){
                        month2 = "0"+month2;
                    }
                    var date1 = time1.getDate();
                    var date2 = time2.getDate();
                    if(i+1!=days){
                        date2 = date2 - 1;
                    }
                    if(date1.toString().length==1){
                        date1 = "0"+date1;
                    }
                    if(date2.toString().length==1){
                        date2 = "0"+date2;
                    }
                    time1 = time1.getFullYear()+ "/" + month1 + "/" + date1;
                    time2 = time2.getFullYear()+ "/" + month2 + "/" + date2;
                    var msg = time1+"-"+time2;
                    var weekid = "week"+i;
                    first+='<li class="date_time" style="background-color: #00FFFF" id="'+weekid+'" onmouseover="tip(\''+msg+'\',\''+weekid+'\')" onmouseout="offTip()">第'+(i+1)+'周</li>';
                }
                first+='</ul></div>';
                $("#main_list").html(first);
                if(data.list!=undefined){
                    var data1 = data.list;
                    for(var j=0;j<data1.length;j++){
                        first += '<div id="list_parts"><ul class="list-unstyled"><li><b>'+ data1[j].name +'</b></li><li><b>'+ data1[j].desc +'</b></li>';
                        for(var k=0;k<days;k++){
                            first +='<li id="'+j+k+'"><b></b></li>';
                        }
                        $("#main_list").html(first);
                        //循环事件
                        for(var s=0;s<data1[j].values.length;s++){
                            //开始时间
                            var timeFrom = data1[j].values[s].from;
                            //结束时间
                            var timeTo = data1[j].values[s].to;
                            var color = data1[j].values[s].color;
                            var event_id = data1[j].values[s].event_id;
                            var label = data1[j].values[s].label;
                            for(var n=0;n<timeString.length;n++){
                                var sub = new Array();
                                //在第一周完成
                                if(timeTo<timeString[0]){
                                    sub = first.split('id="'+j+'0">');
                                    first = sub[0]+'id="'+j+'0"><span onmouseover="tip(\''+label+'\',\''+event_id+'\')" onmouseout="offTip()" onclick="onSpan(\''+event_id+'\')" id="'+event_id+'" style="margin-left:4px;display:inline-block;background-color:'+color+';width:40px;height:38px"></span>'+sub[1];
                                    break;
                                }else{
                                    //在一周内完成
                                    if(timeFrom<timeString[n] && timeTo<timeString[n]){
                                        sub = first.split('id="'+j+n+'">');
                                        first = sub[0]+'id="'+j+n+'"><span onmouseover="tip(\''+label+'\',\''+event_id+'\')" onmouseout="offTip()" onclick="onSpan(\''+event_id+'\')" id="'+event_id+'" style="margin-left:4px;display:inline-block;background-color:'+color+';width:40px;height:38px"></span>'+sub[1];
                                        break;
                                    }else{
                                        //在几周内完成
                                        if(timeFrom<timeString[n] && timeTo>=timeString[n]){
                                            sub = first.split('id="'+j+n+'">');
                                            first = sub[0]+'id="'+j+n+'"><span onmouseover="tip(\''+label+'\',\''+event_id+'\')" onmouseout="offTip()" onclick="onSpan(\''+event_id+'\')" id="'+event_id+'" style="margin-left:4px;display:inline-block;background-color:'+color+';width:40px;height:38px"></span>'+sub[1];
                                        }else if(timeTo<timeString[n]){
                                            sub = first.split('id="'+j+n+'">');
                                            first = sub[0]+'id="'+j+n+'"><span onmouseover="tip(\''+label+'\',\''+event_id+'\')" onmouseout="offTip()" onclick="onSpan(\''+event_id+'\')" id="'+event_id+'" style="margin-left:4px;display:inline-block;background-color:'+color+';width:40px;height:38px"></span>'+sub[1];
                                        }
                                    }
                                }
                            }
                        }
                        first+='</ul></div>';
                        $("#main_list").html(first);
                    }
                }
            }
        }
    })
}

//单击项目
function getDataList(id){
    //单击未完成项目
    $("dl#unfinish dd").click(function(){
        $("dl#unfinish dd a").removeClass("selected");
        $(this).addClass("selected").siblings().removeClass("selected");
        // $("dl#finish dd").removeClass("selected");
    });
    // //单击完成项目
    // $("dl#finish dd").click(function(){
    //     $(this).addClass("selected").siblings().removeClass("selected");
    //     $("dl#unfinish dd").removeClass("selected");
    // });

    project = id;

    layui.use(['table','element','form'], function() {
        var table = layui.table;
        var element = layui.element;
        var form = layui.form;
        //执行重载
        table.reload('textReload', {
            url: '/getBrandList?id=' + project + '&username='+ user_ID,
            method: 'post',
        });
        table.reload('extraReload', {
            url: '/getExtraList?id=' + project + '&username='+ user_ID,
            method: 'post',
        });
        table.reload('extra', {
            url: '/getExtraHtml?id=' + project,
            method: 'post',
        });
        table.reload('userReload', {
            url: '/getUserList?id=' + project,
            method: 'post',
        });

        //加载用户列表
        $.ajax({
            type: "post",
            url: "/getProjectUser?id="+project,//对应controller的URL
            async: false,
            dataType: 'json',
            success: function (data) {
                var userList = data.list;
                $("#groupLeader").html("");
                $("#group_leader").html("");
                $("#extraPerson").html("");
                $("#extra_person").html("");
                $.each(userList, function (i, item) {
                    $("#groupLeader").append("<option value=" + item.user_ID + ">" + item.user_name +"("+item.departmentName+")</option>");
                    $("#group_leader").append("<option value=" + item.user_ID + ">" + item.user_name + "("+item.departmentName+")</option>");
                    $("#extraPerson").append("<option value=" + item.user_ID + ">" + item.user_name + "("+item.departmentName+")</option>");
                    $("#extra_person").append("<option value=" + item.user_ID + ">" + item.user_name + "("+item.departmentName+")</option>");
                });
                form.render();
            }
        });
        element.render();
    })

    //加载员工详情
    load();

    //文件显示
    $('#supplier_file').empty();
    $('#demand_file').empty();
    var supplierLi = '';
    var demandLi = '';
    $.ajax({
        url:"/getFilePath",
        dataType:'json',
        data:{"project_id":id},
        success:function(data){
            var supplier = data.supplier;
            var demand = data.demand;
            for(var i=0;i<supplier.length;i++){
                supplierLi += '<li style="text-align: center"><a href="'+supplier[i].filepath+'" download="'+supplier[i].filename+'">'+supplier[i].filename+'(下载)</a></li>'
            }
            supplierLi = '<ul>' + supplierLi + '</ul>';
            $("#supplier_file").html(supplierLi);
            for(var i=0;i<demand.length;i++){
                demandLi += '<li style="text-align: center"><a href="'+demand[i].filepath+'" download="'+demand[i].filename+'">'+demand[i].filename+'(下载)</a></li>'
            }
            demandLi = '<ul>' + demandLi + '</ul>';
            $("#demand_file").html(demandLi);
        }
    })


    $('#calendar').empty();
    var dataList = [];
    var timeList = [];
    $.ajax({
        url: "/getProjectOne",
        dataType: 'json',
        data: {"project_id": id},
        success: function (data) {
            for(var i=0;i<data[0].length;i++){
                var obj = data[0];
                $("#project_name").text(obj[i].project_name);
                var project_start = obj[i].project_time.substring(0,11);
                var project_end = obj[i].project_time.substring(11);
                if(obj[i].user_cancel===0){
                    continue;
                }
                var id = obj[i].event_id;
                var event_name = obj[i].event_name;
                var user_name = obj[i].user_name;
                var event_start = obj[i].event_startTime;
                var event_end = obj[i].event_endTime;
                var event_state = obj[i].event_state;
                var event_success = obj[i].event_success;
                var event_tab = obj[i].event_tab;
                var event_progress = obj[i].event_progress;
                var color = "#01AAED";
                if(event_state===1) {
                    color = "#FF5722";
                }

                //初始化事件的数据
                var list = {};
                list.id  = id;
                list.start = event_start;
                list.end = event_end;
                list.title = user_name+" ："+event_name;
                list.color = color;
                dataList[i]=list;
                if(event_start!=undefined){
                    var start = event_start.replace(new RegExp("-","gm"),"/");
                    var end = event_end.replace(new RegExp("-","gm"),"/");
                    var timeStart = project_start.replace(new RegExp("-","gm"),"/");
                    var timeEnd = project_end.replace(new RegExp("-","gm"),"/");
                    start = (new Date(start)).getTime();
                    end = (new Date(end)).getTime();
                    timeStart = (new Date(timeStart)).getTime();
                    timeEnd = (new Date(timeEnd)).getTime();
                    var list1 = {};
                    list1.start = timeStart;
                    list1.end = timeEnd;
                    list1.start1 = start;
                    list1.end1 = end;
                    list1.state = event_state;
                    list1.success = event_success;
                    list1.tab = event_tab;
                    list1.progress = event_progress;
                    timeList[i] =list1;
                }
            }
            //将数组转为json
            JSON.stringify( dataList);
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next ',
                    center: 'title',
                    right: 'today'
                },
                navLinks: true, // can click day/week names to navigate views
                editable: false,//不可移动
                eventLimit: true, // allow "more" link when too many events
                monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                today: ["今天"],
                buttonText: {
                    today: '今天',
                    month: '月',
                    week: '周',
                    day: '日',
                    prev: '上一月',
                    next: '下一月'
                },
                dayCount: 31,
                //单击空白添加事件
                dayClick: function (date, allDay, jsEvent, view) {

                },
                //点击事件查看事件信息
                eventClick: function (event, jsEvent, view) {
                    //得到根据事件节点创建的顺序得到对应的id
                    event = event._id;
                    $.ajax({
                        url: "/getEvent",
                        dataType: 'json',
                        data: {"project_id": project, "event_id": event},
                        success: function (data) {
                            var obj = data.list[0];
                            $("#event_title").val(obj.event_name);
                            $("#event_person").val(obj.event_groupLeader);
                            // $("#event_phone").val(obj.event_phone);
                            $("#event_time").val(obj.event_startTime+" - "+obj.event_endTime);
                            $("#event_days").val(obj.days);
                            $("#event_remark").val(obj.event_description);

                            var index = layer.open({
                                type: 1,
                                title: '事件详情',
                                shade: 0.8,
                                area: ['660px', '550px'],
                                content: $(".modal-dialog_1"),
                                btn: ['确定'],
                                yes:function(){
                                    layer.close(index);
                                }
                            });
                        }
                    });

                },
                events:function(start, end, callback){
                    //prev上一月, next下一月等事件时调用
                    callback(dataList);
                    //首先先将背景色变为灰色
                    if(project_start!=undefined){
                        var start = project_start.replace(new RegExp("-","gm"),"/");
                        var end = project_end.replace(new RegExp("-","gm"),"/");
                        start = (new Date(start)).getTime();
                        end = (new Date(end)).getTime();
                        $(".fc-border-separate tbody").each(function (k){
                            $(this).children('tr').each(function(m){
                                $(this).children('td').each(function(n){
                                    var div = $(this)[0];
                                    var date = $(div).attr("data-date");
                                    date = date.replace(new RegExp("-","gm"),"/");
                                    date = (new Date(date)).getTime();
                                    if(start<=date && date<=end){
                                        $(div).attr("style","background-color:#9e9e9e");
                                    }
                                });
                            });
                        });
                    }
                    var num = 0;
                    for(var i=0;i<timeList.length;i++){
                        if(timeList[i].success===0){
                            num++;
                        }
                        //遍历月历表，比较时间的毫秒数，来进行将模块颜色化
                        $(".fc-border-separate tbody").each(function (k){
                            $(this).children('tr').each(function(m){
                                $(this).children('td').each(function(n){
                                    var div = $(this)[0];
                                    var date = $(div).attr("data-date");
                                    date = date.replace(new RegExp("-","gm"),"/");
                                    date = (new Date(date)).getTime();
                                    //获取到今天为止得时间毫秒数
                                    var date1 = new Date();
                                    var year = date1.getFullYear();
                                    var month = date1.getMonth()+1;
                                    var day = date1.getDate();
                                    var time1 = year+"-"+month+"-"+day;
                                    var nowDate = new Date(time1).getTime();
                                    start = timeList[i].start;
                                    end = timeList[i].end;
                                    var start1 = timeList[i].start1;
                                    var end1 = timeList[i].end1;
                                    state = timeList[i].state;
                                    var success = timeList[i].success;
                                    var tab = timeList[i].tab;
                                    var progress = timeList[i].progress;
                                    //相差几天
                                    var time2 = (end1-start1)/(1000*60*60*24);
                                    var time2 = (time2*progress)/100;
                                    var time2 = start1+time2*1000*60*60*24;
                                    //如果这个时候自身是完成状态，自身到今日得都变为绿色
                                    //如果是第一条数据
                                    if(i===0){
                                        if(start<start1 && start1<=nowDate){
                                            if(start<=date && date<start1){
                                                $(div).attr("style","background-color:#4caf50");
                                            }
                                        }else if(start<start1 && nowDate<start1){
                                            if(start<=date && date<=nowDate){
                                                $(div).attr("style","background-color:#4caf50");
                                            }
                                        }
                                    }
                                    if(success===0) {
                                        if(tab===1){
                                            if(end1<nowDate && nowDate<=end){
                                                if(start1<=date && date<=end1){
                                                    $(div).attr("style","background-color:#FFB800");
                                                }else if(end1<date && date<=nowDate){
                                                    $(div).attr("style","background-color:#4caf50");
                                                }
                                            }else if(end1<nowDate && nowDate>end){
                                                if(start1<=date && date<=end1){
                                                    $(div).attr("style","background-color:#FFB800");
                                                }else if(end1<date && date<=end){
                                                    $(div).attr("style","background-color:#4caf50");
                                                }
                                            }else if(end1>nowDate){
                                                if(start1<=date && date<=nowDate){
                                                    $(div).attr("style","background-color:#FFB800");
                                                }
                                            }
                                        }else{
                                            if(end1<nowDate && nowDate<=end){
                                                if(start1<=date && date<=nowDate){
                                                    $(div).attr("style","background-color:#4caf50");
                                                }
                                            }else if(end1<nowDate && nowDate>end){
                                                if(start1<=date && date<=end){
                                                    $(div).attr("style","background-color:#4caf50");
                                                }
                                            }else if(end1>nowDate){
                                                if(start1<=date && date<=nowDate){
                                                    $(div).attr("style","background-color:#4caf50");
                                                }
                                            }
                                        }
                                        //如果这个时候自身是未完成状态，今日之后全为未完成
                                    }else if(success===1) {
                                        if (start1 <= date && date <= end) {
                                            $(div).attr("style", "background-color:#9e9e9e");
                                        }
                                        if(time2>=nowDate && start1<=nowDate){
                                            if(start1<=date && date<=nowDate){
                                                $(div).attr("style","background-color:#4caf50");
                                            }
                                        }else if(time2<nowDate){
                                            if(start1<=date && date <= time2){
                                                $(div).attr("style","background-color:#4caf50");
                                            }
                                        }

                                    }
                                });
                            });
                        });
                    }
                    var percent = (num/timeList.length)*100;
                    if(new RegExp("^\\d{2,3}$").test(percent)){
                        percent = percent + "%";
                    }else {
                        percent = percent.toString() + "%";
                    }
                    if(percent!="NaN%"){
                        layui.use("element",function () {
                            var element = layui.element;
                            setTimeout(function(){
                                element.progress("progressing",percent)
                            }, 500)

                        })
                    }else{
                        layui.use("element",function () {
                            var element = layui.element;
                            setTimeout(function(){
                                element.progress("progressing","0%")
                            }, 500)
                        })
                    }
                }
            });
        }
    });
}








//添加关键节点
function addEvent() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;

        var eventName = $("#eventName").val();
        var groupLeader = $("#groupLeader option:selected").val();
        var dutingTime = $("#duringTime").val();
        if (eventName === "") {
            layer.msg("事件名称不能为空");
        } else if (groupLeader === "") {
            layer.msg("负责人不能为空");
            // } else if (!new RegExp("^1[3|4|5|6|7|8]\\d{9}$").test(phoneNumber)) {
            //     layer.msg("手机号格式不正确");
        } else if (dutingTime === "") {
            layer.msg("时间不能为空");
        } else {
            $.ajax({
                type: "post",
                url: "/insertBrandList",//对应controller的URL
                data: {
                    "project_ID": project,
                    "eventName": $("#eventName").val(),
                    "groupLeader": groupLeader,
                    // "phoneNumber": $("#phoneNumber").val(),
                    "duringTime": $("#duringTime").val(),
                    "eventDescription": $("#eventDescription").val(),
                    "eventState": $("#selected option:selected").val()
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.closeAll();
                    layer.msg('添加成功', {icon: 1});
                    table.reload('textReload', {
                        url: '/getBrandList?id=' + project + '&username='+user_ID,
                        method: 'post',
                    });
                    //重现加载用户详情页面
                    load();
                }
            });
        }
    })
}




//添加待办事件节点
function addExtra() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;
        var eventName = $("#extraName").val();
        var groupLeader = $("#extraPerson option:selected").val();
        var duringTime = $("#extraT").val();
        var addPerson = $("#addPerson").val();
        if (eventName === "") {
            layer.msg("事件名称不能为空");
        } else if (groupLeader === "") {
            layer.msg("负责人不能为空");
        } else if (duringTime === "") {
            layer.msg("时间不能为空");
        } else {
            $.ajax({
                type: "post",
                url: "/insertExtraList",//对应controller的URL
                data: {
                    "project_ID": project,
                    "extraName": eventName,
                    "groupLeader": groupLeader,
                    "addPerson": addPerson,
                    "duringTime": duringTime
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.closeAll();
                    layer.msg('添加成功', {icon: 1});
                    table.reload('extraReload', {
                        url: '/getExtraList?id=' + project + '&username='+user_ID,
                        method: 'post',
                    });
                    table.reload('extra', {
                        url: '/getExtraHtml?id=' + project,
                        method: 'post',
                    });
                    //重现加载用户详情页面
                    load();
                }
            });
        }
    })
}



//编辑关键节点
function updateEvent() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;
        var event_name = $("#event_name").val();
        var group_leader = $("#group_leader option:selected").val();
        var during_time = $("#during_time").val();
        if(event_name===""){
            layer.msg("节点名称不能为空");
        }else if(group_leader===""){
            layer.msg("负责人不能为空");
            // }else if(!new RegExp("^1[3|4|5|6|7|8]\\d{9}$").test(phone_number)){
            //     layer.msg("组长电话格式不规范");
        }else if(during_time===""){
            layer.msg("节点周期不能为空");
        }else{
            $.ajax({
                type: "post",
                url: "/updateBrandList",//对应controller的URL
                data: {
                    "event_id": event,
                    "event_name": $("#event_name").val(),
                    "group_leader": $("#group_leader option:selected").val(),
                    // "phone_number": $("#phone_number").val(),
                    "during_time": $("#during_time").val(),
                    "event_description": $("#event_description").val(),
                    "event_state":$("#select option:selected").val()
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.closeAll();
                    layer.msg('修改成功', {icon: 1});
                    table.reload('textReload', {
                        url: '/getBrandList?id=' + project + '&username='+user_ID,
                        method: 'post',
                    });
                    //重现加载用户详情页面
                    load();
                }
            });
        }
    })
}




//编辑待完成事件
function updateExtra() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;
        var extra_name = $("#extra_name").val();
        var extra_person = $("#extra_person option:selected").val();
        var extra_time = $("#extra_time").val();
        if(extra_name===""){
            layer.msg("节点名称不能为空");
        }else if(extra_person===""){
            layer.msg("负责人不能为空");
        }else if(extra_time===""){
            layer.msg("时间不能为空");
        }else{
            $.ajax({
                type: "post",
                url: "/updateExtraList",//对应controller的URL
                data: {
                    "extra_id": event,
                    "extra_name": extra_name,
                    "extra_person": $("#extra_person option:selected").val(),
                    "extra_time": extra_time,
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.closeAll();
                    layer.msg('修改成功', {icon: 1});
                    table.reload('extraReload', {
                        url: '/getExtraList?id=' + project + "&username="+user_ID,
                        method: 'post',
                    });
                    table.reload('extra', {
                        url: '/getExtraHtml?id=' + project,
                        method: 'post',
                    });
                    //重现加载用户详情页面
                    load();
                }
            });
        }
    })
}


// 编辑时间节点
function changeTime() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;
        var time = $("#time").val();
        var select = $("#select1 option:selected").val();
        if(time===""){
            layer.msg("节点周期必填");
        }else{
            $.ajax({
                type: "post",
                url: "/changeTime",//对应controller的URL
                data: {
                    "event_id": event,
                    "time": time,
                    "select":select
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.closeAll();
                    layer.msg('修改成功', {icon: 1});
                    table.reload('textReload', {
                        url: '/getBrandList?id=' + project + '&username='+ user_ID,
                        method: 'post',
                    });
                    //重现加载用户详情页面
                    load();
                }
            });
        }
    })
}



// 编辑进度条节点
function changeProgress() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;
        var progressNum = $("#progressNum").val();
        if(progressNum===""){
            layer.msg("进度值必填");
        }else if(progressNum>100 || progressNum<0) {
            layer.msg("进度值不在范围内");
        }else{
            $.ajax({
                type: "post",
                url: "/changeProgress",//对应controller的URL
                data: {
                    "event_id": event,
                    "event_progress":progressNum
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.closeAll();
                    layer.msg('修改成功', {icon: 1});
                    table.reload('textReload', {
                        url: '/getBrandList?id=' + project + '&username='+user_ID,
                        method: 'post',
                    });
                    //重现加载用户详情页面
                    load();
                }
            });
        }
    })
}


// 编辑时间节点
function changeExtraTime() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;
        var time = $("#time1").val();
        var select = $("#select2 option:selected").val();
        if(time===""){
            layer.msg("时间必填");
        }else{
            $.ajax({
                type: "post",
                url: "/changeExtraTime",//对应controller的URL
                data: {
                    "extra_id": event,
                    "time": time,
                    "select":select
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.closeAll();
                    layer.msg('修改成功', {icon: 1});
                    table.reload('extraReload', {
                        url: '/getExtraList?id=' + project+"&username="+user_ID,
                        method: 'post',
                    });
                    table.reload('extra', {
                        url: '/getExtraHtml?id=' + project,
                        method: 'post',
                    });
                    //重现加载用户详情页面
                    load();
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


function tip(msg,id) {
    layui.use('layer',function () {
        var layer = layui.layer;
        Index = layer.tips(msg,'#'+id,{tips:[1,'#0FA6d8']});
    })
}

function offTip() {
    layui.use('layer',function () {
        var layer = layui.layer;
        layer.close(Index);
    })
}



function insertUser() {
    layui.use(['layer','table','form'], function () {
        var layer = layui.layer;
        var table = layui.table;
        var form = layui.form;
        var department = $('#dep option:selected').val()
        var user = $("#user option:selected").val();
        if(department!="" && user!=""){
            $.ajax({
                url:'/insertUser',
                data:{'department':department,"user":user,"id":project},
                success:function (data) {
                    data = JSON.parse(data);
                    if(data.msg===1){
                        layer.msg("用户已经存在,插入失败",{icon:2});
                    }else if(data.msg===0){
                        //加载用户列表
                        $.ajax({
                            type: "post",
                            url: "/getProjectUser?id="+project,//对应controller的URL
                            async: false,
                            dataType: 'json',
                            success: function (data) {
                                var userList = data.list;
                                $("#groupLeader").html("");
                                $("#group_leader").html("");
                                $("#extraPerson").html("");
                                $("#extra_person").html("");
                                $.each(userList, function (i, item) {
                                    $("#groupLeader").append("<option value=" + item.user_ID + ">" + item.user_name +"("+item.departmentName+")</option>");
                                    $("#group_leader").append("<option value=" + item.user_ID + ">" + item.user_name + "("+item.departmentName+")</option>");
                                    $("#extraPerson").append("<option value=" + item.user_ID + ">" + item.user_name + "("+item.departmentName+")</option>");
                                    $("#extra_person").append("<option value=" + item.user_ID + ">" + item.user_name + "("+item.departmentName+")</option>");
                                });
                                form.render();
                            }
                        });
                        layer.closeAll();
                        layer.msg("添加成功",{icon:1});
                        table.reload('userReload', {
                            url: '/getUserList?id=' + project,
                            method: 'post',
                        });
                        //重现加载用户详情页面
                        load();
                    }
                }
            })
        }else{
            layer.msg("部门或者用户不能为空");
        }
    })
}


//查看详情
function onSpan(id) {
    layui.use('layer',function () {
        var layer = layui.layer;
        $.ajax({
            type: "post",
            url: "getThing/?id="+id,//对应controller的URL
            async: false,
            dataType: 'json',
            success: function (data) {
                var data = data.list[0];
                $("#EventDate").val(data.time);
                $("#EventDep").val(data.departmentName);
                $("#EventP").val(data.person);
                $("#EventM").val(data.description);
                var node = layer.open({
                    title: '周任务详情'
                    , type: 1
                    , shift: 4
                    , area: ['750px', '600px'] //宽高
                    , content: $('#myDialog')
                });
                $("#Event_button").click(function () {
                    $("#EventDate").val("");
                    $("#EventDep").val("");
                    $("#EventP").val("");
                    $("#EventM").val("");
                    layer.close(node);
                });
            }
        })
    })
}

