var project = "";
//供应方上传文件
var data1 = "";
//需求方上传文件
var data2 = "";

//编辑时供应方文件名存放
var suData = "";

//编辑时需求方文件名存放
var deData = "";

var dataNum1 = -1;
var dataNum2 = -1

var num1 = new Array();
var num2 = new Array();


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
            var userList = data.user;
            var supplierList = data.supplier;
            var demandList = data.demand;
            var managerList = data.manager;
            $.each(userList, function (i, item) {
            });
            $.each(supplierList, function (i, item) {
                $("#project_supplier").append("<option value=" + item.user_ID + ">" + item.user_account + "</option>");
                $("#projectSupplier").append("<option value=" + item.user_ID + ">" + item.user_account + "</option>");
            });
            $.each(demandList, function (i, item) {
                $("#project_demand").append("<option value=" + item.user_ID + ">" + item.user_account + "</option>");
                $("#projectDemand").append("<option value=" + item.user_ID + ">" + item.user_account + "</option>");
            });
            $.each(managerList, function (i, item) {
                $("#project_director").append("<option value=" + item.user_ID + ">" + item.user_account + "</option>");
                $("#projectDirector").append("<option value=" + item.user_ID + ">" + item.user_account + "</option>");
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
    laydate.render({
        elem: '#projectTime',
        range: true
    });
});


layui.use('upload', function() {
    var $ = layui.jquery, upload = layui.upload;

    var demoListView = $('#demoList1')
        , uploadListIns = upload.render({
        elem: '#testList1'
        , url: '/upload/'
        , accept: 'file'
        , multiple: true
        , auto: false
        , bindAction: '#testListAction1'
        , choose: function (obj) {
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                dataNum1 = dataNum1 +1;
                num1.push(dataNum1);
                var tr = $(['<tr id="sup' + dataNum1 + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1024).toFixed(1) + 'kb</td>'
                    , '<td>等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="del1('+dataNum1+')">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                demoListView.append(tr);
            });
        }
        , done: function (res, index, upload) {
            if (res.code === 0) { //上传成功
                data1 += res.data.src+";";
                for(var i=0;i<num1.length;i++){
                    if(num1[i]===""){
                        continue;
                    }
                    var tr = demoListView.find('tr#sup' + num1[i])
                        , tds = tr.children();
                    tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                    tds.eq(3).html('<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="delSupplier('+num1[i]+')">删除</button>'); //清空操作
                }
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
        }
    });
});

layui.use('upload', function() {
    var $ = layui.jquery, upload = layui.upload;

    var demoListView = $('#demoList2')
        , uploadListIns = upload.render({
        elem: '#testList2'
        , url: '/upload/'
        , accept: 'file'
        , multiple: true
        , auto: false
        , bindAction: '#testListAction2'
        , choose: function (obj) {
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                dataNum2 = dataNum2 +1;
                num2.push(dataNum2);
                var tr = $(['<tr id="dem' + dataNum2 + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1024).toFixed(1) + 'kb</td>'
                    , '<td>等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="del2('+dataNum1+')">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                demoListView.append(tr);
            });
        }
        , done: function (res, index, upload) {
            if (res.code === 0) { //上传成功
                data2 += res.data.src+";";
                for(var i=0;i<num2.length;i++){
                    if(num2[i]===""){
                        continue;
                    }
                    var tr = demoListView.find('tr#dem' + num2[i])
                        , tds = tr.children();
                    tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                    tds.eq(3).html('<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="delDemand('+num2[i]+')">删除</button>'); //清空操作
                }
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
        }
    });
});



layui.use('upload', function() {
    var $ = layui.jquery, upload = layui.upload;

    var demoListView = $('#supplierDemo')
        , uploadListIns = upload.render({
        elem: '#supplierList'
        , url: '/upload/'
        , accept: 'file'
        , multiple: true
        , auto: false
        , bindAction: '#supplierListAction'
        , choose: function (obj) {
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                dataNum1 = dataNum1 +1;
                num1.push(dataNum1);
                var tr = $(['<tr id="sup' + dataNum1 + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1024).toFixed(1) + 'kb</td>'
                    , '<td>等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="del1('+dataNum1+')">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                demoListView.append(tr);
            });
        }
        , done: function (res, index, upload) {
            if (res.code === 0) { //上传成功
                data1 += res.data.src+";";
                for(var i=0;i<num1.length;i++){
                    if(num1[i]===""){
                        continue;
                    }
                    var tr = demoListView.find('tr#sup' + num1[i])
                        , tds = tr.children();
                    tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                    tds.eq(3).html('<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="delSupplier('+num1[i]+')">删除</button>'); //清空操作
                }
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
        }
    });
});




