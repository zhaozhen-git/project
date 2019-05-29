<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>项目详情</title>
    <link rel="stylesheet" href="layui/css/layui.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link href='css/fullcalendar.print.css' rel='stylesheet' />
    <link href='css/fullcalendar.css' rel='stylesheet' />
    <script src="js/jquery-1.11.3.js"></script>
    <script src='js/fullcalendar.js'></script>
    <script src="js/jquery-ui.custom.min.js"></script>
    <script src="layui/layui.js"></script>
    <script src="js/bootstrap.js"></script>
    <style>
        #calendar_body{
            margin-left: 30px;
            margin-top: 5px;
            width: 1100px;
            height: 700px;
            border-radius: 2%;
            position: absolute;
        }
        #calendar_position{
            width: 900px;
            height: 600px;
            position: relative;
            top: 15px;
            left: 40px;
        }
        dl dd:hover,dl dd .selected{
            background-color:#d500ff80;
        }
        .selected{
            background-color:#d500ff80;
        }
    </style>
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <div class="layui-header">
        <div class="layui-logo">制造生产管理项目</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-layout-left">
            <li class="layui-nav-item layui-this"><a href="/crud">项目详情</a></li>
            <li class="layui-nav-item"><a href="/project">项目管理</a></li>
            <li class="layui-nav-item">
                <a class="" href="javascript:;">进行中的计划任务</a>
                <dl class="layui-nav-child" id="unfinish">

                </dl>
            </li>
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
    <!-- --------------------------------------------------------------------------- -->

    <%--<div class="layui-side layui-bg-black">--%>
        <%--<div class="layui-side-scroll">--%>
            <%--<!-- 左侧导航区域（可配合layui已有的垂直导航） -->--%>
            <%--<ul class="layui-nav layui-nav-tree"  lay-filter="test" id="item">--%>
                <%--<li class="layui-nav-item layui-nav-itemed">--%>
                    <%--<a class="" href="javascript:;">进行中的计划任务</a>--%>
                    <%--<dl class="layui-nav-child" id="unfinish">--%>

                    <%--</dl>--%>
                <%--</li>--%>
                <%--<li class="layui-nav-item">--%>
                    <%--<a href="javascript:;">已完成的计划任务</a>--%>
                    <%--<dl class="layui-nav-child" id="finish">--%>

                    <%--</dl>--%>
                <%--</li>--%>
            <%--</ul>--%>
        <%--</div>--%>
    <%--</div>--%>

    <!-- --------------------------------------------------------------------------- -->

    <div class="layui-body" style="left:0px">
        <!-- 内容主体区域 -->
        <div class="layui-tab layui-tab-brief" lay-filter="demo" style="padding: 10px;">
            <ul class="layui-tab-title">
                <%--<sec:authorize access="hasRole('ROLE_ADMIN')">--%>
                    <%--<li id="page_1">创建计划任务</li>--%>
                <%--</sec:authorize>--%>
                <li id="page_2" class="layui-this" onclick="calendar()">计划任务事件预览</li>
                <li id="page_3">计划任务事件节点</li>
                <sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SUPPLIER','ROLE_USER','ROLE_MANAGER')">
                    <li id="page_4">沟通事项</li>
                </sec:authorize>
            </ul>
            <div class="layui-tab-content">
                <%--<!-- 第一个页面 -->--%>
                <%--<sec:authorize access="hasRole('ROLE_ADMIN')">--%>
                    <%--<div class="layui-tab-item" id="one">--%>
                        <%--<div class="modal-dialog">--%>
                            <%--<div class="modal-content">--%>
                                <%--<div class="modal-header">--%>
                                    <%--<a href="javascript:location.reload();" class="close" aria-label="Close"><span aria-hidden="true">×</span></a>--%>
                                    <%--<h4 class="modal-title">新建任务计划</h4>--%>
                                <%--</div>--%>
                                <%--<div class="modal-body">--%>
                                    <%--<div class="container-fluid">--%>
                                        <%--<!-- 计划任务名称: -->--%>
                                        <%--<form class="form-horizontal" method="post" action="">--%>
                                            <%--<div class="form-group">--%>
                                                <%--<label class="col-xs-4 control-label"><i style="color: red;margin-right: 2px">*</i>计划任务名称:</label>--%>
                                                <%--<div class="col-xs-6">--%>
                                                    <%--<input autocomplete="off" type="text" class="form-control input-sm" id="project_name" name="" style="margin-top: 7px;" placeholder="请在这里输入计划任务名称">--%>
                                                <%--</div>--%>
                                            <%--</div>--%>
                                            <%--<!-- 计划任务负责人: -->--%>
                                            <%--<div class="form-group">--%>
                                                <%--<label class="col-xs-4 control-label"><i style="color: red;margin-right: 2px">*</i>计划任务负责人:</label>--%>
                                                <%--<div class="layui-input-inline layui-form" style="margin-left:15px">--%>
                                                <%--<select name="modules" id="project_director" lay-search>--%>
                                                    <%--<option value="">直接选择或搜索选择</option>--%>
                                                <%--</select>--%>
                                                <%--</div>--%>
                                            <%--</div>--%>
                                            <%--<!-- 计划任务完成周期: -->--%>
                                            <%--<div class="form-group">--%>
                                                <%--<label class="col-xs-4 control-label"><i style="color: red;margin-right:2px">*</i>计划任务完成周期:</label>--%>
                                                <%--<div class="col-xs-6">--%>
                                                    <%--<div class="layui-input-inline">--%>
                                                        <%--<input autocomplete="off" type="" class="form-control input-sm" value="" id="project_duringtime" name="" style="margin-top: 7px;" placeholder=" - ">--%>
                                                    <%--</div>--%>
                                                <%--</div>--%>
                                            <%--</div>--%>
                                            <%--<!-- 计划任务详细说明: -->--%>
                                            <%--<div class="form-group">--%>
                                                <%--<label class="col-xs-4 control-label">计划任务详细说明:</label>--%>
                                                <%--<div class="col-xs-6">--%>
                                                    <%--<textarea id="detailed_information" rows="10" cols="35" style="resize: none;"></textarea>--%>
                                                <%--</div>--%>
                                            <%--</div>--%>
                                        <%--</form>--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                                <%--<div class="modal-footer">--%>
                                    <%--<a href="javascript:location.reload();" class="btn btn-default" data-dismiss="modal">取消--%>
                                    <%--</a>--%>
                                    <%--<button type="button" class="btn btn-primary" onclick="sentMsg()">--%>
                                        <%--确定--%>
                                    <%--</button>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</sec:authorize>--%>


                <!-- 第二个页面 -->
                <div></div>
                <div class="layui-tab-item layui-show" id="two">
                    <div><span id="project_name" style="margin-left:4%;font-size: 30px;color: #009688">未选择项目</span></div>
                    <div id="calendar_body">
                        <div id="calendar_position">
                            <div id="calendar"></div>
                        </div>
                    </div>
                    <div style="position: relative;left: 1100px;top:60px">
                        <div style="margin: 10px;display: inline-block">
                            <div style="width:70px;height:70px;background-color: #9e9e9e;display: inline-block;float:left"></div>
                            <div style="width:70px;height:70px;display: inline-block;line-height: 65px;margin-left:10px">未完成状态</div>
                        </div>
                        <div style="margin: 10px;display: inline-block">
                            <div style="width:70px;height:70px;background-color: #4caf50;display: inline-block;float:left"></div>
                            <div style="width:70px;height:70px;display: inline-block;line-height: 65px;margin-left:10px">完成状态</div>
                        </div>
                        <div style="margin: 10px;display: inline-block">
                            <div style="width:70px;height:70px;background-color: #FFB800;display: inline-block;float:left"></div>
                            <div style="width:70px;height:70px;display: inline-block;line-height: 65px;margin-left:10px">延期状态</div>
                        </div>
                        <br>
                        <div style="margin: 10px">
                            <div style="width:245px;height:30px;background-color: #01AAED;display: inline-block;float:left"></div>
                            <div style="width:245px;height:30px;display: inline-block;line-height: 30px;margin-left:10px">正常</div>
                        </div>
                        <div style="margin: 10px">
                            <div style="width:245px;height:30px;background-color: #FF5722;display: inline-block;float:left"></div>
                            <div style="width:245px;height:30px;display: inline-block;line-height: 30px;margin-left:10px">紧急</div>
                        </div>
                        <br>
                        <%--<div style="margin: 10px">--%>
                            <%--<div style="width:245px;height:30px;background-color: #000000;display: inline-block;float:left"></div>--%>
                            <%--<div style="width:245px;height:30px;display: inline-block;line-height: 30px;margin-left:10px">待完成</div>--%>
                        <%--</div>--%>

                    </div>

                    <div style="position: relative;left: 1110px;top:50px">
                        <div style="border: 1px solid rgba(121, 85, 72, 0.52);display: inline-block;width:250px;height:400px;vertical-align:top">
                            <label style="width: 250px;height:50px;background-color: #C2BE9E;text-align: center;color: #795548;line-height: 50px">供应方文件</label>
                            <div id="supplier_file" style="overflow: auto"></div>
                        </div>
                        <div style="border: 1px solid rgba(121, 85, 72, 0.52);display: inline-block;width:250px;height:400px;vertical-align:top">
                            <label style="width: 250px;height:50px;background-color: #C2BE9E;text-align: center;color: #795548;line-height: 50px">需求方文件</label>
                            <div id="demand_file" style="overflow: auto"></div>
                        </div>
                    </div>

                    <div style="position: relative;left: 1110px;top:80px">
                        <div>
                            <label>项目完成进度</label>
                            <br>
                            <div class="layui-progress layui-progress-big" lay-showpercent="true" style="width:500px;height:20px;background-color: #9e9e9e" lay-filter="progressing">
                                <div class="layui-progress-bar layui-bg-green" lay-percent="0%" style="width:500px;height:20px;display: inline-block"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 第三个页面 -->
                <div class="layui-tab-item" id="three">
                    <table class="layui-hide" id="test" lay-filter="test"></table>
                </div>

                <!--第四个页面 -->
                <div class="layui-tab-item" id="four">
                    <div style="display: inline-block;width: 49%;vertical-align:top">
                        <table class="layui-hide" id="fourHtml" lay-filter="fourHtml"></table>
                    </div>
                    <div style="display: inline-block;width: 49%;vertical-align:top">
                        <table class="layui-hide" id="fourTable" lay-filter="fourTable"></table>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="layui-footer" style="left:0px">
        <!-- 底部固定区域 -->
        © 捷昌线性驱动有限公司
    </div>
