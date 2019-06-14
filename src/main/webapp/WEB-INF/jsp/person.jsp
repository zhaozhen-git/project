<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>人员管理</title>
    <link rel="stylesheet" href="layui/css/layui.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/crud.css">
    <script src="js/jquery-1.11.3.js"></script>
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
            <li class="layui-nav-item"><a href="/project">项目管理</a></li>
            <sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')">
                <li class="layui-nav-item layui-this"><a href="/person">人员管理</a></li>
            </sec:authorize>
        </ul>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
                    <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
                    <%=session.getAttribute("username")%>
                </a>
                <dl class="layui-nav-child" style="text-align: center;">
                    <dd><span onclick="setPassword()" style="color: #00db42;cursor: pointer">修改密码</span></dd>
                </dl>
            </li>
            <li class="layui-nav-item"><a href="/">退出登录</a></li>
        </ul>
    </div>


    <div class="layui-body" style="position: static">
        <!-- 内容主体区域 -->
        <div class="layui-tab layui-tab-brief" lay-filter="demo" style="padding: 10px;">
            <div class="layui-upload" style="display: inline-block">
                <button class="layui-btn layui-btn-warm layui-btn-radius" onclick="window.open('content/model.xlsx')"><i class="layui-icon layui-icon-template-1"></i>下载Excel模板</button>
                <button class="layui-btn layui-btn-normal layui-btn-radius" lay-event="file" id="file"><i class="layui-icon layui-icon-table"></i>选择文件</button><span id="fileName"></span>
                <button class="layui-btn layui-btn-radius" id="uploadFile" lay-event="uploadFile"><i class="layui-icon layui-icon-upload-circle"></i>开始上传</button>
            </div>
            <div class="demoTable" style="float: right;display: inline-block">
                按姓名/部门：
                <div class="layui-inline">
                    <input class="layui-input" name="id" id="demoReload" autocomplete="off">
                </div>
                <button class="layui-btn" data-type="reload">搜索</button>
            </div>
            <div class="layui-tab-item layui-show" id="table">
                <table id="test" lay-filter="test"></table>
            </div>
        </div>
    </div>

    <div class="layui-footer" style="left:0px">
        <!-- 底部固定区域 -->
        © 捷昌线性驱动有限公司
    </div>

</div>


<!--新增人员节点-->
<div class="modal-dialog" id="ggggg" style="display: none;">
    <form class="form-horizontal" method="post" action="">
        <!--人员工号: -->
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right:2px">*</i>人员工号:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="user_id" name="" style="margin-top: 7px;" placeholder="请在这里输入人员工号">
            </div>
        </div>
        <!--姓名: -->
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right:2px">*</i>姓名:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="user_name" name="" style="margin-top: 7px;" placeholder="请在这里输入人员姓名">
            </div>
        </div>
        <!-- 部门: -->
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-left: 2px;"><i style="color: red;margin-right:2px">*</i>部门:</label>
            <div class="layui-input-inline layui-form" style="margin-left:15px">
                <select name="modules" id="department_name" lay-search>
                    <option value="">直接选中或搜索选择</option>
                </select>
            </div>
        </div>
        <!-- 角色权限: -->
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-left: 2px;"><i style="color: red;margin-right:2px">*</i>角色权限:</label>
            <div class="layui-input-inline layui-form" style="margin-left:15px">
                <select name="modules" id="role1" lay-search>
                    <option value="">直接选中或搜索选择</option>
                </select>
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button class="btn btn-default" id="close_modal" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="addPerson()">
            确定
        </button>
    </div>
</div>



<!--编辑人员-->
<div class="modal-dialog" id="kkkkk" style="display: none;">
    <form class="form-horizontal" method="post" action="">
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>人员工号:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="userID" name="" style="margin-top: 7px;" disabled="disabled">
            </div>
        </div>
        <!-- 人员姓名: -->
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right: 2px">*</i>人员姓名:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="userName" name="" style="margin-top: 7px;" placeholder="请在这里输入人员姓名">
            </div>
        </div>
        <div class="form-group">
            <label class="col-xs-4 control-label">部门:</label>
            <div class="layui-input-inline layui-form" style="margin-left:15px">
                <select name="modules" id="departmentName" lay-search>
                    <option value="">直接选中或搜索选择</option>
                </select>
            </div>
        </div>
        <!-- 角色权限: -->
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-left: 2px;"><i style="color: red;margin-right:2px">*</i>角色权限:</label>
            <div class="layui-input-inline layui-form" style="margin-left:15px">
                <select name="modules" id="role2" lay-search>
                    <option value="">直接选中或搜索选择</option>
                </select>
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button class="btn btn-default" id="close" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="updatePerson()">
            确定
        </button>
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
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-left: 2px;">确认新密码:</label>
            <div class="col-xs-6">
                <div class="layui-input-inline">
                    <input autocomplete="off" type="password" id="password3" name="" style="margin-top: 7px;" placeholder="请输入确认新密码">
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
        <button class="layui-btn" lay-event="add"><i class="layui-icon layui-icon-add-1"></i>新增</button>
        <button class="layui-btn layui-btn-warm" lay-event="update"><i class="layui-icon layui-icon-edit"></i>编辑</button>
        <button class="layui-btn layui-btn-danger" lay-event="delete"><i class="layui-icon layui-icon-delete"></i>删除</button>
        <button class="layui-btn" lay-event="use"><i class="layui-icon layui-icon-play"></i>启用</button>
        <button class="layui-btn layui-btn-danger" lay-event="cancel"><i class="layui-icon layui-icon-pause"></i>注销</button>
    </div>
</script>


</body>
<script>
    var user_ID = "<%=session.getAttribute("account")%>";
    var rolename = "<%=session.getAttribute("rolename")%>";
</script>
<script src="js/person.js"></script>
</html>
