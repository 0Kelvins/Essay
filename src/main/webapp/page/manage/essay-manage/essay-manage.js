$(document).ready(function () {
    var $essayTable = $('#essayTable');

    $(".side-tool").addClass("hidden");

    $essayTable.bootstrapTable({
        url: "/publish/getEssayList",
        method: 'post',
        contentType: 'application/json',
        dataType: "json",
        search: true,
        showRefresh: true,
        singleSelect: true, //单行选择
        pagination: true,   //分页
        sidePagination: 'server',
        pageNumber: 1,
        pageSize: 10,
        pageList: [5, 10, 20],
        queryParams: function (params) {
            var pageVO = {
                currentPage: params.pageNumber, //当前页面
                pageNo: params.offset,          //跳转页
                pageSize: params.limit,         //页面行数
                message: params.search          //文章标题搜索
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
                title: '标题',
                field: 'title',
                align: 'center'
            },
            {
                title: '发表时间',
                field: 'publish.publishTime',
                align: 'center',
                formatter: dateFormatter
            },
            {
                title: '操作',
                align: 'center',
                field: 'publish.publishId',
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
        return  '<a class="btn btn-danger remove"' +
            ' href="#" onclick="essayDelete(this, '+ row.publish.publishId +')">删除</a> ';
    }

    var $search = $essayTable.data('bootstrap.table').$toolbar.find('.search input');
    $search.attr('placeholder', '请输入文章标题搜索');
});

var essayDelete = function (aObject, publishId) {
    var deleteInfo = {
        "publishId" : publishId
    }

    if (publishId == undefined || publishId == null) {
        return;
    }

    Common.confirm({
        message: "确认下架该文章？",
        operate: function (result) {
            if (result) {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json;charset=UTF-8',
                    url: '/publish/deletePublishEssay',
                    async: false,
                    dataType: 'json',
                    data: JSON.stringify(deleteInfo),
                    success: function (data) {
                        if (data) {
                            if (data.result == true) {
                                /*$('#essayTable').bootstrapTable('remove', {
                                 field: "publish.publishId",
                                 values: [publishId]
                                 });*/
                                $(aObject).parent("td").parent("tr").remove();

                                tipsAlert('alert-success', '提示', '文章下架成功！');
                            }
                            else {
                                tipsAlert('alert-warning', '提醒', '文章下架失败！');
                            }
                        }
                        else {
                            tipsAlert('alert-danger', '异常', '文章下架失败！');
                        }
                    },
                    error: function (err) {
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