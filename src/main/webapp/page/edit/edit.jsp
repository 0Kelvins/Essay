<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>书写</title>
    <jsp:include page="/page/common/head.jsp" flush="true"/>

    <link href="${pageContext.request.contextPath}/page/edit/edit.css" rel="stylesheet">

    <link href="${pageContext.request.contextPath}/css/thinker-md.vendor.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/nature.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/object.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/people.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/place.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/Sysmbols.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/twemoji.css" rel="stylesheet">

</head>
<body>
    <div class="container">
        <div class="row clearfix">
            <div class="col-md-5 menu">
                <!-- 文件夹 -->
                <div class="col-md-5 column directory">
                    <a class="menuBtn homeBtn" href="${pageContext.request.contextPath}/home">首页</a>
                    <div class="new-dir">
                        <a id="newDirectory" class="menuBtn" data-toggle="collapse" data-target="#new-dir-form">
                            <i class="glyphicon glyphicon-plus-sign"></i>&nbsp;新建分类目录</a>
                        <div id="new-dir-form" class="collapse clearfix">
                            <form class="create-dir-form">
                                <input id="newDir" name="name" class="new-input form-control" type="text" placeholder="请输入目录名...">
                                <input name="add" class="btn submit" type="submit" value="添加">
                            </form>
                        </div>
                    </div>
                    <a id="dirAllEssay" class="menuBtn">所有文章</a>

                    <ul id="directoryList"></ul>

                    <!-- <a class="recycleBin menuBtn">回收站</a> -->

                    <span id="tips" class="tips"></span>
                </div>

                <!-- 文章列表 -->
                <div class="col-md-7 column file">
                    <a id="newEssay" class="menuBtn"><i class="glyphicon glyphicon-plus-sign"></i>&nbsp;新建文章</a>
                    <ul id="essayList"></ul>
                </div>
            </div>

            <!-- 编辑区 -->
            <div class="col-md-7 column editArea clearfix">
                <div class="essay-head">
                    <input id="title" class="title col-md-10" name="title" placeholder="标题"/>
                    <a id="saveBtn" class="btn col-md-2">保存</a>
                </div>
                <textarea id="editor" name="content" placeholder="这里输入内容, 支持Markdown语法."></textarea>
            </div>
        </div>
    </div>

    <!--模态框-->
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="modalLabel"></h4>
                </div>

                <div class="modal-body clearfix form-horizontal">
                    <span id="modal-id" class="hidden"></span>
                    <div id="name-group" class="form-group">
                        <label id="nameLabel" for="modal-name" class="col-md-3 control-label">名称：</label>
                        <div class="col-md-9">
                            <input id="modal-name" name="name" class=" form-control" type="text" placeholder="请输入名字...">
                        </div>
                    </div>
                    <div id="plate-group" class="form-group">
                        <label id="plateLabel" for="publishPlate" class="col-md-3 control-label">发布版块：</label>
                        <div class="col-md-9">
                            <select id="publishPlate" class="form-control"></select>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button id="modal-deleteBtn" type="button" class="btn btn-danger btn-sm" data-dismiss="modal"style="float: left">删除</button>
                    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                    <button id="modal-updateBtn" type="button" class="btn btn-info btn-sm">修改</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

    <jsp:include page="/page/common/foot.jsp" flush="true"/>
    <script type="text/javascript" charset="utf-8"
            src="${pageContext.request.contextPath}/js/thinker-md.vendor.js"></script>
    <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/page/edit/edit.js"></script>
</body>
</html>
