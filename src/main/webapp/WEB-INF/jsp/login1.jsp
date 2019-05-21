<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>
    <title>登录页面</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
    <link rel="stylesheet" type="text/css" href="../../css/bootstrap.css">
    <style>
        .form-group{
            margin-bottom: 10px;
        }
        .modal-footer1{
            padding: 1px;
            height: 35px;
        }
        #curtain{
            position:absolute;
            width: 100%;
            height: 99%;
            opacity:0.7;
            top: 2px;
            display: none;
            filter: alpha(opacity=40);
            background-color: #000000;
            z-index: -2;
        }

    </style>

</head>
<body>
<header class="banner">
    <div class="container" style="width: 100%; height: 260px;">
        <img src="img/headerjiecang.png" style="width: 100%; height: 260px;">
    </div>
</header>
<main>
    <div class="container-fluid" style=" height:680px; background-image: url(../../img/jiecang_gate.jpg);background-repeat: no-repeat; ">
        <div class="row">
            <div class="col-md-8">
                <h2 style="padding: 20px; margin-left: 240px; font-weight: bold; " >用户注册</h2>
                <div class="container" style="width: 500px; float: left; padding-left: 150px;">
                    <div style="width: 360px; height: 460px; background-color:#bce8f1; border-radius: 5%;">
                        <form style="width: 350px; height: 460px; padding: 35px; margin-left: 10px;" action="/add">
                            <div class="form-group">
                                <label for="inputPhoneNum">请输入手机号码：</label>
                                <span>
										<input type="text"  class="form-control" id="inputPhoneNum" placeholder="请在此输入手机号码"
                                               style="width: 220px;display: inline-block;" onblur="valPhone(this.value)"/>
										<img id="phoneNumPic" src="" height="15" width="15" style=""/>
									</span>
                            </div>
                            <div class="form-group">
                                <label for="inputPassword">请设置密码：</label>
                                <span>
										<input type="password"  class="form-control" id="inputPassword" placeholder="输入6-18位的密码"
                                               style="width: 220px;display: inline-block;" onblur="valPwd(this.value)"/>
										<img id="pwdPic" src="" height="15" width="15" style=""/>
									</span>
                            </div>
                            <div class="form-group">
                                <label for="re_inputPassword">请确认密码：</label>
                                <span>
										<input type="password" class="form-control" id="re_inputPassword" placeholder="请重复密码"
                                               style="width: 220px;display: inline-block;" onblur="valRePwd(this.value)">
										<img id="rePwdPic" src="" height="15" width="15" style=""/>
									</span>
                            </div>
                            <div class="form-group">
                                <label for="inputNickname">请输入昵称：</label>
                                <input type="password" class="form-control" id="inputNickname" placeholder="请输入用户昵称">
                            </div>
                            <div class="form-group">
                                <label for="inputCode">验证码：</label>
                                <div>
										<span><input type="password" class="form-control" id="inputCode" style="width: 80px;display: inline-block;">
											<img src="../../img/1234.png"  style="margin-left: 10px;" height="30" width="46"/>
													<a href="#">看不清楚，换一张</a>
										</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="submit" value="注册" class="btn btn-success btn-lg" style="margin-top: 5px;">
                                <span style="margin-left:20px;">若已有账号，请点击 <a href="javascript:void(0);" onclick="openModal()">登录</a></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<footer class="modal-footer1">
    <div class="btn-group dropup" style="float: right; margin-right: 40px;">
        <button type="button" class="btn btn-default"><a style="text-decoration:none;">Learn More</a></button>
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" >
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" role="menu">
            <li><a class="btn btn-md btn-info">关于我们</a></li>
            <li><a class="btn btn-md btn-info">联系我们</a></li>
        </ul>
    </div>
</footer>
<div id="curtain"></div>
<div class="modal-dialog" style="float: left; position:absolute; top: 250px; left:600px; text-align:center; z-index: -1;">
    <div class="modal-content">
        <div class="modal-header">
            <a href="javascript:location.reload();" class="close" aria-label="Close"><span aria-hidden="true">×</span></a>
            <h4>员工登录页面</h4>
        </div>
        <div class="modal-body">
            <div class="container-fluid">
                <form action="/getLogin" class="form-horizontal" method="post">
                    <div class="form-group">
                        <label class="col-xs-4 control-label">手机号:</label>
                        <div class="col-xs-6">
                            <input autocomplete="off" type="text" class="form-control input-sm" id="username" name="uname" value=""  style="margin-top: 7px;" placeholder="请在这里输入用户名">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-4 control-label">登录密码:</label>
                        <div class="col-xs-6">
                            <input maxlength="10" type="password" class="form-control input-sm" id="password" name="upwd" style="margin-top: 7px;" placeholder="6-16位登录密码">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal-footer">
            <a href="javascript:location.reload();" class="btn btn-default" >取消
            </a>
            <button type="button" class="btn btn-primary" id="login-form" onclick="">
                确定
            </button>
        </div>
    </div>
</div>

<script src="js/jquery-1.11.3.js"></script>
<script src="js/bootstrap.js"></script>
<script>
    //当手机文本框失去焦点时自动触发
    function valPhone(txt) {
        var reg = new RegExp("^1[3|4|5|6|7|8]\\d{9}$");
        if(reg.test(txt)){
            $('#phoneNumPic').attr("src","../../img/correct.png");
        }else{
            $('#phoneNumPic').attr("src","../../img/error.png");
        }
    }
    //当密码文本框失去焦点时自动触发
    function valPwd(txt) {
        var reg = new RegExp("^[0-9A-Za-z]{8,16}$");
        if (reg.test(txt)){
            $('#pwdPic').attr("src","../../img/correct.png");
        } else{
            $('#pwdPic').attr("src","../../img/error.png");
        }
    }
    //当重复密码文本框失去焦点时自动触发
    function valRePwd(txt) {
        var pwd = $("#inputPassword").val();
        if (pwd === txt && txt !== ""){
            $("#rePwdPic").attr("src","../../img/correct.png");
        } else{
            $("#rePwdPic").attr("src","../../img/error.png");
        }
    }
    //单击登录弹出登录模态框
    function openModal() {
        $(".modal-dialog").css({"z-index":"999"});
        $("#curtain").css({"z-index":"998"})
            .css("display","block");
    }
</script>

</body>
</html>