</div>



<!----------------------------------------------------------------------------------------------------------------------------->

<!--事件详情预览-->
<div class="modal-dialog_1" style="margin-top: 30px;display: none">
    <div class="container-fluid">
        <!-- 计划任务名称: -->
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-top: 7px;">事件节点名称:</label>
            <div class="col-xs-6">
                <input type="text" class="form-control input-sm" id="event_title" style="margin-top: 7px;" disabled="disabled">
            </div>
        </div>
        <!-- 计划任务负责人: -->
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-top: 7px;">事件节点负责人:</label>
            <div class="col-xs-6">
                <input type="text" class="form-control input-sm" id="event_person" style="margin-top: 7px;" disabled="disabled">
            </div>
        </div>
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-top: 7px;">开始到结束时间:</label>
            <div class="col-xs-6">
                <input type="text" class="form-control input-sm" id="event_time" style="margin-top: 7px;" disabled="disabled">
            </div>
        </div>
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-top: 7px;">计划时长:</label>
            <div class="col-xs-6">
                <input type="text" class="form-control input-sm" id="event_days" style="margin-top: 7px;" disabled="disabled">
            </div>
        </div>
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-top: 7px;">事件任务详细说明:</label>
            <div class="col-xs-6">
                <textarea id="event_remark" rows="10" cols="35" style="resize: none;margin-top: 7px;padding:10px" disabled="disabled"></textarea>
            </div>
        </div>
    </div>
