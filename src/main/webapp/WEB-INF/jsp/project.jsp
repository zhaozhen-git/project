<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>项目管理</title>
    <link rel="stylesheet" href="layui/css/layui.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link href='css/fullcalendar.print.css' rel='stylesheet' />
    <link href='css/fullcalendar.css' rel='stylesheet' />
    <script src="js/jquery-1.11.3.js"></script>
    <script src='js/fullcalendar.js'></script>
    <script src="js/jquery-ui.custom.min.js"></script>
    <script src="layui/layui.js"></script>
    <script src="js/bootstrap.js"></script>
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <div class="layui-header">
        <div class="layui-logo">制造生产管理项目</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-layout-left">
            <li class="layui-nav-item"><a href="/crud">项目详情</a></li>
            <li class="layui-nav-item layui-this"><a href="">项目管理</a></li>
        </ul>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
                    <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
                    <%=session.getAttribute("username")%>
                </a>
                <dl class="layui-nav-child" style="text-align: center;">
                    <dd><a href="">基本资料</a></dd>
                    <dd><a href="">安全设置</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item"><a href="/">退出登录</a></li>
        </ul>
    </div>



    <div class="layui-body" style="position: static">
        <!-- 内容主体区域 -->
        <div class="layui-tab layui-tab-brief" lay-filter="demo" style="padding: 10px;">
            <div class="layui-tab-item layui-show" id="table">
                <table id="test" lay-filter="test"></table>
            </div>
        </div>
    </div>

</div>

<!--编辑项目-->
<div class="modal-dialog" id="kkkkk" style="display: none;">
    <!-- 项目名称: -->
    <form class="form-horizontal" method="post" action="">
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>项目名称:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="project_name" name="" style="margin-top: 7px;" placeholder="请在这里输入项目名称">
            </div>
        </div>
        <!-- 项目负责人: -->
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right: 2px">*</i>项目负责人:</label>
            <div class="layui-input-inline layui-form" style="margin-left:15px">
                <select name="modules" id="project_director" lay-search>
                    <option value="">直接选择或搜索选择</option>
                </select>
            </div>
        </div>
        <!-- 计划任务完成周期: -->
        <div class="form-group">
            <label class="col-xs-4 control-label">项目周期:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="" class="form-control input-sm" value="" id="project_time" name="" style="margin-top: 7px;" placeholder=" - ">
            </div>
        </div>
        <!-- 计划任务详细说明: -->
        <div class="form-group">
            <label class="col-xs-4 control-label">备注:</label>
            <div class="col-xs-6">
                <textarea id="project_remark" rows="10" cols="35" style="resize: none;padding:10px"></textarea>
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <a href="" class="btn btn-default" id="close" data-dismiss="modal">取消
        </a>
        <button type="button" class="btn btn-primary" onclick="updateProject()">
            确定
        </button>
    </div>
</div>




<div class="layui-tab-item" id="ggggg" style="display:none">
    <div class="modal-dialog">
        <div class="modal-body">
            <div class="container-fluid">
                <!-- 计划任务名称: -->
                <form class="form-horizontal" method="post" action="">
                    <div class="form-group">
                        <label class="col-xs-4 control-label"><i style="color: red;margin-right: 2px">*</i>计划任务名称:</label>
                        <div class="col-xs-6">
                            <input autocomplete="off" type="text" class="form-control input-sm" id="name" name="" style="margin-top: 7px;" placeholder="请在这里输入计划任务名称">
                        </div>
                    </div>
                    <!-- 计划任务负责人: -->
                    <div class="form-group">
                        <label class="col-xs-4 control-label"><i style="color: red;margin-right: 2px">*</i>计划任务负责人:</label>
                        <div class="layui-input-inline layui-form" style="margin-left:15px">
                            <select name="modules" id="director" lay-search>
                                <option value="">直接选择或搜索选择</option>
                            </select>
                        </div>
                    </div>
                    <!-- 计划任务完成周期: -->
                    <div class="form-group">
                        <label class="col-xs-4 control-label"><i style="color: red;margin-right:2px">*</i>计划任务完成周期:</label>
                        <div class="col-xs-6">
                            <div class="layui-input-inline">
                                <input autocomplete="off" type="" class="form-control input-sm" value="" id="duringtime" name="" style="margin-top: 7px;" placeholder=" - ">
                            </div>
                        </div>
                    </div>
                    <!-- 计划任务详细说明: -->
                    <div class="form-group">
                        <label class="col-xs-4 control-label">项目详细说明:</label>
                        <div class="col-xs-6">
                            <textarea id="remark" rows="10" cols="35" style="resize: none;"></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal-footer">
            <a href="javascript:location.reload();" class="btn btn-default" data-dismiss="modal">取消
            </a>
            <button type="button" class="btn btn-primary" onclick="sentMsg()">
                确定
            </button>
        </div>
    </div>
