<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="side-tool">
    <ul>
        <li data-original-title="回到顶部" data-toggle="tooltip" data-placement="left" data-container="body">
            <a class="function-button" href="#"><i class="glyphicon glyphicon-chevron-up icon-font"></i></a>
        </li>
    </ul>
</div>
<div class="alert tipsAlert fade in">
    <a href="#" class="close alertClose" data-dismiss="alert">
        &times;
    </a>
    <strong class="alertType"></strong>
    <span class="alertMessage"></span>
</div>
<div id="confirmDialog" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <button class="bootbox-close-button close" aria-hidden="true" style="margin-top: -10px;" type="button"
                        data-dismiss="modal">×
                </button>
                <div class="bootbox-body"><span class="message">确认操作?</span></div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default cancel" type="button" data-dismiss="modal">取消</button>
                <button class="btn btn-danger ok" type="button" data-dismiss="modal">确认</button>
            </div>
        </div>
    </div>
</div>
<%--<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>--%>
<%--<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>--%>
<script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/page/common/common.js"></script>