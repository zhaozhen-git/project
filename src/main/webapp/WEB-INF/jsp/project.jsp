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
            <li class="layui-nav-item layui-this"><a href="/project">项目管理</a></li>
        </ul>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
                    <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
                    <%=session.getAttribute("username")%>
                </a>
                <dl class="layui-nav-child" style="text-align: center;">
                    <dd><span onclick="setPassword()" style="color: #007DDB;cursor: pointer">安全设置</span></dd>
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
<div class="layui-tab-item" id="kkkkk" style="display:none">
    <div class="modal-dialog" style="width: 1100px; height:auto;">
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row">
                    <!--分成两等份-->
                    <div class="col-md-6">
                        <!-- 计划任务名称: -->
                        <form class="form-horizontal" method="post" action="">
                            <div class="form-group">
                                <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>计划任务名称:</label>
                                <div class="col-xs-6">
                                    <input type="text" class="form-control input-sm" id="project_name" style="margin-top: 7px;" placeholder="请在这里输入计划任务名称">
                                </div>
                            </div>
                            <!-- 计划任务负责人: -->
                            <div class="form-group">
                                <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>计划任务负责人:</label>
                                <div class="col-xs-5">
                                    <div class="layui-input-inline layui-form" style="margin-left:2px">
                                        <select name="modules" id="project_director" lay-search>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!-- 计划任务完成周期: -->
                            <div class="form-group">
                                <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>计划任务完成周期:</label>
                                <div class="col-xs-6">
                                    <div class="layui-input-inline">
                                        <input type="text" class="form-control input-sm" value="" id="project_time" style="margin-top: 7px;" placeholder=" - ">
                                    </div>
                                </div>
                            </div>
                            <!--供应商联系人: -->
                            <div class="form-group">
                                <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>供应商联系人:</label>
                                <div class="col-xs-5">
                                    <div class="layui-input-inline layui-form" style="margin-left:2px">
                                        <select name="modules" id="project_supplier" lay-search>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!--联系人电话-->
                            <div class="form-group">
                                <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>供应商电话:</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control input-sm" id="supplier_phone" style="margin-top: 7px;" placeholder="请输入供应商电话">
                                </div>
                            </div>
                            <div class="form-group" style="margin-top:30px;">
                                <span style="margin-left:87px;">注：带<i style="color:red;margin-right: 2px;">*</i>的选项为必填项目</span>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <form class="form-horizontal" method="post" action="" style="margin-right: 178px;">
                            <!--需求方联系人: -->
                            <div class="form-group">
                                <label class="col-xs-4 control-label">需求方联系人:</label>
                                <div class="col-xs-5">
                                    <div class="layui-input-inline layui-form" style="margin-left:2px">
                                        <select name="modules" id="project_demand" lay-search>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!--联系人电话-->
                            <div class="form-group">
                                <label class="col-xs-4 control-label">需求方电话:</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control input-sm" id="demand_phone" style="margin-top: 7px;" placeholder="请输入供应商联系人电话">
                                </div>
                            </div>
                            <!-- 计划任务详细说明: -->
                            <div class="form-group">
                                <label class="col-xs-4 control-label">计划任务说明:</label>
                                <div class="col-xs-6">
                                    <textarea id="project_detail" rows="15" cols="35" style="resize: none; margin-top: 10px;"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <sec:authorize access="hasAnyRole('ROLE_SUPPLIER','ROLE_ADMIN')">
                <div class="row">
                    <!--文件上传-->
                    <div class="layui-upload">
                        <button type="button" class="layui-btn layui-btn-normal" id="supplierList">供应方文件上传</button>
                        <button type="button" class="layui-btn" id="supplierListAction">开始上传</button>
                        <div class="layui-upload-list">
                            <table class="layui-table">
                                <thead>
                                <tr><th>文件名</th>
                                    <th>大小</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr></thead>
                                <tbody id="supplierDemo"></tbody>
                            </table>
                        </div>

                    </div>

                </div>
                </sec:authorize>
                <sec:authorize access="hasAnyRole('ROLE_DEMAND','ROLE_ADMIN')">
                <div class="row">
                    <!--文件上传-->
                    <div class="layui-upload">
                        <button type="button" class="layui-btn layui-btn-normal" id="demandList">需求方文件上传</button>
                        <button type="button" class="layui-btn" id="demandListAction">开始上传</button>
                        <div class="layui-upload-list">
                            <table class="layui-table">
                                <thead>
                                <tr><th>文件名</th>
                                    <th>大小</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr></thead>
                                <tbody id="demandDemo"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </sec:authorize>
                <div class="row" style="margin-left: 100px;">
                    <div class="col-md-2 pull-right">
                        <a href="javascript:location.reload();" id="close" class="btn btn-default" data-dismiss="modal">取消
                        </a>
                        <button type="button" class="btn btn-primary" onclick="updateProject()">
                            确定
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>






