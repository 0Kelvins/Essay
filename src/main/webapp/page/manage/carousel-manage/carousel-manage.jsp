<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <title>轮播管理</title>
    <jsp:include page="/page/common/head.jsp" flush="true"/>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap-table.min.css">

    <style>
        td img {
            width: 100px;
        }

        input[type=file] {
            position: absolute;
            display: block !important;
            width: 82px;
            opacity: 0;
        }
    </style>
</head>
<body>
<div class="page-container">
    <div id="toolbar">
        <a id="carouselAddBtn" class="btn btn-info btn-sm" href="javascript:addCarousel()"><i
                class="glyphicon glyphicon-plus-sign"></i> 添加轮播</a>
    </div>
    <table id="carouselTable" data-toolbar="#toolbar" class="table table-hover table-bordered"></table>
</div>


<!--模态框-->
<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content ">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalLabel"></h4>
            </div>

            <div class="modal-body clearfix">
                <form id="carouselForm" role="form" class="form-horizontal">
                    <div class="form-group">
                        <label class="col-md-2 control-label" for="title">标题：</label>

                        <div class="col-md-10">
                            <input type="text" class="input-group form-control input-group-md" value="" id="title"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" for="url">URL：</label>

                        <div class="col-md-10">
                            <input type="text" class="input-group form-control input-group-md" id="url" value=""/>
                        </div>
                    </div>
                    <div class="form-group form-inline">
                        <label class="col-md-2 control-label" for="imageUrl">图片：</label>

                        <div class="col-md-10">
                            <input type="text" id="imageUrl" class="input-group form-control input-group-md" value=""/>

                            <a class="btn btn-info">
                                <input id="imageUp" name="imageUp" type="file" unselectable="on">
                                + 浏览上传
                            </a>

                            <span id="imageTips"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" for="description">描述：</label>

                        <div class="col-md-10">
                            <textarea type="text" class="input-group form-control input-group-md" id="description"
                                      style="height:120px;" value=""></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" for="sequence">排序：</label>

                        <div class="col-md-10">
                            <input type="text" class="input-group form-control input-group-md" id="sequence" value="1"/>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="carouselSubmit" type="button" class="btn btn-info"></button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>


<jsp:include page="/page/common/foot.jsp" flush="true"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap-table.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap-table-zh-CN.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/ajaxfileupload.js"></script>

<script type="text/javascript"
        src="${pageContext.request.contextPath}/page/manage/carousel-manage/carousel-manage.js"></script>

</body>
</html>