</div>





<script type="text/html" id="toolbarDemo">
    <div class="layui-btn-container">
        <sec:authorize access="hasRole('ROLE_ADMIN')">
        <button class="layui-btn" lay-event="add"><i class="layui-icon layui-icon-add-1"></i>新增</button>
        <button class="layui-btn layui-btn-warm" lay-event="update"><i class="layui-icon layui-icon-edit"></i>编辑</button>
        <button class="layui-btn layui-btn-danger" lay-event="delete"><i class="layui-icon layui-icon-delete"></i>删除</button>
        </sec:authorize>
        <button class="layui-btn layui-bg-blue" lay-event="success"><i class="layui-icon layui-icon-ok"></i>完成</button>
    </div>
</script>

</body>
<script>
    var project = "";

    var username = "<%=session.getAttribute("account")%>";
    // 创建加载后台布局函数
    layui.use('element', function(){
        var element = layui.element;
        //加载用户列表
        $.ajax({
            type: "post",
            url: "/getUser",//对应controller的URL
            async: false,
            dataType: 'json',
            success: function (data) {
                var netList = data.list;
                $.each(netList, function (i, item) {
                    $("#project_director").append("<option value=" + item.user_ID + ">" + item.user_account + "</option>");
                    $("#director").append("<option value=" + item.user_ID + ">" + item.user_account + "</option>");
                });
            }
        });
        element.render();
    });
    // 创建加载时间选择函数
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#project_time',
            range: true
        });
        laydate.render({
            elem: '#duringtime',
            range: true
        });
    });

    layui.use(['table','layer','form'], function() {
        var table = layui.table;
        var layer = layui.layer;
        var form = layui.form;
        table.render({
            elem: '#test'
            , url: '/getAllProject?username='+username
            , toolbar: '#toolbarDemo'
            , title: '用户数据表'
            , cols: [
                [
                    {type: 'checkbox', fixed: 'left'}
                    , {field: 'project_ID', title: 'ID', hide: true, width: 60, align: 'center'}
                    , {field: 'project_name', title: '项目名称', width: 180,align:'center'}
                    , {field: 'project_director', title: '项目负责人', width: 180,align:'center'}
                    , {field: 'project_time', title: '任务完成周期', width: 240, align: 'center'}
                    , {field: 'project_remark', title: '备注', width: 300,align:'center'}
                    , {
                    field: 'project_state', title: '状态', width: 120, align: 'center'
                    , templet: function (d) {
                        if(d.project_state===0){
                            return "未完成";
                        }else if(d.project_state===1){
                            return "完成";
                        }
                    }
                }
                ]
            ]
            , id: 'textReload'
            , page: false
        });


        //头工具栏事件
        table.on('toolbar(test)', function (obj) {
            if (project === undefined) {
                layer.alert('请选择一个项目', {icon: 2});
            } else {
                var type = obj.event;
                if (type === "add") {
                    var node = layer.open({
                        title: '添加项目'
                        , type: 1
                        , shift: 4
                        , area: ['700px', '600px'] //宽高
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
                            ID += o.project_ID + ",";
                        });
                        ID = ID.substring(0, ID.length - 1);
                        node = layer.confirm('是否删除选中的'+checkRow.data.length+'条数据', {
                            btn: ['确定', '取消'], title: "删除", btn1: function (index, layero) {
                                $.ajax({
                                    type: "post",
                                    url: 'deleteProject?id=' + ID,
                                    dataType: "json",
                                    async: false,
                                    success: function (data) {
                                        layer.close(node);
                                        layer.msg('删除成功', {icon: 1});
                                        table.reload('textReload', {
                                            url: '/getAllProject?username='+username,
                                            method: 'post'
                                        });
                                    }
                                })
                            },
                            btn2: function (index, layero) {
                                layer.close(node);
                                table.reload('textReload', {
                                    url: '/getAllProject?username='+username,
                                    method: 'post'
                                });
                            }
                        });
                    } else {
                        layer.alert('请选择至少一个事件', {icon: 2});
                    }
                }else if(type==="update") {
                    var checkRow = table.checkStatus('textReload');
                    if (checkRow.data.length > 1 || checkRow.data.length == 0) {
                        layer.alert('选择一个事件进行编辑操作', {icon: 2});
                    }else{
                        var project_name = checkRow.data[0].project_name;
                        var project_director = checkRow.data[0].project_director;
                        var project_time = checkRow.data[0].project_time;
                        var project_remark = checkRow.data[0].project_remark;
                        project = checkRow.data[0].project_ID;
                        $("#project_name").val(project_name);
                        $("#project_director option:contains('"+project_director+"')").attr("selected",true);
                        form.render();
                        $("#project_time").val(project_time);
                        $("#project_remark").val(project_remark);
                        var node = layer.open({
                            title: '编辑项目'
                            , type: 1
                            , shift: 5
                            , area: ['700px', '600px'] //宽高
                            , content: $('#kkkkk')
                        });
                        $("#close").click(function () {
                            layer.close(node);
                        });
                    }
                }else if(type=="success"){
                    var checkRow = table.checkStatus('textReload');
                    if (checkRow.data.length > 1 || checkRow.data.length == 0) {
                        layer.alert('选择一个项目进行完成操作', {icon: 2});
                    }else {
                        var id = checkRow.data[0].project_ID;
                        var node = layer.confirm('是否更改选中的' + checkRow.data.length + '条数据的完成状态', {
                            btn: ['确定', '取消'], title: "完成状态的更改", btn1: function (index, layero) {
                                $.ajax({
                                    type: "post",
                                    url: 'successProject?id=' + id,
                                    dataType: "json",
                                    async: false,
                                    success: function (data) {
                                        if(data.msg==="0"){
                                            layer.msg('该项目下还有事件没有完成', {icon: 2});
                                        }else{
                                            layer.close(node);
                                            layer.msg('更改成功', {icon: 1});
                                            table.reload('textReload', {
                                                url: '/getAllProject?username='+username,
                                                method: 'post'
                                            });
                                        }
                                    }
                                })
                            },
                            btn2: function (index, layero) {
                                layer.close(node);
                                table.reload('textReload', {
                                    url: '/getAllProject?username=' + username,
                                    method: 'post'
                                });
                            }
                        });
                    }
                }
            }
        })

    })


    //编辑关键节点
    function updateProject() {
        layui.use(['layer', 'table'], function () {
            var layer = layui.layer;
            var table = layui.table;
            var project_name = $("#project_name").val();
            var project_director = $("#project_director option:selected").val();
            var project_time = $("#project_time").val();
            if (project_name === "") {
                layer.msg("项目名称不能为空");
            } else if (project_director === "") {
                layer.msg("负责人不能为空");
            } else if (project_time === "") {
                layer.msg("项目周期不能为空");
            } else {
                $.ajax({
                    type: "post",
                    url: "/updateProjectList",//对应controller的URL
                    data: {
                        "project_id": project,
                        "project_name": $("#project_name").val(),
                        "project_director": $("#project_director option:selected").text(),
                        "director_phone": $("#director_phone").val(),
                        "project_time": $("#project_time").val(),
                        "project_remark": $("#project_remark").val(),
                    },
                    async: false,
                    dataType: 'json',
                    success: function (data) {
                        layer.closeAll();
                        layer.msg('修改成功', {icon: 1});
                        table.reload('textReload', {
                            url: '/getAllProject?username='+username,
                            method: 'post'
                        });
                    }
                });
            }
        })
    }




    function sentMsg(){
        layui.use(['table','layer'], function() {
            var table = layui.table;
            var layer = layui.layer;
            var project_name = $("#name").val();
            var project_director = $("#director option:selected").val();
            var project_duringtime = $("#duringtime").val();
            if(project_name===""){
                layer.msg("任务名不能为空");
            }else if(project_director===""){
                layer.msg("负责人不能为空");
            }else if(project_duringtime===""){
                layer.msg("完成周期不能为空");
            }else{
                $.ajax({
                    type: "post",
                    url: "/insertProject",//对应controller的URL
                    async: false,
                    dataType: 'json',
                    data: {
                        "project_name":$("#name").val(),
                        "project_director":$("#director option:selected").text(),
                        "project_duringtime":$("#duringtime").val(),
                        "detailed_information":$("#remark").val()
                    },
                    success: function (data) {
                        layer.closeAll();
                        table.reload('textReload', {
                            url: '/getAllProject?username='+username,
                            method: 'post'
                        });
                    }
                });
            }
        })
    }

</script>
</html>