<!--新增项目-->
<div class="layui-tab-item" id="ggggg" style="display:none">
<div class="modal-dialog" style="width: 1100px; height:auto;">
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row">
                    <!--分成两等份-->
                    <div class="col-md-6">
                        <!-- 计划任务名称: -->
                        <form class="form-horizontal" method="post" action="">
                            <div class="form-group">
                                <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>计划任务名称:</label>
                                <div class="col-xs-6">
                                    <input type="text" class="form-control input-sm" id="projectName" style="margin-top: 7px;" placeholder="请在这里输入计划任务名称">
                                </div>
                            </div>
                            <!-- 计划任务负责人: -->
                            <div class="form-group">
                                <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>计划任务负责人:</label>
                                <div class="col-xs-5">
                                    <div class="layui-input-inline layui-form" style="margin-left:2px">
                                        <select name="modules" id="projectDirector" lay-search>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!-- 计划任务完成周期: -->
                            <div class="form-group">
                                <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>计划任务完成周期:</label>
                                <div class="col-xs-6">
                                    <div class="layui-input-inline">
                                        <input type="text" class="form-control input-sm" value="" id="projectTime" style="margin-top: 7px;" placeholder=" - ">
                                    </div>
                                </div>
                            </div>
                            <!--供应商联系人: -->
                            <div class="form-group">
                                <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>供应商联系人:</label>
                                <div class="col-xs-5">
                                    <div class="layui-input-inline layui-form" style="margin-left:2px">
                                        <select name="modules" id="projectSupplier" lay-search>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!--联系人电话-->
                            <div class="form-group">
                                <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>供应商电话:</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control input-sm" id="supplierPhone" style="margin-top: 7px;" placeholder="请输入供应商电话">
                                </div>
                            </div>
                            <div class="form-group" style="margin-top:30px;">
                                <span style="margin-left:87px;">注：带<i style="color:red;margin-right: 2px;">*</i>的选项为必填项目</span>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <form class="form-horizontal" method="post" action="" style="margin-right: 178px;">
                            <!--需求方联系人: -->
                            <div class="form-group">
                                <label class="col-xs-4 control-label">需求方联系人:</label>
                                <div class="col-xs-5">
                                    <div class="layui-input-inline layui-form" style="margin-left:2px">
                                        <select name="modules" id="projectDemand" lay-search>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!--联系人电话-->
                            <div class="form-group">
                                <label class="col-xs-4 control-label">需求方电话:</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control input-sm" id="demandPhone" style="margin-top: 7px;" placeholder="请输入供应商联系人电话">
                                </div>
                            </div>
                            <!-- 计划任务详细说明: -->
                            <div class="form-group">
                                <label class="col-xs-4 control-label">计划任务说明:</label>
                                <div class="col-xs-6">
                                    <textarea id="projectDetail" rows="15" cols="35" style="resize: none; margin-top: 10px;"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <sec:authorize access="hasAnyRole('ROLE_SUPPLIER','ROLE_ADMIN')">
                <div class="row">
                    <!--文件上传-->
                    <div class="layui-upload">
                        <button type="button" class="layui-btn layui-btn-normal" id="testList1">供应方文件上传</button>
                        <button type="button" class="layui-btn" id="testListAction1">开始上传</button>
                        <div class="layui-upload-list">
                            <table class="layui-table">
                                <thead>
                                <tr><th>文件名</th>
                                    <th>大小</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr></thead>
                                <tbody id="demoList1"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </sec:authorize>
                <sec:authorize access="hasAnyRole('ROLE_DEMAND','ROLE_ADMIN')">
                <div class="row">
                    <!--文件上传-->
                    <div class="layui-upload">
                        <button type="button" class="layui-btn layui-btn-normal" id="testList2">需求方文件上传</button>
                        <button type="button" class="layui-btn" id="testListAction2">开始上传</button>
                        <div class="layui-upload-list">
                            <table class="layui-table">
                                <thead>
                                <tr><th>文件名</th>
                                    <th>大小</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr></thead>
                                <tbody id="demoList2"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </sec:authorize>

                <div class="row" style="margin-left: 100px;">
                    <div class="col-md-2 pull-right">
                        <a href="javascript:location.reload();" id="close_modal" class="btn btn-default" data-dismiss="modal">取消
                        </a>
                        <button type="button" class="btn btn-primary" onclick="sentMsg()">
                            确定
                        </button>
                    </div>

                </div>
            </div>
        </div>
</div>
</div>


<!--修改密码-->
<div class="modal-dialog" id="passwordHtml" style="display: none;">
    <form class="form-horizontal" method="post" action="">
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-left: 2px;">原密码:</label>
            <div class="col-xs-6">
                <div class="layui-input-inline">
                    <input autocomplete="off" type="password" id="password1" name="" style="margin-top: 7px;" placeholder="请输入原密码">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-left: 2px;">新密码:</label>
            <div class="col-xs-6">
                <div class="layui-input-inline">
                    <input autocomplete="off" type="password" id="password2" name="" style="margin-top: 7px;" placeholder="请输入新密码">
                </div>
            </div>
        </div>
    </form>

    <div class="modal-footer">
        <button type="button" class="btn btn-default" id="close_time2" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="changePassword()">
            确定
        </button>
    </div>
</div>



<script type="text/html" id="toolbarDemo">
    <div class="layui-btn-container">
        <sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SUPPLIER','ROLE_DEMAND')">
            <button class="layui-btn" lay-event="add"><i class="layui-icon layui-icon-add-1"></i>新增</button>
            <button class="layui-btn layui-btn-warm" lay-event="update"><i class="layui-icon layui-icon-edit"></i>编辑</button>
            <button class="layui-btn layui-btn-danger" lay-event="delete"><i class="layui-icon layui-icon-delete"></i>删除</button>
        </sec:authorize>
        <sec:authorize access="hasAnyRole('ROLE_DEMAND','ROLE_ADMIN')">
            <button class="layui-btn layui-bg-blue" lay-event="success"><i class="layui-icon layui-icon-ok"></i>完成</button>
        </sec:authorize>
    </div>
</script>

</body>
<script>
    var username = "<%=session.getAttribute("account")%>";
    var rolename = "<%=session.getAttribute("rolename")%>";
</script>
<script src="js/project.js"></script>
</html>