</div>

<!------------------------------------------------------------------------------------------------------------------------->


<!--新增事件节点-->
<div class="modal-dialog" id="ggggg" style="display: none;">
    <!-- 事件节点名称: -->
    <form class="form-horizontal" method="post" action="">
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right:2px">*</i>事件节点名称:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="eventName" name="" style="margin-top: 7px;" placeholder="请在这里输入事件节点名称">
            </div>
        </div>
        <!-- 负责组长: -->
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right:2px">*</i>负责组长:</label>
            <div class="layui-input-inline layui-form" style="margin-left:15px">
                <select name="modules" id="groupLeader" lay-search>
                    <option value="">直接选中或搜索选择</option>
                </select>
            </div>
            <%--<div class="col-xs-6">--%>
                <%--<input autocomplete="off" type="text" class="form-control input-sm" id="groupLeader" style="margin-top: 7px;" placeholder="请在这里输入任务负责人名称">--%>
            <%--</div>--%>
        </div>
        <!-- 计划任务完成周期: -->
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-left: 2px;"><i style="color: red;margin-right:2px">*</i>节点周期:</label>
            <div class="col-xs-6">
                <div class="layui-input-inline">
                    <input autocomplete="off" type="" class="form-control input-sm" value="" id="duringTime" name="" style="margin-top: 7px;" placeholder=" - ">
                </div>
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label">事件状态:</label>
            <div class="col-xs-6">
                <select lay-search="" id="selected" style="height: 30px">
                    <option value="0">正常</option>
                    <option value="1">紧急</option>
                </select>
            </div>
        </div>


        <!-- 计划任务详细说明: -->
        <div class="form-group">
            <label class="col-xs-4 control-label">节点详情描述:</label>
            <div class="col-xs-6">
                <textarea id="eventDescription" rows="10" cols="35" style="resize: none;"></textarea>
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button class="btn btn-default" id="close_modal" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="addEvent()">
            确定
        </button>
    </div>
