<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
    <title>部门管理</title>
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
                <li class="layui-nav-item"><a href="/person">人员管理</a></li>
            </sec:authorize>
            <sec:authorize access="hasAnyRole('ROLE_ADMIN')">
                <li class="layui-nav-item layui-this"><a href="/department">部门管理</a></li>
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

<!--新增部门节点-->
<div class="modal-dialog" id="ggggg" style="display: none;">
    <form class="form-horizontal" method="post" action="">
        <!--人员工号: -->
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right:2px">*</i>部门ID:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="department_id" name="" style="margin-top: 7px;" placeholder="请在这里输入部门ID">
            </div>
        </div>
        <!--姓名: -->
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right:2px">*</i>部门名称:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="department_name" name="" style="margin-top: 7px;" placeholder="请在这里输入部门名称">
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button class="btn btn-default" id="close_modal" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="addDepartment()">
            确定
        </button>
    </div>
</div>



<!--编辑部门-->
<div class="modal-dialog" id="kkkkk" style="display: none;">
    <form class="form-horizontal" method="post" action="">
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>部门ID:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="departmentID" name="" style="margin-top: 7px;" disabled="disabled">
            </div>
        </div>
        <!-- 部门名称: -->
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right: 2px">*</i>部门名称:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="departmentName" name="" style="margin-top: 7px;" placeholder="请在这里输入部门名称">
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button class="btn btn-default" id="close" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="updateDepartment()">
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
    </div>
</script>


</body>

<script>
    var user_ID = "<%=session.getAttribute("account")%>";
    var rolename = "<%=session.getAttribute("rolename")%>";
</script>
<script src="js/department.js"></script>
</html>
