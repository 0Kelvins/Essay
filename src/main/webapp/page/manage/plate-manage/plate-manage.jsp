<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <title>版块管理</title>
    <jsp:include page="/page/common/head.jsp" flush="true"/>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap-table.min.css">
</head>
<body>
<div class="page-container">
    <div id="toolbar">
        <a id="plateAddBtn" class="btn btn-info btn-sm" href="javascript:addPlate()"><i
                class="glyphicon glyphicon-plus-sign"></i> 添加版块</a>
    </div>
    <table id="plateTable" data-toolbar="#toolbar" class="table table-hover table-bordered"></table>
</div>

<!--模态框-->
<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content ">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalLabel">添加版块</h4>
            </div>

            <div class="modal-body clearfix form-horizontal">
                <div id="name-group" class="form-group">
                    <label for="plate-name" class="col-md-3 control-label">版块名称：</label>
                    <div class="col-md-9">
                        <input id="plate-name" name="name" class=" form-control" type="text" placeholder="请输入名字...">
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="plateAddSubmit" type="button" class="btn btn-info">添加</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>


<jsp:include page="/page/common/foot.jsp" flush="true"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap-table.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap-table-zh-CN.min.js"></script>

<script type="text/javascript"
        src="${pageContext.request.contextPath}/page/manage/plate-manage/plate-manage.js"></script>

</body>
</html>