</div>



<!--编辑事件节点-->
<div class="modal-dialog" id="kkkkk" style="display: none;">
    <!-- 事件节点名称: -->
    <form class="form-horizontal" method="post" action="">
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>事件节点名称:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="event_name" name="" style="margin-top: 7px;" placeholder="请在这里输入事件节点名称">
            </div>
        </div>
        <!-- 负责组长: -->
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right: 2px">*</i>负责人:</label>
            <div class="layui-input-inline layui-form" style="margin-left:15px">
                <select name="modules" id="group_leader" lay-search>
                    <%--<option value="">直接选择或搜索选择</option>--%>
                </select>
            </div>
            <%--<div class="col-xs-6">--%>
                <%--<input autocomplete="off" type="text" class="form-control input-sm" id="group_leader" style="margin-top: 7px;" placeholder="请在这里输入任务负责人名称">--%>
            <%--</div>--%>
        </div>
        <!--&lt;!&ndash; 负责人电话: &ndash;&gt;-->
        <!--<div class="form-group">-->
        <!--<label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px">*</i>负责组长电话:</label>-->
        <!--<div class="col-xs-6">-->
        <!--<input autocomplete="off" type="text" class="form-control input-sm" id="phone_number" style="margin-top: 7px;" placeholder="请在这里输入负责人电话">-->
        <!--</div>-->
        <!--</div>-->
        <!-- 计划任务完成周期: -->
        <div class="form-group">
            <label class="col-xs-4 control-label">节点周期:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="" class="form-control input-sm" value="" id="during_time" name="" style="margin-top: 7px;" placeholder=" - " disabled="disabled">
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label">事件状态:</label>
            <div class="col-xs-6">
                <select name="modules" id="select" style="height: 30px">
                    <option value="0">正常</option>
                    <option value="1">紧急</option>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label">完成状态:</label>
            <div class="col-xs-6">
                <input class="form-control input-sm" value="未完成" id="change_state" style="margin-top: 7px;" disabled="disabled">
            </div>
        </div>

        <!-- 计划任务详细说明: -->
        <div class="form-group">
            <label class="col-xs-4 control-label">节点详情描述:</label>
            <div class="col-xs-6">
                <textarea id="event_description" rows="10" cols="35" style="resize: none;padding:10px"></textarea>
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button class="btn btn-default" id="close" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="updateEvent()">
            确定
        </button>
    </div>
