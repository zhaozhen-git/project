<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="css/bootstrap.css">
    <title>登录页面</title>
</head>
<body style="padding-top: 50px;">
<div style="margin-left:43%">
    <label style="color: #c9302c;font-size: 30px">用户不存在或者密码错误</label>
</div>
<div class="container">
    <div style="padding: 40px 15px;text-align: center;">
        <h2>使用账号密码登录</h2>
        <form name="form" action="/getLogin" method="POST">
            <div class="form-group">
                <label for="username">账号</label>
                <input type="text" class="form-control" name="username" value="" placeholder="账号" id="username"/>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" class="form-control" name="password" placeholder="密码" id="password"/>
            </div>
            <input type="submit" id="login" value="Login" class="btn btn-primary"/>
        </form>
    </div>
</div>
</body>

</html>