layui.use('upload', function() {
    var $ = layui.jquery, upload = layui.upload;

    var demoListView = $('#demandDemo')
        , uploadListIns = upload.render({
        elem: '#demandList'
        , url: '/upload/'
        , accept: 'file'
        , multiple: true
        , auto: false
        , bindAction: '#demandListAction'
        , choose: function (obj) {
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                dataNum2 = dataNum2 +1;
                num2.push(dataNum2);
                var tr = $(['<tr id="dem' + dataNum2 + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1024).toFixed(1) + 'kb</td>'
                    , '<td>等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="del2('+dataNum2+')">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));
                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                demoListView.append(tr);
            });
        }
        , done: function (res, index, upload) {
            if (res.code === 0) { //上传成功
                data2 += res.data.src+";";
                for(var i=0;i<num2.length;i++){
                    if(num2[i]===""){
                        continue;
                    }
                    var tr = demoListView.find('tr#dem' + num2[i])
                        , tds = tr.children();
                    tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                    tds.eq(3).html('<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="delDemand('+num2[i]+')">删除</button>'); //清空操作
                }
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        , error: function (index, upload) {
            var tr = demoListView.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
        }
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
                , {field: 'project_detail', title: '备注', width: 300,align:'center'}
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
                    , area: ['1200px', 'auto'] //宽高
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
                    if(rolename==="ROLE_SUPPLIER" || rolename==="ROLE_DEMAND"){
                        $("#project_name").attr("readonly","readonly")
                        $("#project_director").attr("disabled","disabled");
                        $("#project_time").attr("readonly","readonly");
                        $("#project_supplier").attr("disabled","disabled");
                        $("#supplier_phone").attr("readonly","readonly");
                        $("#project_demand").attr("disabled","disabled");
                        $("#demand_phone").attr("readonly","readonly");
                        $("#project_detail").attr("readonly","readonly");
                    }
                    var project_name = checkRow.data[0].project_name;
                    var project_director = checkRow.data[0].project_director;
                    var project_time = checkRow.data[0].project_time;
                    var project_supplier = checkRow.data[0].project_supplier;
                    var supplier_phone = checkRow.data[0].supplier_phone;
                    var project_demand = checkRow.data[0].project_demand;
                    var demand_phone = checkRow.data[0].demand_phone;
                    var project_detail = checkRow.data[0].project_detail;
                    var supplier_data = checkRow.data[0].supplier_data;
                    var demand_data = checkRow.data[0].demand_data;
                    project = checkRow.data[0].project_ID;
                    $("#project_name").val(project_name);
                    $("#project_director option:contains('"+project_director+"')").attr("selected",true);
                    $("#project_supplier option:contains('"+project_supplier+"')").attr("selected",true);
                    $("#project_demand option:contains('"+project_demand+"')").attr("selected",true);
                    form.render();
                    $("#supplier_phone").val(supplier_phone);
                    $("#demand_phone").val(demand_phone);
                    $("#project_time").val(project_time);
                    $("#project_detail").val(project_detail);
                    $.ajax({
                        type: "post",
                        url: "/getFile",//对应controller的URL
                        data: {
                            "supplier_data":supplier_data,
                            "demand_data": demand_data
                        },
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var supplierData = data.list;
                            var demandData = data.list1;
                            if(supplierData!=undefined){
                                for(var i=0;i<supplierData.length;i++){
                                    var supplier_tr='<tr id="supEdit'+i+'"><td>'+supplierData[i].name+'</td><td>'+(supplierData[i].size / 1024).toFixed(1) + "kb"+'</td><td>上传成功</td><td><button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="supplierDel('+i+')">删除</button></td></tr>'
                                    $("#supplierDemo").append(supplier_tr);
                                    suData += supplierData[i].filename+";";
                                }
                            }
                            if(demandData!=undefined){
                                for(var j=0;j<demandData.length;j++){
                                    var demand_tr='<tr id="demEdit'+j+'"><td>'+demandData[j].name+'</td><td>'+(demandData[j].size / 1024).toFixed(1) + "kb"+'</td><td>上传成功</td><td><button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="demandDel('+j+')">删除</button></td></tr>'
                                    $("#demandDemo").append(demand_tr);
                                    deData += demandData[j].filename+";";
                                }
                            }
                            var node = layer.open({
                                title: '编辑项目'
                                , type: 1
                                , shift: 5
                                , area: ['1200px', 'auto'] //宽高
                                , content: $('#kkkkk')
                                ,cancel:function () {
                                    location.reload();
                                }
                            });
                            $("#close").click(function () {
                                location.reload();
                                layer.close(node);
                            });
                        }
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


//删除数组
function del1(index) {
    num1[index]="";
}

function del2(index) {
    num2[index]="";
}

//删除供应商的文件
function delSupplier(index){
    var supplier = new Array();
    data1 = data1.substring(0,data1.length-1);
    supplier = data1.split(";");
    //将对应的值变成空
    supplier[index]="";
    var NUM = num1[index];
    $("#sup"+NUM).remove();
    num1[index]="";
    data1 = "";
    for(var i=0;i<supplier.length;i++){
        data1+=supplier[i] + ";";
    }
}


//删除需求方的文件
function  delDemand(index) {
    var demand = new Array();
    data2 = data2.substring(0,data2.length-1);
    demand = data2.split(";");
    //将对应的值变成空
    demand[index]="";
    var NUM = num2[index];
    $("#dem"+NUM).remove();
    num2[index]="";
    data2 = "";
    for(var i=0;i<demand.length;i++){
        data2+=demand[i] + ";";
    }
}


//编辑下的供应方文件
function supplierDel(index){
    var data = suData.substring(0,suData.length);
    data = data.substring(0,suData.length-1);
    var String = new Array();
    String = data.split(";");
    String[index] = ";";
    $("#supEdit"+index).remove();
    suData = "";
    for(var i=0;i<String.length;i++){
        suData += String[i] + ";";
    }
}

function demandDel(index){
    var data = deData.substring(0,deData.length);
    data = data.substring(0,deData.length-1);
    var String = new Array();
    String = data.split(";");
    String[index] = ";";
    $("#demEdit"+index).remove();
    deData = "";
    for(var i=0;i<String.length;i++){
        deData += String[i] + ";";
    }
}


//编辑项目
function updateProject() {
    console.log(suData+data1);
    console.log(deData+data2);
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;
        var project_name = $("#project_name").val();
        var project_director = $("#project_director option:selected").val();
        var project_time = $("#project_time").val();
        var project_supplier = $("#project_supplier option:selected").val();
        var supplier_phone = $("#supplier_phone").val();
        var project_demand = $("#project_demand option:selected").val();
        var demand_phone = $("#demand_phone").val();
        var project_detail = $("#project_detail").val();
        if (project_name === "") {
            layer.msg("项目名称不能为空");
        } else if (project_director === "") {
            layer.msg("负责人不能为空");
        }else if (project_time === "") {
            layer.msg("项目周期不能为空");
        }else if (project_supplier === "") {
            layer.msg("供应商联系人不能为空");
        }else if (supplier_phone === "") {
            layer.msg("供应商电话不能为空");
        }else {
            $.ajax({
                type: "post",
                url: "/updateProjectList",//对应controller的URL
                data: {
                    "project_id": project,
                    "project_name": project_name,
                    "project_director": $("#project_director option:selected").text(),
                    "project_time": project_time,
                    "project_supplier":$("#project_supplier option:selected").text(),
                    "supplier_phone":supplier_phone,
                    "project_demand":$("#project_demand option:selected").text(),
                    "demand_phone":demand_phone,
                    "project_detail":project_detail,
                    "data1":suData+";"+data1,
                    "data2":deData+";"+data2
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.closeAll();
                    location.reload();
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




//新增项目
function sentMsg(){
    layui.use(['table','layer'], function() {
        var table = layui.table;
        var layer = layui.layer;
        var projectName = $("#projectName").val();
        var projectDirector = $("#projectDirector option:selected").val();
        var projectTime = $("#projectTime").val();
        var projectSupplier = $("#projectDirector option:selected").val();
        var supplierPhone = $("#supplierPhone").val();
        var projectDemand = $("#projectDemand option:selected").val();
        var demandPhone = $("#demandPhone").val();
        var projectDetail = $("#projectDetail").val();
        if(projectName===""){
            layer.msg("任务名不能为空");
        }else if(projectDirector===""){
            layer.msg("负责人不能为空");
        }else if(projectTime===""){
            layer.msg("完成周期不能为空");
        }else if(projectSupplier==="") {
            layer.msg("供应商联系人不能为空")
        }else if(supplierPhone==="") {
            layer.msg("供应商电话不能为空")
        }else{
            $.ajax({
                type: "post",
                url: "/insertProject",//对应controller的URL
                async: false,
                dataType: 'json',
                data: {
                    "projectName":projectName,
                    "projectDirector":$("#projectDirector option:selected").text(),
                    "projectTime":projectTime,
                    "projectSupplier":$("#projectSupplier option:selected").text(),
                    "supplierPhone":supplierPhone,
                    "projectDemand":$("#projectDemand option:selected").text(),
                    "demandPhone":demandPhone,
                    "projectDetail":projectDetail,
                    "data1":data1,
                    "data2":data2
                },
                success: function (data) {
                    layer.closeAll();
                    location.reload();
                    table.reload('textReload', {
                        url: '/getAllProject?username='+username,
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
            , area: ['650px', '300px'] //宽高
            , content: $('#passwordHtml')
        });
        $("#close_time2").click(function () {
            $("#password1").val("");
            $("#password2").val("");
            layer.close(node);
        });
    })
}

function changePassword(){
    layui.use('layer', function () {
        var pass1 = $("#password1").val();
        var pass2 = $("#password2").val();
        $.ajax({
            url:'/changePassword',
            data:{'pass1':pass1,"pass2":pass2,"user":username},
            success:function (data) {
                data = JSON.parse(data);
                if(data.msg==="0"){
                    $("#password1").val("");
                    $("#password2").val("");
                    layer.alert("原密码错误",{icon: 2});
                }else{
                    layer.closeAll();
                    layer.alert("成功,3秒后重新登录",{icon: 1});
                    setTimeout('location.href="/"',3000); //跳转
                }

            }
        })
    })
}