</div>



<!--编辑时间节点-->
<div class="modal-dialog" id="tttt" style="display: none;">
    <!-- 事件节点名称: -->
    <form class="form-horizontal" method="post" action="">
        <!-- 计划任务完成周期: -->
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-left: 2px;"><i style="color: red;margin-right:2px">*</i>节点周期:</label>
            <div class="col-xs-6">
                <div class="layui-input-inline">
                    <input autocomplete="off" type="" class="form-control input-sm" value="" id="time" name="" style="margin-top: 7px;" placeholder=" - ">
                </div>
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label">事件状态:</label>
            <div class="col-xs-6">
                <select lay-search="" id="select1" style="height: 30px">
                    <option value="0">时间选错了</option>
                    <option value="1">延期</option>
                </select>
            </div>
        </div>
    </form>

    <div class="modal-footer">
        <button class="btn btn-default" id="close_time" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="changeTime()">
            确定
        </button>
    </div>
</div>


<!--编辑进度条节点-->
<div class="modal-dialog" id="progressHtml" style="display: none;">
    <form class="form-horizontal" method="post" action="">
        <!-- 计划任务完成周期: -->
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-left: 2px;"><i style="color: red;margin-right:2px">*</i>事件进度:</label>
            <div class="col-xs-6">
                <div class="layui-input-inline">
                    <input autocomplete="off" type="text" class="form-control input-sm" value="" id="progressNum" name="" style="margin-top: 7px;" placeholder="请输入进度值（0-100）">
                </div>
            </div>
        </div>
    </form>

    <div class="modal-footer">
        <button class="btn btn-default" id="close_progress" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="changeProgress()">
            确定
        </button>
    </div>
</div>




<!--新增沟通事件-->
<div class="modal-dialog" id="addExtra" style="display: none;">
    <!-- 事件节点名称: -->
    <form class="form-horizontal" method="post" action="">
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right:2px">*</i>事件节点名称:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="extraName" name="" style="margin-top: 7px;" placeholder="请在这里输入事件节点名称">
            </div>
        </div>
        <!-- 负责组长: -->
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right:2px">*</i>负责人:</label>
            <div class="layui-input-inline layui-form" style="margin-left:15px">
                <select name="modules" id="extraPerson" lay-search>
                    <option value="">直接选择或搜索选择</option>
                </select>
            </div>
            <%--<div class="col-xs-6">--%>
                <%--<input autocomplete="off" type="text" class="form-control input-sm" id="extraPerson" style="margin-top: 7px;" placeholder="请在这里输入任务负责人名称">--%>
            <%--</div>--%>
        </div>
        <!-- 计划任务完成周期: -->
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-left: 2px;"><i style="color: red;margin-right:2px">*</i>节点时间:</label>
            <div class="col-xs-6">
                <div class="layui-input-inline">
                    <input autocomplete="off" type="" class="form-control input-sm" value="" id="extraT" name="" style="margin-top: 7px;" placeholder=" - ">
                </div>
            </div>
        </div>
        <!-- 创建人: -->
        <div class="form-group">
            <label class="col-xs-4 control-label">创建人:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="addPerson" style="margin-top: 7px;" placeholder="请在这里输入任务负责人名称" value="<%=session.getAttribute("username")%>" disabled="disabled">
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button class="btn btn-default" id="close_extra" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="addExtra()">
            确定
        </button>
    </div>
</div>





