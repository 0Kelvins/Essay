$(document).ready(function () {
    var $commentTable = $('#commentTable');

    $(".side-tool").remove();

    $commentTable.bootstrapTable({
        url: "/comment/getCommentList",
        method: 'post',
        contentType: 'application/json',
        dataType: "json",
        search: true,
        searchOnEnterKey: true,
        strictSearch: true,
        showRefresh: true,
        singleSelect: true, //单行选择
        pagination: true,   //分页
        sidePagination: 'server',
        pageNumber: 1,
        pageSize: 10,
        pageList: [5, 10, 20],
        queryParams: function (params) {
            var pageVO = {
                message: params.search,         //文章标识
                currentPage: params.pageNumber, //当前页面
                pageNo: params.offset,          //跳转页
                pageSize: params.limit          //页面行数
            };
            if (params.pageNumber != undefined || params.pageNumber != null || params.pageNumber != "") {
                pageVO.currentPage = 1;
            }
            return pageVO;
        },
        responseHandler : function(res) {
            return {
                pageSize: res.pageSize,
                pageNumber: res.currentPage,
                total : res.totalRows,
                rows : res.data
            };
        },
        columns: [
            {
                title: '序号',
                align: 'center',
                formatter: indexFormatter
            },
            {
                title: '用户',
                field: 'author.username',
                align: 'center',
            },
            {
                title: '评论',
                field: 'comment.commentContent',
                align: 'center'
            },
            {
                title: '楼层',
                field: 'comment.floor',
                align: 'center',
            },
            {
                title: '发表时间',
                field: 'comment.publishTime',
                align: 'center',
                formatter: dateFormatter
            },
            {
                title: '操作',
                align: 'center',
                field: 'comment.commentId',
                formatter: operateFormatter
            }
        ]
    });

    function indexFormatter(value, row, index) {
        return index + 1;
    }

    function dateFormatter(datestamp) {
        var date = new Date();
        date.setTime(datestamp);
        return date.toLocaleString();
    }

    function operateFormatter(value, row, index){
        if (row.comment.commentState == 1400) {
            return '<a class="btn btn-info remove" href="#">已删除</a>';
        }
        return '<a class="btn btn-danger remove"' +
            'href="#" onclick="commentDelete(this, '+ row.comment.commentId + ')">删除</a>';
    }

    var $search = $commentTable.data('bootstrap.table').$toolbar.find('.search input');
    $search.attr('type', 'number');
    $search.attr('placeholder', '请输入文章标识ID搜索');
});

var commentDelete = function (aObject, commentId) {
    var deleteInfo = {
        "commentId" : commentId
    }

    if (commentId == undefined || commentId == null || commentId == "") {
        return;
    }

    Common.confirm({
        message: "确认删除该评论？",
        operate: function (result) {
            if (result) {
                $.ajax({
                    type : 'POST',
                    contentType : 'application/json;charset=UTF-8',
                    url : '/comment/deleteComment',
                    async: false,
                    dataType: 'json',
                    data : JSON.stringify(deleteInfo),
                    success : function(data) {
                        if (data) {
                            if (data.result == true) {
                                $(aObject).parent("td").parent("tr").remove();

                                tipsAlert('alert-success', '提示', '评论删除成功！');
                            }
                            else {
                                tipsAlert('alert-warning', '提醒', '评论删除失败！');
                            }
                        }
                        else {
                            tipsAlert('alert-danger', '异常', '评论删除失败！');
                        }
                    },
                    error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
                });
            }
            else {
                return false;
            }
        }
    });
};