<!--编辑沟通事件-->
<div class="modal-dialog" id="updateExtra" style="display: none;">
    <!-- 事件节点名称: -->
    <form class="form-horizontal" method="post" action="">
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color:red;margin-right: 2px;">*</i>事件节点名称:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="text" class="form-control input-sm" id="extra_name" name="" style="margin-top: 7px;" placeholder="请在这里输入事件节点名称">
            </div>
        </div>
        <!-- 负责组长: -->
        <div class="form-group">
            <label class="col-xs-4 control-label"><i style="color: red;margin-right: 2px">*</i>负责人:</label>
            <div class="layui-input-inline layui-form" style="margin-left:15px">
                <select name="modules" id="extra_person" lay-search>
                    <option value="">直接选择或搜索选择</option>
                </select>
            </div>
            <%--<div class="col-xs-6">--%>
                <%--<input autocomplete="off" type="text" class="form-control input-sm" id="extra_person" style="margin-top: 7px;" placeholder="请在这里输入任务负责人名称">--%>
            <%--</div>--%>
        </div>
        <div class="form-group">
            <label class="col-xs-4 control-label">时间:</label>
            <div class="col-xs-6">
                <input autocomplete="off" type="" class="form-control input-sm" value="" id="extra_time" name="" style="margin-top: 7px;" placeholder=" - " disabled="disabled">
            </div>
        </div>
        <div class="form-group">
            <label class="col-xs-4 control-label">完成状态:</label>
            <div class="col-xs-6">
                <input class="form-control input-sm" value="未完成" id="extra_success" style="margin-top: 7px;" disabled="disabled">
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button class="btn btn-default" id="close_1" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="updateExtra()">
            确定
        </button>
    </div>
</div>




<!--编辑待完成时间节点-->
<div class="modal-dialog" id="time_time" style="display: none;">
    <!-- 事件节点名称: -->
    <form class="form-horizontal" method="post" action="">
        <!-- 计划任务完成周期: -->
        <div class="form-group">
            <label class="col-xs-4 control-label" style="margin-left: 2px;"><i style="color: red;margin-right:2px">*</i>时间:</label>
            <div class="col-xs-6">
                <div class="layui-input-inline">
                    <input autocomplete="off" type="" class="form-control input-sm" value="" id="time1" name="" style="margin-top: 7px;" placeholder=" - ">
                </div>
            </div>
        </div>
    </form>

    <div class="modal-footer">
        <button class="btn btn-default" id="close_time1" data-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" onclick="changeExtraTime()">
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
        <sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')">
            <button class="layui-btn" lay-event="add"><i class="layui-icon layui-icon-add-1"></i>新增</button>
            <button class="layui-btn layui-btn-warm" lay-event="update"><i class="layui-icon layui-icon-edit"></i>编辑</button>
            <button class="layui-btn layui-btn-danger" lay-event="delete"><i class="layui-icon layui-icon-delete"></i>删除</button>
            <button class="layui-btn layui-bg-cyan" lay-event="time"><i class="layui-icon layui-icon-edit"></i>编辑时间</button>
        </sec:authorize>
        <sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_USER','ROLE_MANAGER')">
            <button class="layui-btn layui-bg-blue" lay-event="success"><i class="layui-icon layui-icon-ok"></i>完成</button>
            <button class="layui-btn" lay-event="progress"><i class="layui-icon layui-icon-edit"></i>编辑进度条</button>
        </sec:authorize>
    </div>
</script>

<%--沟通事项的工具栏--%>
<script type="text/html" id="toolDemo">
    <div class="layui-btn-container">
        <%--<sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')">--%>
            <button class="layui-btn" lay-event="add1"><i class="layui-icon layui-icon-add-1"></i>新增</button>
            <button class="layui-btn layui-btn-warm" lay-event="update1"><i class="layui-icon layui-icon-edit"></i>编辑</button>
            <button class="layui-btn layui-btn-danger" lay-event="delete1"><i class="layui-icon layui-icon-delete"></i>删除</button>
            <button class="layui-btn layui-bg-cyan" lay-event="time1"><i class="layui-icon layui-icon-edit"></i>编辑时间</button>
        <%--</sec:authorize>--%>
        <%--<sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_USER','ROLE_MANAGER')">--%>
            <button class="layui-btn layui-bg-blue" lay-event="success1"><i class="layui-icon layui-icon-ok"></i>完成</button>
        <%--</sec:authorize>--%>
    </div>
</script>

<script type="text/html" id="toolDemo1">
    <div class="layui-btn-container">
    </div>
</script>

<script>
    var username = "<%=session.getAttribute("account")%>";
    var account = "<%=session.getAttribute("username")%>";
    var projectID = "<%=session.getAttribute("ID")%>";
</script>
<script src="js/crud.js"></script>
</body>
</html>

